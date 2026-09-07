package services

import (
	"log"

	"expense-tracker-backend/models"
	"expense-tracker-backend/repository"
)

type DailyReminderService struct {
	userRepo         *repository.UserRepository
	expenserepo      *repository.ExpenseRepository
	notificationServ *NotificationService
}

func NewDailyReminderService(userRepo *repository.UserRepository, expenseRepo *repository.ExpenseRepository, notificationServ *NotificationService) *DailyReminderService {
	return &DailyReminderService{
		userRepo:         userRepo,
		expenserepo:      expenseRepo,
		notificationServ: notificationServ,
	}
}

func (s *DailyReminderService) SendDailyReminders() error {
	users, err := s.userRepo.GetDailyReminderUsers()
	if err != nil {
		return err
	}

	for _, user := range users {
		err := s.sendReminderToUser(user)
		if err != nil {
			log.Printf("Failed to send daily reminder to user %s: %v", user.ID.Hex(), err)
			continue
		}
	}
	return nil
}

func (s *DailyReminderService) sendReminderToUser(user models.User) error {
	hasExpense, err := s.expenserepo.HasTodayExpense(user.ID)
	if err != nil {
		return err
	}

	if hasExpense {
		return nil
	}

	return s.notificationServ.SendPushNotification(
		user.PushToken,
		"Daily Expense Reminder",
		"You haven't recorder any expenses today.",
	)
}
