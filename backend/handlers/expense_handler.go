package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"expense-tracker-backend/middleware"
	"expense-tracker-backend/models"
	"expense-tracker-backend/services"
	"expense-tracker-backend/validators"
)

type ExpenseHandler struct {
	service *services.ExpenseService
}

func NewExpenseHandler() *ExpenseHandler {
	return &ExpenseHandler{
		service: services.NewExpenseService(),
	}
}

func (h *ExpenseHandler) CreateExpense(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(string)

	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	var expense models.Expense

	err = json.NewDecoder(r.Body).Decode(&expense)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := validators.ValidateExpense(&expense); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	expense.UserID = objectID

	budgetAlert, err := h.service.CreateExpense(&expense)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]any{
		"message":     "Expense created successfully",
		"data":        expense,
		"budgetAlert": budgetAlert,
	})
}

func (h *ExpenseHandler) GetExpenses(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	expenses, err := h.service.GetExpenses(objectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(expenses)
}

func (h *ExpenseHandler) GetExpenseByID(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	expenseID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid expense ID", http.StatusBadRequest)
		return
	}
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	expense, err := h.service.GetExpenseByID(expenseID, userObjectID)
	if err != nil {
		http.Error(w, "Expense Not Found", http.StatusNotFound)
		return
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(expense)
}

func (h *ExpenseHandler) UpdateExpense(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	expenseID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid expense ID", http.StatusBadRequest)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	var expense models.Expense

	err = json.NewDecoder(r.Body).Decode(&expense)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}
	if err := validators.ValidateExpense(&expense); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	expense.UserID = userObjectID

	err = h.service.UpdateExpense(expenseID, userObjectID, &expense)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(w, "Expense not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Failed to update expense", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Expense updated successfully",
	})
}

func (h *ExpenseHandler) DeleteExpense(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	expenseID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "Invalid expense ID", http.StatusBadRequest)
		return
	}
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	err = h.service.DeleteExpense(expenseID, userObjectID)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(w, "Expense not found", http.StatusNotFound)
			return
		}
		http.Error(w, "Failed to delete expense", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Expense deleted successfully",
	})
}

func (h *ExpenseHandler) GetDashboardSummary(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	summary, err := h.service.GetDashboardSummary(userObjectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(summary)

}

func (h *ExpenseHandler) GetCategorySummary(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	period := r.URL.Query().Get("period")
	if period == "" {
		period = "M"
	}

	location, err := time.LoadLocation("Asia/Kolkata")
	if err != nil {
		http.Error(w, "Failed to load timezone", http.StatusInternalServerError)
		return
	}
	now := time.Now().In(location)

	var startDate time.Time
	var endDate time.Time

	switch period {
	case "W":
		startDate = now.AddDate(0, 0, -int(now.Weekday()))
		startDate = time.Date(startDate.Year(), startDate.Month(), startDate.Day(),
			0, 0, 0, 0,
			location)
		endDate = startDate.AddDate(0, 0, 7)
	case "M":
		startDate = time.Date(now.Year(), now.Month(),
			1,
			0, 0, 0, 0,
			location)
		endDate = startDate.AddDate(0, 1, 0)
	case "Y":
		startDate = time.Date(now.Year(),
			1,
			1,
			0, 0, 0, 0,
			location)
		endDate = startDate.AddDate(1, 0, 0)
	default:
		http.Error(w, "Invalid period", http.StatusBadRequest)
		return
	}

	result, err := h.service.GetCategorySummary(userObjectID, startDate, endDate)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}

func (h *ExpenseHandler) GetMonthlySummary(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	result, err := h.service.GetMonthlySummary(userObjectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}

func (h *ExpenseHandler) GetRecentExpenses(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	expenses, err := h.service.GetRecentExpenses(userObjectID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(expenses)
}

func (h *ExpenseHandler) GetPeriodSummary(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middleware.UserIDKey).(string)

	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	period := r.URL.Query().Get("period")
	if period == "" {
		period = "M"
	}

	location, err := time.LoadLocation("Asia/Kolkata")
	if err != nil {
		http.Error(w, "Failed to load timezone", http.StatusInternalServerError)
		return
	}
	now := time.Now().In(location)

	var startDate time.Time
	var endDate time.Time

	switch period {
	case "W":
		startDate = now.AddDate(0, 0, -int(now.Weekday()))
		startDate = time.Date(startDate.Year(),
			startDate.Month(),
			startDate.Day(),
			0, 0, 0, 0,
			location)
		endDate = startDate.AddDate(0, 0, 7)

	case "M":
		startDate = time.Date(
			now.Year(),
			now.Month(),
			1,
			0, 0, 0, 0,
			location,
		)
		endDate = startDate.AddDate(0, 1, 0)

	case "Y":
		startDate = time.Date(
			now.Year(),
			1,
			1,
			0, 0, 0, 0,
			location,
		)
		endDate = startDate.AddDate(1, 0, 0)

	default:
		http.Error(w, "Invalid period", http.StatusBadRequest)
		return
	}

	result, err := h.service.GetPeriodSummary(userObjectID, startDate, endDate)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)

}

func (h *ExpenseHandler) HasTodayExpense(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(string)
	if !ok || userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusUnauthorized)
		return
	}

	hasExpense, err := h.service.HasTodayExpense(objectID)
	if err != nil {
		http.Error(w, "Failed to check today's expenses", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]any{
		"hasExpense": hasExpense,
	})
}
