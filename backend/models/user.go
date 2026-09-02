package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID             primitive.ObjectID `bson:"_id, omitempty" json:"id"`
	Name           string             `bson:"name" json:"name"`
	Email          string             `bson:"email" json:"email"`
	Password       string             `bson:"password, omitempty" json:"-"`
	MonthlyLimit   float64            `bson:"monthly_limit" json:"monthlyLimit"`
	Currency       string             `bson:"currency" json:"currency"`
	DailyReminders bool               `bson:"daily_reminders" json:"dailyReminders"`
	BudgetAlerts   bool               `bson:"budget_alerts" json:"budgetAlerts"`
	CreatedAt      time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt      time.Time          `bson:"updated_at" json:"updatedAt"`
}

type UpdateProfileRequest struct {
	Name string `json:"name"`
}

type UpdateSettingsRequest struct {
	Currency       string `json:"currency"`
	DailyReminders bool   `json:"dailyReminders"`
	BudgetAlerts   bool   `json:"budgetAlerts"`
}
