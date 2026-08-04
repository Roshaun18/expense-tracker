package repository

import (
	"context"
	"time"

	"expense-tracker-backend/config"
	"expense-tracker-backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ExpenseRepository struct {
	Collection *mongo.Collection
}

func NewExpenseRepository() *ExpenseRepository {
	return &ExpenseRepository{
		Collection: config.DB.Collection("expenses"),
	}
}

func (r *ExpenseRepository) CreateExpense(expense *models.Expense) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := r.Collection.InsertOne(ctx, expense)

	return err
}

func (r *ExpenseRepository) GetExpenses() ([]models.Expense, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := r.Collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var expenses []models.Expense

	err = cursor.All(ctx, &expenses)
	if err != nil {
		return nil, err
	}

	return expenses, nil
}
