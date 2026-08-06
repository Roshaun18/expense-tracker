package models

type DashboardSummary struct {
	TotalIncome      float64 `json:"totalIncome"`
	TotalExpense     float64 `json:"totalExpense"`
	Balance          float64 `json:"balance"`
	TransactionCount int     `json:"transactionCount"`
}
