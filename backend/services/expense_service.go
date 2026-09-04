package services

import (
	"errors"
	"time"

	"expense-tracker-backend/models"
	"expense-tracker-backend/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ExpenseService struct {
	repo            *repository.ExpenseRepository
	userRepo        *repository.UserRepository
	budgetAlertRepo *repository.BudgetAlertRepository
}

func NewExpenseService() *ExpenseService {
	return &ExpenseService{
		repo:            repository.NewExpenseRepository(),
		userRepo:        repository.NewUserRepository(),
		budgetAlertRepo: repository.NewBudgetAlertRepository(),
	}
}

func (s *ExpenseService) CreateExpense(expense *models.Expense) (*models.BudgetAlert, error) {
	//Validation
	if expense.Title == "" {
		return nil, errors.New("title is required")
	}
	if expense.Amount <= 0 {
		return nil, errors.New("amount must be greater than zero")
	}
	if expense.Category == "" {
		return nil, errors.New("category is required")
	}
	if expense.Type != "income" && expense.Type != "expense" {
		return nil, errors.New("invalid transaction type")
	}

	now := time.Now()

	expense.CreatedAt = now
	expense.UpdatedAt = now

	//If fronted doen't send a date, use today's date
	if expense.Date.IsZero() {
		expense.Date = now
	}
	if err := s.repo.CreateExpense(expense); err != nil {
		return nil, err
	}

	if expense.Type != "expense" {
		return &models.BudgetAlert{
			Triggered: false,
		}, nil
	}

	spent, err := s.repo.GetCurrentMonthExpense(expense.UserID)
	if err != nil {
		return nil, err
	}

	budgetSettings, err := s.userRepo.GetBudgetSettings(expense.UserID)
	if err != nil {
		return nil, err
	}
	if !budgetSettings.BudgetAlerts {
		return &models.BudgetAlert{
			Triggered: false,
		}, nil
	}

	if budgetSettings.MonthlyLimit <= 0 {
		return &models.BudgetAlert{
			Triggered: false,
		}, nil
	}

	percentage := (spent / budgetSettings.MonthlyLimit) * 100

	alertState, err := s.budgetAlertRepo.GetCurrentMonthAlertState(expense.UserID)
	if err != nil {
		return nil, err
	}

	alert := &models.BudgetAlert{
		Triggered:    false,
		Percentage:   percentage,
		Spent:        spent,
		MonthlyLimit: budgetSettings.MonthlyLimit,
	}

	if percentage >= 100 {
		if alertState == nil || !alertState.ExceededSent {
			alert.Triggered = true
			alert.Level = "exceeded"

			if err := s.budgetAlertRepo.MarkExceededSent(expense.UserID); err != nil {
				return nil, err
			}
		}
	} else if percentage >= 80 {
		if alertState == nil || !alertState.WarningSent {
			alert.Triggered = true
			alert.Level = "warning"

			if err := s.budgetAlertRepo.MarkWarningSent(expense.UserID); err != nil {
				return nil, err
			}
		}
	}

	return alert, nil
}

func (s *ExpenseService) GetExpenses(userID primitive.ObjectID) ([]models.Expense, error) {
	return s.repo.GetExpenses(userID)
}

func (s *ExpenseService) GetExpenseByID(id primitive.ObjectID, userID primitive.ObjectID) (*models.Expense, error) {
	return s.repo.GetExpenseByID(id, userID)
}

func (s *ExpenseService) UpdateExpense(id primitive.ObjectID, userID primitive.ObjectID, expense *models.Expense) error {
	return s.repo.UpdateExpense(id, userID, expense)
}

func (s *ExpenseService) DeleteExpense(id primitive.ObjectID, userID primitive.ObjectID) error {
	return s.repo.DeleteExpense(id, userID)
}

func (s *ExpenseService) GetDashboardSummary(userID primitive.ObjectID) (*models.DashboardSummary, error) {
	return s.repo.GetDashboardSummary(userID)
}

func (s *ExpenseService) GetCategorySummary(userID primitive.ObjectID, startDate time.Time, endDate time.Time) ([]models.CategorySummary, error) {
	return s.repo.GetCategorySummary(userID, startDate, endDate)
}

func (s *ExpenseService) GetMonthlySummary(userID primitive.ObjectID) ([]models.MonthlySummary, error) {
	return s.repo.GetMonthlySummary(userID)
}

func (s *ExpenseService) GetRecentExpenses(userID primitive.ObjectID) ([]models.Expense, error) {
	return s.repo.GetRecentExpenses(userID)
}

func (s *ExpenseService) GetPeriodSummary(userID primitive.ObjectID, startDate time.Time, endDate time.Time) (*models.PeriodSummary, error) {
	return s.repo.GetPeriodSummary(userID, startDate, endDate)
}
