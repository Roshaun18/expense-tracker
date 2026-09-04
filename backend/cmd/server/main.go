package main

import (
	"expense-tracker-backend/config"
	"expense-tracker-backend/handlers"
	"expense-tracker-backend/middleware"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}
	config.ConnectDB(os.Getenv("MONGODB_URI"), os.Getenv("DB_NAME"))
	if err := config.CreatebudgetAlertIndexes(); err != nil {
		log.Fatal(err)
	}

	router := mux.NewRouter()

	expenseHandler := handlers.NewExpenseHandler()
	userHandler := handlers.NewUserHandler()

	router.HandleFunc("/auth/register", userHandler.Register).Methods("POST")
	router.HandleFunc("/auth/login", userHandler.Login).Methods("POST")
	router.Handle("/user/monthly-limit", middleware.AuthMiddleware(http.HandlerFunc(userHandler.GetMonthlyLimit))).Methods("GET")
	router.Handle("/user/monthly-limit", middleware.AuthMiddleware(http.HandlerFunc(userHandler.UpdateMonthlyLimit))).Methods("PUT")
	router.Handle("/user/profile", middleware.AuthMiddleware(http.HandlerFunc(userHandler.GetProfile))).Methods("GET")
	router.Handle("/user/profile", middleware.AuthMiddleware(http.HandlerFunc(userHandler.UpdateProfile))).Methods("PUT")
	router.Handle("/user/settings", middleware.AuthMiddleware(http.HandlerFunc(userHandler.UpdateSettings))).Methods("PUT")

	router.Handle("/expenses/recent", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetRecentExpenses))).Methods("GET")
	router.Handle("/expenses", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.CreateExpense))).Methods("POST")
	router.Handle("/expenses", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetExpenses))).Methods("GET")
	router.Handle("/expenses/{id}", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetExpenseByID))).Methods("GET")
	router.Handle("/expenses/{id}", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.UpdateExpense))).Methods("PUT")
	router.Handle("/expenses/{id}", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.DeleteExpense))).Methods("DELETE")
	router.Handle("/dashboard", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetDashboardSummary))).Methods("GET")
	router.Handle("/analytics/category", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetCategorySummary))).Methods(("GET"))
	router.Handle("/analytics/monthly", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetMonthlySummary))).Methods("GET")
	router.Handle("/analytics/summary", middleware.AuthMiddleware(http.HandlerFunc(expenseHandler.GetPeriodSummary))).Methods("GET")

	log.Println("Server running on :8080")

	log.Fatal(
		http.ListenAndServe(
			":"+os.Getenv("PORT"), router,
		),
	)
}
