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

func (r *ExpenseRepository) GetExpenseByID(id primitive.ObjectID, userID primitive.ObjectID) (*models.Expense, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var expense models.Expense
	err := r.Collection.FindOne(ctx, bson.M{"_id": id, "user_id": userID}).Decode(&expense)

	if err != nil {
		return nil, err
	}

	return &expense, nil
}

func (r *ExpenseRepository) UpdateExpense(id primitive.ObjectID, userID primitive.ObjectID, expense *models.Expense) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

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

	result, err := r.Collection.UpdateOne(ctx, bson.M{"_id": id, "user_id": userID}, update)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *ExpenseRepository) DeleteExpense(id primitive.ObjectID, userID primitive.ObjectID) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := r.Collection.DeleteOne(ctx, bson.M{
		"_id": id, "user_id": userID,
	})
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}

func (r *ExpenseRepository) GetDashboardSummary(userID primitive.ObjectID) (*models.DashboardSummary, error) {
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

func (r *ExpenseRepository) GetCategorySummary(userID primitive.ObjectID, startDate time.Time, endDate time.Time) ([]models.CategorySummary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.M{
				"type":    "expense",
				"user_id": userID,
				"date": bson.M{
					"$gte": startDate,
					"$lt":  endDate,
				},
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
	if err != nil {
		return nil, err
	}

	return result, err
}

func (r *ExpenseRepository) GetMonthlySummary(userID primitive.ObjectID) ([]models.MonthlySummary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	now := time.Now()

	startDate := time.Date(
		now.Year(),
		time.January,
		1,
		0, 0, 0, 0,
		now.Location(),
	)
	endDate := startDate.AddDate(1, 0, 0)
	cursor, err := r.Collection.Find(ctx, bson.M{
		"user_id": userID,
		"date": bson.M{
			"$gte": startDate,
			"$lt":  endDate,
		},
	})
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
			monthlyMap[month] = &models.MonthlySummary{Month: month, Income: 0, Expense: 0}
		}
		if expense.Type == "income" {
			monthlyMap[month].Income += expense.Amount
		} else {
			monthlyMap[month].Expense += expense.Amount
		}
	}
	result := make([]models.MonthlySummary, 0, len(monthlyMap))
	for _, value := range monthlyMap {
		result = append(result, *value)
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].Month < result[j].Month
	})

	return result, nil
}

func (r *ExpenseRepository) GetRecentExpenses(userID primitive.ObjectID) ([]models.Expense, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	options := options.Find().SetSort(bson.D{
		{Key: "date", Value: -1},
	}).SetLimit(5)

	cursor, err := r.Collection.Find(ctx, bson.M{"user_id": userID}, options)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	expenses := make([]models.Expense, 0)
	err = cursor.All(ctx, &expenses)
	if err != nil {
		return nil, err
	}

	return expenses, nil
}

func (r *ExpenseRepository) GetPeriodSummary(userID primitive.ObjectID, startDate time.Time, endDate time.Time) (*models.PeriodSummary, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.M{
				"user_id": userID,
				"date": bson.M{
					"$gte": startDate,
					"$lt":  endDate,
				},
			}},
		},
		bson.D{
			{Key: "$group", Value: bson.M{
				"_id": nil,
				"income": bson.M{
					"$sum": bson.M{
						"$cond": bson.A{
							bson.M{"$eq": bson.A{"$type", "income"}},
							"$amount",
							0,
						},
					},
				},
				"expense": bson.M{
					"$sum": bson.M{
						"$cond": bson.A{
							bson.M{"$eq": bson.A{"$type", "expense"}},
							"$amount",
							0,
						},
					},
				},
			}},
		},
		bson.D{
			{Key: "$project", Value: bson.M{
				"_id":     0,
				"income":  1,
				"expense": 1,
			}},
		},
	}

	cursor, err := r.Collection.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var result []models.PeriodSummary

	if err := cursor.All(ctx, &result); err != nil {
		return nil, err
	}

	if len(result) == 0 {
		return &models.PeriodSummary{}, nil
	}

	return &result[0], nil
}

func (r *ExpenseRepository) GetCurrentMonthExpense(userID primitive.ObjectID) (float64, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	now := time.Now()

	startDate := time.Date(
		now.Year(),
		now.Month(),
		1,
		0, 0, 0, 0,
		now.Location(),
	)
	endDate := startDate.AddDate(0, 1, 0)

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.M{
				"user_id": userID,
				"type":    "expense",
				"date": bson.M{
					"$gte": startDate,
					"$lt":  endDate,
				},
			}},
		},
		bson.D{
			{Key: "$group", Value: bson.M{
				"_id":   nil,
				"total": bson.M{"$sum": "$amount"},
			}},
		},
	}
	cursor, err := r.Collection.Aggregate(ctx, pipeline)
	if err != nil {
		return 0, err
	}
	defer cursor.Close(ctx)

	var result struct {
		Total float64 `bson:"total"`
	}

	if cursor.Next(ctx) {
		if err := cursor.Decode(&result); err != nil {
			return 0, err
		}
		return result.Total, nil
	}
	if err := cursor.Err(); err != nil {
		return 0, err
	}
	return 0, nil
}
