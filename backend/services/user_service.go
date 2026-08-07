package services

import (
	"errors"
	"os"
	"strings"
	"time"

	"expense-tracker-backend/models"
	"expense-tracker-backend/repository"
	"expense-tracker-backend/utils"

	"golang.org/x/crypto/bcrypt"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService() *UserService {
	return &UserService{
		repo: repository.NewUserRepository(),
	}
}

func (s *UserService) Register(req models.RegisterRequest) (*models.User, error) {
	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	req.Name = strings.TrimSpace(req.Name)

	if req.Name == "" {
		return nil, errors.New("Name is required")
	}
	if req.Email == "" {
		return nil, errors.New("Email is required")
	}
	if req.Password == "" {
		return nil, errors.New("Password is required")
	}
	if len(req.Password) < 8 {
		return nil, errors.New("password must be at least 8 characters")
	}

	existingUser, err := s.repo.FindByEmail(req.Email)

	if err == nil && existingUser != nil {
		return nil, errors.New("Email already exists")
	}
	if err != nil && !errors.Is(err, mongo.ErrNoDocuments) {
		return nil, err
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	now := time.Now()

	user := &models.User{
		ID:        primitive.NewObjectID(),
		Name:      req.Name,
		Email:     req.Email,
		Password:  string(hashedPassword),
		CreatedAt: now,
		UpdatedAt: now,
	}

	err = s.repo.CreateUser(user)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) Login(req models.LoginRequest) (*models.User, string, error) {
	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	user, err := s.repo.FindByEmail(req.Email)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, "", errors.New("Invalid email or password")
		}
		return nil, "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, "", errors.New("Invalid email or password")
	}

	token, err := utils.GenerateToken(user, os.Getenv("JWT_SECRET"))
	if err != nil {
		return nil, "", err
	}
	return user, token, nil
}
