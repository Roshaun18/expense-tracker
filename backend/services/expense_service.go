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

func (s *ExpenseService) GetCategorySummary(userID primitive.ObjectID) ([]models.CategorySummary, error) {
	return s.repo.GetCategorySummary(userID)
}

func (s *ExpenseService) GetMonthlySummary(userID primitive.ObjectID) ([]models.MonthlySummary, error) {
	return s.repo.GetMonthlySummary(userID)
}

func (s *ExpenseService) GetRecentExpenses(userID primitive.ObjectID) ([]models.Expense, error) {
	return s.repo.GetRecentExpenses(userID)
}
