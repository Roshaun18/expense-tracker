package handlers

import (
	"net/http"
	"os"

	"expense-tracker-backend/repository"
	"expense-tracker-backend/services"
)

type DailyReminderHandler struct {
	service *services.DailyReminderService
}

func NewDailyReminderHandler() *DailyReminderHandler {
	userRepo := repository.NewUserRepository()
	expenseRepo := repository.NewExpenseRepository()
	notificationService := services.NewNotificationService()

	dailyReminderService := services.NewDailyReminderService(
		userRepo,
		expenseRepo,
		notificationService,
	)

	return &DailyReminderHandler{
		service: dailyReminderService,
	}
}

func (h *DailyReminderHandler) SendDailyReminders(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	cronSecret := os.Getenv("CRON_SECRET")
	if cronSecret == "" {
		http.Error(w, "CRON_SECRET is not configured", http.StatusInternalServerError)
		return
	}

	requestSecret := r.Header.Get("X-Cron-Secret")

	if requestSecret != cronSecret {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	if err := h.service.SendDailyReminders(); err != nil {
		http.Error(w, "Failed to send daily reminders", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

	w.Write([]byte("Daily reminders processed successfully"))
}
