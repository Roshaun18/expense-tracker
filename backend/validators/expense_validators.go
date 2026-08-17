package validators

import (
	"errors"
	"expense-tracker-backend/models"
)

func ValidateExpense(expense *models.Expense) error {
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
		return errors.New("type must be income or expense")
	}
	if expense.Date.IsZero() {
		return errors.New("date is required")
	}
	return nil
}
