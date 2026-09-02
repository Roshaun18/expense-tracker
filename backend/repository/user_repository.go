package repository

import (
	"context"
	"expense-tracker-backend/config"
	"expense-tracker-backend/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository struct {
	Collection *mongo.Collection
}

func NewUserRepository() *UserRepository {
	return &UserRepository{
		Collection: config.DB.Collection("users"),
	}
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User

	err := r.Collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) CreateUser(user *models.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := r.Collection.InsertOne(ctx, user)

	return err
}

func (r *UserRepository) GetMonthlyLimit(
	userID primitive.ObjectID,
) (float64, error) {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	var user models.User

	err := r.Collection.FindOne(
		ctx,
		bson.M{"_id": userID},
	).Decode(&user)

	if err != nil {
		return 0, err
	}

	return user.MonthlyLimit, nil
}

func (r *UserRepository) UpdateMonthlyLimit(
	userID primitive.ObjectID,
	monthlyLimit float64,
) error {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	result, err := r.Collection.UpdateOne(
		ctx,
		bson.M{"_id": userID},
		bson.M{
			"$set": bson.M{
				"monthly_limit": monthlyLimit,
				"updated_at":    time.Now(),
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *UserRepository) GetByID(
	userID primitive.ObjectID,
) (*models.User, error) {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	var user models.User

	err := r.Collection.FindOne(
		ctx,
		bson.M{"_id": userID},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) UpdateName(userID primitive.ObjectID, name string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := r.Collection.UpdateOne(ctx, bson.M{"_id": userID},
		bson.M{
			"$set": bson.M{
				"name":       name,
				"updated_at": time.Now(),
			},
		})
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}

func (r *UserRepository) UpdateSettings(userID primitive.ObjectID, currency string, dailyReminders bool, budgetAlerts bool) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := r.Collection.UpdateOne(ctx, bson.M{"_id": userID},
		bson.M{
			"$set": bson.M{
				"currency":        currency,
				"daily_reminders": dailyReminders,
				"budget_alerts":   budgetAlerts,
				"updated_at":      time.Now(),
			},
		})
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}
