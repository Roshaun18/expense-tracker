package config

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreatebudgetAlertIndexes() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := DB.Collection("budget_alerts")

	index := mongo.IndexModel{
		Keys: bson.D{
			{Key: "user_id", Value: 1},
			{Key: "month", Value: 1},
		},
		Options: nil,
	}
	_, err := collection.Indexes().CreateOne(ctx, index)

	return err
}
