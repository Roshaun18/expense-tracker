package models

type CategorySummary struct {
	Categorry string  `json:"category" bson:"_id"`
	Amount    float64 `json:"amount" bson:"amount"`
}
