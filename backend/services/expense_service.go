package services

import (
	"errors"
	"time"

	"expense-tracker-backend/models"
	"expense-tracker-backend/repository"
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

func (s *ExpenseService) GetExpenses() ([]models.Expense, error) {
	return s.repo.GetExpenses()
}
