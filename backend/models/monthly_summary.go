package models

type MonthlySummary struct {
	Month   int     `json:"month" bson:"_id"`
	Income  float64 `json:"income"`
	Expense float64 `json:"expense"`
}

type PeriodSummary struct {
	Income  float64 `json:"income"`
	Expense float64 `json:"expense"`
}
