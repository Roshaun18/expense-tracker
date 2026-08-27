package models

type CategorySummary struct {
	Category string  `json:"category" bson:"_id"`
	Amount   float64 `json:"amount" bson:"amount"`
}
