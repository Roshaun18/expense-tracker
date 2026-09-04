package repository

import (
	"context"
	"time"

	"expense-tracker-backend/config"
	"expense-tracker-backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type BudgetAlertRepository struct {
	Collection *mongo.Collection
}

func NewBudgetAlertRepository() *BudgetAlertRepository {
	return &BudgetAlertRepository{Collection: config.DB.Collection("budget_alerts")}
}

func (r *BudgetAlertRepository) GetCurrentMonthAlertState(userID primitive.ObjectID) (*models.BudgetAlertState, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	month := time.Now().Format("2006-01")

	var alertState models.BudgetAlertState

	err := r.Collection.FindOne(
		ctx,
		bson.M{
			"user_id": userID,
			"month":   month,
		},
	).Decode(&alertState)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}

	return &alertState, nil
}

func (r *BudgetAlertRepository) MarkWarningSent(userID primitive.ObjectID) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	now := time.Now()
	month := now.Format("2006-01")

	_, err := r.Collection.UpdateOne(
		ctx,
		bson.M{
			"user_id": userID,
			"month":   month,
		},
		bson.M{
			"$set": bson.M{
				"warning_sent": true,
				"updated_at":   now,
			},
			"$setOnInsert": bson.M{
				"user_id":       userID,
				"month":         month,
				"exceeded_sent": false,
				"created_at":    now,
			},
		},
		options.Update().SetUpsert(true),
	)
	return err

}

func (r *BudgetAlertRepository) MarkExceededSent(userID primitive.ObjectID) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	now := time.Now()
	month := now.Format("2006-01")

	_, err := r.Collection.UpdateOne(
		ctx,
		bson.M{
			"user_id": userID,
			"month":   month,
		},
		bson.M{
			"$set": bson.M{
				"exceeded_sent": true,
				"updated_at":    now,
			},
			"$setOnInsert": bson.M{
				"user_id":      userID,
				"month":        month,
				"warning_sent": false,
				"created_at":   now,
			},
		},
		options.Update().SetUpsert(true),
	)
	return err
}
