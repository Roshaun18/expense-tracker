package utils

import (
	"errors"
	"time"

	"expense-tracker-backend/models"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(user *models.User, secret string) (string, error) {
	if user.ID.IsZero() {
		return "", errors.New("user ID is missing")
	}

	claims := jwt.MapClaims{
		"userId": user.ID.Hex(),
		"email":  user.Email,
		"exp":    time.Now().Add(24 * time.Hour).Unix(),
		"iat":    time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
