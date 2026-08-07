package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	"expense-tracker-backend/models"
	"expense-tracker-backend/services"
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
	var expense models.Expense

	err := json.NewDecoder(r.Body).Decode(&expense)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = h.service.CreateExpense(&expense)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]any{
		"message": "Expense created successfully",
		"data":    expense,
	})
}

func (h *ExpenseHandler) GetExpenses(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	expenses, err := h.service.GetExpenses()
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

	expense, err := h.service.GetExpenseByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
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

	var expense models.Expense

	err := json.NewDecoder(r.Body).Decode(&expense)
	if err != nil {
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}

	err = h.service.UpdateExpense(id, &expense)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Expense updated successfully",
	})
}

func (h *ExpenseHandler) DeleteExpense(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	err := h.service.DeleteExpense(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Expense deleted successfully",
	})
}

func (h *ExpenseHandler) GetDashboardSummary(w http.ResponseWriter, r *http.Request) {
	summary, err := h.service.GetDashboardSummary()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(summary)

}

func (h *ExpenseHandler) GetCategorySummary(w http.ResponseWriter, r *http.Request) {
	result, err := h.service.GetCategorySummary()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}

func (h *ExpenseHandler) GetMonthlySummary(w http.ResponseWriter, r *http.Request) {
	result, err := h.service.GetMonthlySummary()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("content-Type", "application/json")

	json.NewEncoder(w).Encode(result)
}

func (h *ExpenseHandler) GetRecentExpenses(w http.ResponseWriter, r *http.Request) {
	expenses, err := h.service.GetRecentExpenses()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(expenses)
}
