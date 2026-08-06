package main

import (
	"expense-tracker-backend/config"
	"expense-tracker-backend/handlers"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	config.ConnectDB(os.Getenv("MONGODB_URI"), os.Getenv("DB_NAME"))

	router := mux.NewRouter()

	expenseHandler := handlers.NewExpenseHandler()

	router.HandleFunc("/expenses", expenseHandler.CreateExpense).Methods("POST")
	router.HandleFunc("/expenses", expenseHandler.GetExpenses).Methods("GET")
	router.HandleFunc("/expenses/{id}", expenseHandler.GetExpenseByID).Methods("GET")
	router.HandleFunc("/expenses/{id}", expenseHandler.UpdateExpense).Methods("PUT")
	router.HandleFunc("/expenses/{id}", expenseHandler.DeleteExpense).Methods("DELETE")
	router.HandleFunc("/dashboard", expenseHandler.GetDashboardSummary).Methods("GET")
	router.HandleFunc("/analytics/category", expenseHandler.GetCategorySummary).Methods(("GET"))
	router.HandleFunc("/analytics/monthly", expenseHandler.GetMonthlySummary).Methods("GET")

	log.Println("Server running on :8080")

	log.Fatal(
		http.ListenAndServe(
			":"+os.Getenv("PORT"), router,
		),
	)
}
