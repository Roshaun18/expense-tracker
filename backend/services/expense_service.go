package services

import (
	"errors"
	"time"

	"expense-tracker-backend/models"
	"expense-tracker-backend/repository"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ExpenseService struct {
	repo *repository.ExpenseRepository
}

func NewExpenseService() *ExpenseService {
	return &ExpenseService{
		repo: repository.NewExpenseRepository(),
	}
}

func (s *ExpenseService) CreateExpense(expense *models.Expense) error {
	//Validation
	if expense.Title == "" {
		return errors.New("title is required")
	}
	if expense.Amount <= 0 {
		return errors.New("amount must be greater than zero")
	}
	if expense.Category == "" {
		return errors.New("category is required")
	}
	if expense.Type != "income" && expense.Type != "expense" {
		return errors.New("invalid transaction type")
	}

	now := time.Now()

	expense.CreatedAt = now
	expense.UpdatedAt = now

	//If fronted doen't send a date, use today's date
	if expense.Date.IsZero() {
		expense.Date = now
	}

	return s.repo.CreateExpense(expense)
}

func (s *ExpenseService) GetExpenses(userID primitive.ObjectID) ([]models.Expense, error) {
	return s.repo.GetExpenses(userID)
}

func (s *ExpenseService) GetExpenseByID(id string) (*models.Expense, error) {
	return s.repo.GetExpenseByID(id)
}

func (s *ExpenseService) UpdateExpense(id string, expense *models.Expense) error {
	return s.repo.UpdateExpense(id, expense)
}

func (s *ExpenseService) DeleteExpense(id string) error {
	return s.repo.DeleteExpense(id)
}

func (s *ExpenseService) GetDashboardSummary() (*models.DashboardSummary, error) {
	return s.repo.GetDashboardSummary()
}

func (s *ExpenseService) GetCategorySummary() ([]models.CategorySummary, error) {
	return s.repo.GetCategorySummary()
}

func (s *ExpenseService) GetMonthlySummary() ([]models.MonthlySummary, error) {
	return s.repo.GetMonthlySummary()
}

func (s *ExpenseService) GetRecentExpenses() ([]models.Expense, error) {
	return s.repo.GetRecentExpenses()
}
