package repository

import (
	"context"
	"sort"
	"time"

	"expense-tracker-backend/config"
	"expense-tracker-backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func (r *ExpenseRepository) GetExpenses(userID primitive.ObjectID) ([]models.Expense, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := r.Collection.Find(ctx, bson.M{"user_id": userID})
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

func (r *ExpenseRepository) GetExpenseByID(id string) (*models.Expense, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var expense models.Expense
	err = r.Collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&expense)

	if err != nil {
		return nil, err
	}

	return &expense, nil
}

func (r *ExpenseRepository) UpdateExpense(id string, expense *models.Expense) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	expense.UpdatedAt = time.Now()

	update := bson.M{
		"$set": bson.M{
			"title":      expense.Title,
			"amount":     expense.Amount,
			"category":   expense.Category,
			"type":       expense.Type,
			"note":       expense.Note,
			"date":       expense.Date,
			"updated_at": expense.UpdatedAt,
		},
	}

	_, err = r.Collection.UpdateOne(ctx, bson.M{"_id": objectID}, update)

	return err
}

func (r *ExpenseRepository) DeleteExpense(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.Collection.DeleteOne(ctx, bson.M{
		"_id": objectID,
	})
	return err
}

func (r *ExpenseRepository) GetDashboardSummary() (*models.DashboardSummary, error) {
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

	var income, expense float64

	for _, item := range expenses {
		if item.Type == "income" {
			income += item.Amount
		} else {
			expense += item.Amount
		}
	}

	return &models.DashboardSummary{
		TotalIncome:      income,
		TotalExpense:     expense,
		Balance:          income - expense,
		TransactionCount: len(expenses),
	}, nil
}

func (r *ExpenseRepository) GetCategorySummary() ([]models.CategorySummary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.M{
				"type": "expense",
			}},
		},
		bson.D{
			{Key: "$group", Value: bson.M{
				"_id": "$category",
				"amount": bson.M{
					"$sum": "$amount",
				},
			}},
		},
		bson.D{
			{Key: "$sort", Value: bson.M{
				"amount": -1,
			}},
		},
	}
	cursor, err := r.Collection.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	var result []models.CategorySummary

	err = cursor.All(ctx, &result)

	return result, err
}

func (r *ExpenseRepository) GetMonthlySummary() ([]models.MonthlySummary, error) {
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

	monthlyMap := make(map[int]*models.MonthlySummary)

	for _, expense := range expenses {
		month := int(expense.Date.Month())
		if _, exists := monthlyMap[month]; !exists {
			monthlyMap[month] = &models.MonthlySummary{Month: month}
		}
		if expense.Type == "income" {
			monthlyMap[month].Income += expense.Amount
		} else {
			monthlyMap[month].Expense += expense.Amount
		}
	}
	result := make([]models.MonthlySummary, 0)
	for _, value := range monthlyMap {
		result = append(result, *value)
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].Month < result[j].Month
	})

	return result, nil
}

func (r *ExpenseRepository) GetRecentExpenses() ([]models.Expense, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	options := options.Find().SetSort(bson.D{
		{Key: "date", Value: -1},
	}).SetLimit(5)

	cursor, err := r.Collection.Find(ctx, bson.M{}, options)
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
