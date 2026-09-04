package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BudgetAlertState struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	UserID       primitive.ObjectID `bson:"user_id"`
	Month        string             `bson:"month"`
	WarningSent  bool               `bson:"warning_sent"`
	ExceededSent bool               `bson:"exceeded_sent"`
	CreatedAt    time.Time          `bson:"created_at"`
	UpdatedAt    time.Time          `bson:"updated_at"`
}

type BudgetAlert struct {
	Triggered    bool    `json:"triggered"`
	Level        string  `json:"level,omitempty"`
	Percentage   float64 `json:"percentage,omitempty"`
	Spent        float64 `json:"spent,omitempty"`
	MonthlyLimit float64 `json:"monthlyLimit,omitempty"`
}
