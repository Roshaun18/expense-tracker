package models

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Currency string `json:"currency"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
