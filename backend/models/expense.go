package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Expense struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID primitive.ObjectID `bson:"user_id,omitempty" json:"user_id"`

	Title    string  `bson:"title" json:"title"`
	Amount   float64 `bson:"amount" json:"amount"`
	Category string  `bson:"category" json:"category"`
	Type     string  `bson:"type" json:"type"` //income | expense

	Note string    `bson:"note,omitempty" json:"note"`
	Date time.Time `bson:"date" json:"date"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
