package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

type NotificationService struct {
	client *http.Client
}

type expoPushRequest struct {
	To    string `json:"to"`
	Title string `json:"title"`
	Body  string `json:"body"`
	Sound string `json:"sound"`
}

type expoPushResponse struct {
	Data []struct {
		Status  string `json:"status"`
		Details struct {
			Error string `json:"error"`
		} `json:"details"`
	} `json:"data"`
}

func NewNotificationService() *NotificationService {
	return &NotificationService{
		client: &http.Client{},
	}
}

func (s *NotificationService) SendPushNotification(pushToken string, title string, body string) error {
	if pushToken == "" {
		return errors.New("push token is required")
	}

	requestBody := expoPushRequest{
		To:    pushToken,
		Title: title,
		Body:  body,
		Sound: "default",
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(
		http.MethodPost,
		"https://exp.host/--/api/v2/push/send",
		bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	response, err := s.client.Do(req)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return fmt.Errorf("expo push API returned status %d", response.StatusCode)
	}

	var result expoPushResponse

	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return err
	}
	if len(result.Data) > 0 {
		if result.Data[0].Status != "ok" {
			return fmt.Errorf("expo push notification failed: %s", result.Data[0].Details.Error)
		}
	}
	return nil

}
