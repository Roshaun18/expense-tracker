# 💰 Expense Tracker

A full-stack personal finance and expense management application built with **React Native, Expo, TypeScript, Go, and MongoDB**.

The application enables users to manage income and expenses, monitor monthly spending, configure budgets, view financial analytics, manage their profile and settings, and receive budget-related notifications.

---

## 📌 Overview

Expense Tracker follows a layered client-server architecture:

```text
┌──────────────────────────────────────────────┐
│              React Native Mobile             │
│                Expo + TypeScript              │
│                                              │
│  Screens → Hooks → Services → API Requests  │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTP / JSON / HTTPS
                       ▼
┌──────────────────────────────────────────────┐
│                  Go Backend                  │
│                                              │
│ Middleware → Handlers → Services → Repository│
└──────────────────────┬───────────────────────┘
                       │
                       ▼
                ┌──────────────┐
                │   MongoDB    │
                └──────────────┘
```

The frontend is responsible for the user interface and client-side state, while the Go backend handles authentication, business logic, validation, database operations, analytics, and budget processing.

---

# ✨ Features

## 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Secure token storage
* User-specific data access
* Password hashing
* Login and registration validation
* Protected backend routes

## 💳 Transaction Management

* Add income
* Add expenses
* View transactions
* View recent transactions
* Edit transactions
* Delete transactions
* Transaction categories
* Transaction notes
* Transaction dates
* Income/expense separation

## 📊 Dashboard

* Current balance
* Monthly spending
* Spending information
* Recent transactions
* Quick actions
* Budget information
* Notification count

## 📈 Analytics

* Category spending analysis
* Monthly spending analysis
* Period-based summaries
* Spending trends
* Statistical cards
* Donut and bar chart visualizations

## 💰 Budget Management

* Monthly spending limit
* Current-month expense calculation
* Budget utilization percentage
* 80% warning threshold
* 100%+ exceeded threshold
* Monthly alert state tracking
* Prevention of repeated threshold notifications

## 🔔 Notifications

* Notification bell
* Notification count badge
* Notification history
* Clear notifications
* Android system notifications
* Daily expense reminders
* Budget warning notifications
* Budget exceeded notifications
* User-specific local notification storage

Notification history is stored locally using AsyncStorage rather than a MongoDB notifications collection.

## 👤 Profile & Settings

* View profile
* Update profile
* Currency selection
* Monthly budget limit
* Daily reminder setting
* Budget alert setting
* Account information

---

# 🏗️ Complete Project Structure

The following structure represents the actual application source tree, excluding generated dependency directories such as `node_modules`, `.git`, and `.expo`.

```text
expense-tracker/
│
├── README.md
│
├── backend/
│   │
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   │
│   ├── config/
│   │   ├── database.go
│   │   └── indexes.go
│   │
│   ├── handlers/
│   │   ├── expense_handler.go
│   │   └── user_handler.go
│   │
│   ├── middleware/
│   │   └── auth.go
│   │
│   ├── models/
│   │   ├── auth.go
│   │   ├── budget_alert.go
│   │   ├── category_summary.go
│   │   ├── dashboard.go
│   │   ├── expense.go
│   │   ├── monthly_summary.go
│   │   └── user.go
│   │
│   ├── repository/
│   │   ├── budget_alert_repository.go
│   │   ├── expense_repository.go
│   │   └── user_repository.go
│   │
│   ├── routes/
│   │
│   ├── services/
│   │   ├── expense_service.go
│   │   └── user_service.go
│   │
│   ├── utils/
│   │   └── jwt.go
│   │
│   ├── validators/
│   │   └── expense_validators.go
│   │
│   ├── .env
│   ├── .gitignore
│   ├── go.mod
│   └── go.sum
│
└── mobile/
    │
    ├── app/
    │   ├── (auth)/
    │   │   ├── _layout.tsx
    │   │   ├── login.tsx
    │   │   └── register.tsx
    │   │
    │   ├── (tabs)/
    │   │   ├── _layout.tsx
    │   │   ├── analytics.tsx
    │   │   ├── history.tsx
    │   │   ├── index.tsx
    │   │   └── profile.tsx
    │   │
    │   ├── transaction/
    │   │   ├── [id].tsx
    │   │   └── edit.tsx
    │   │
    │   ├── _layout.tsx
    │   ├── add-expense.tsx
    │   ├── add-income.tsx
    │   ├── index.tsx
    │   └── settings.tsx
    │
    ├── assets/
    │   ├── adaptive-icon.png
    │   ├── favicon.png
    │   ├── icon.png
    │   └── splash-icon.png
    │
    ├── components/
    │   │
    │   ├── analytics/
    │   │   ├── BarChart.tsx
    │   │   ├── CategorySpendingCard.tsx
    │   │   ├── DonutChart.tsx
    │   │   ├── PeriodSelector.tsx
    │   │   ├── SpendTrendCard.tsx
    │   │   └── StatsCard.tsx
    │   │
    │   ├── common/
    │   │   ├── Avatar.tsx
    │   │   ├── ButtomNavigation.tsx
    │   │   ├── Chip.tsx
    │   │   ├── GlassButton.tsx
    │   │   ├── GlassCard.tsx
    │   │   ├── GradientButton.tsx
    │   │   ├── PrimaryButton.tsx
    │   │   ├── ScreenBackground.tsx
    │   │   ├── ScreenHeader.tsx
    │   │   ├── StepIndicator.tsx
    │   │   ├── TextField.tsx
    │   │   └── ...
    │   │
    │   ├── dashboard/
    │   │   ├── ActionButton.tsx
    │   │   ├── BalanceCard.tsx
    │   │   ├── Header.tsx
    │   │   ├── MonthlySpendingCard.tsx
    │   │   ├── NotificationPanel.tsx
    │   │   ├── QuickActions.tsx
    │   │   ├── SpendingCard.tsx
    │   │   ├── TipCard.tsx
    │   │   ├── TransactionCard.tsx
    │   │   └── TransactionItem.tsx
    │   │
    │   ├── history/
    │   │   ├── FilterChip.tsx
    │   │   ├── HistoryCard.tsx
    │   │   └── SearchBar.tsx
    │   │
    │   ├── profile/
    │   │   ├── CurrencySelector.tsx
    │   │   ├── MenuItem.tsx
    │   │   ├── MonthlyLimitCard.tsx
    │   │   ├── NotificationSettings.tsx
    │   │   ├── ProfileCard.tsx
    │   │   ├── ProfileHeader.tsx
    │   │   ├── ProfileMenu.tsx
    │   │   └── ProfileMenuItem.tsx
    │   │
    │   └── transaction/
    │       ├── AmountInput.tsx
    │       ├── CategoryChip.tsx
    │       ├── DatePickerField.tsx
    │       ├── IncomeExpenseToggle.tsx
    │       ├── NotesInput.tsx
    │       └── SaveButton.tsx
    │
    ├── constants/
    │   └── transactionCategories.ts
    │
    ├── hooks/
    │   ├── useCategoryAnalytics.ts
    │   ├── useDashboard.ts
    │   ├── useExpenses.ts
    │   ├── useLogin.ts
    │   ├── useMonthlyAnalytics.ts
    │   ├── useMonthlyLimit.ts
    │   ├── usePeriodSummary.ts
    │   ├── useProfile.ts
    │   ├── useRecentExpenses.ts
    │   └── useRegister.ts
    │
    ├── screens/
    │   ├── AddTransaction/
    │   │   └── AddTransactionScreen.tsx
    │   │
    │   ├── Analytics/
    │   │   └── AnalyticsScreen.tsx
    │   │
    │   ├── Dashboard/
    │   │   └── DashboardScreen.tsx
    │   │
    │   ├── History/
    │   │   └── HistoryScreen.tsx
    │   │
    │   ├── Login/
    │   │   └── LoginScreen.tsx
    │   │
    │   ├── Profile/
    │   │   ├── ProfileScreen.tsx
    │   │   └── SettingScreen.tsx
    │   │
    │   └── Register/
    │       └── RegisterScreen.tsx
    │
    ├── services/
    │   ├── analyticsService.ts
    │   ├── api.ts
    │   ├── authService.ts
    │   ├── dashboardService.ts
    │   ├── expenseService.ts
    │   ├── notificationService.ts
    │   ├── notificationStorage.ts
    │   └── userService.ts
    │
    ├── theme/
    │   ├── animation.ts
    │   ├── colors.ts
    │   ├── glass.ts
    │   ├── gradients.ts
    │   ├── index.ts
    │   ├── radius.ts
    │   ├── shadows.ts
    │   ├── spacing.ts
    │   └── typography.ts
    │
    ├── types/
    │   ├── auth.ts
    │   ├── transaction.ts
    │   └── user.ts
    │
    ├── utils/
    │   ├── formatter.ts
    │   └── helpers.ts
    │
    ├── validators/
    │   ├── loginValidator.ts
    │   └── registerValidator.ts
    │
    ├── .gitignore
    ├── AGENTS.md
    ├── App.tsx
    ├── app.json
    ├── CLAUDE.md
    ├── eas.json
    ├── index.ts
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

> **Note:** `node_modules/`, `.git/`, and `.expo/` are intentionally omitted because they contain generated dependencies, Git metadata, and Expo-generated files rather than application source code.

---

# 🖥️ Backend Architecture

The backend follows a layered architecture:

```text
HTTP Request
     ↓
Middleware
     ↓
Handler
     ↓
Service
     ↓
Repository
     ↓
MongoDB
```

Each layer has a specific responsibility.

---

## `backend/cmd/server`

### `main.go`

Application entry point.

Responsibilities:

* Load environment configuration
* Connect to MongoDB
* Create database indexes
* Initialize handlers
* Configure routes
* Apply authentication middleware
* Start the HTTP server

---

# ⚙️ Backend Configuration

```text
backend/config/
├── database.go
└── indexes.go
```

### `database.go`

Responsible for:

* Creating the MongoDB client
* Establishing the database connection
* Performing a database ping
* Initializing the application database

### `indexes.go`

Contains MongoDB index creation logic.

The budget alert system uses a compound index involving:

```text
user_id + month
```

This improves lookup performance for monthly budget-alert state.

---

# 📦 Backend Models

```text
backend/models/
```

### `user.go`

Represents application users and their settings.

Includes information such as:

* Name
* Email
* Password
* Monthly limit
* Currency
* Account type
* Reminder settings
* Budget alert settings
* Timestamps

### `auth.go`

Contains authentication-related request/response structures.

### `expense.go`

Represents income and expense transactions.

Important fields include:

```text
ID
UserID
Title
Amount
Category
Type
Note
Date
CreatedAt
UpdatedAt
```

### `budget_alert.go`

Contains budget-alert state and response structures.

### `dashboard.go`

Contains dashboard summary structures.

### `category_summary.go`

Contains category analytics structures.

### `monthly_summary.go`

Contains monthly analytics structures.

---

# 🗄️ Repository Layer

```text
backend/repository/
├── budget_alert_repository.go
├── expense_repository.go
└── user_repository.go
```

The repository layer contains database-specific operations.

### `expense_repository.go`

Handles:

* Creating expenses
* Retrieving expenses
* Updating expenses
* Deleting expenses
* Recent transactions
* Monthly expense aggregation

### `user_repository.go`

Handles user-related database operations such as:

* User lookup
* Profile updates
* Settings updates
* Monthly limit operations
* Budget settings

### `budget_alert_repository.go`

Handles:

* Retrieving monthly alert state
* Marking warning alerts as sent
* Marking exceeded alerts as sent

---

# 🧠 Service Layer

```text
backend/services/
├── expense_service.go
└── user_service.go
```

The service layer contains business logic.

### Expense Service

Responsible for:

* Transaction validation
* Creating transactions
* Updating transactions
* Deleting transactions
* Monthly spending calculations
* Budget calculations
* Budget alert decisions

### User Service

Responsible for:

* Registration
* Login
* Password verification
* JWT generation
* Profile operations
* User settings

---

# 🌐 Handler Layer

```text
backend/handlers/
├── expense_handler.go
└── user_handler.go
```

Handlers deal with HTTP requests and responses.

Responsibilities include:

* HTTP method validation
* JSON decoding
* Authentication context extraction
* Request validation
* Calling services
* HTTP status handling
* JSON response generation

Handlers do not directly perform MongoDB operations.

---

# 🔐 Authentication Middleware

```text
backend/middleware/auth.go
```

The middleware protects authenticated endpoints.

```text
Client
  ↓
Authorization Header
  ↓
JWT Validation
  ↓
Extract User ID
  ↓
Request Context
  ↓
Protected Handler
```

This ensures that protected operations are performed in the context of the authenticated user.

---

# 🔑 JWT Utility

```text
backend/utils/jwt.go
```

Provides JWT-related functionality such as:

* Token creation
* Token validation
* User identification

The JWT secret is supplied through environment configuration.

---

# ✅ Backend Validation

```text
backend/validators/
└── expense_validators.go
```

Validation is separated from HTTP handling and business processing.

Examples of validation include:

* Required transaction fields
* Valid transaction type
* Valid amount
* Valid category

---

# 📱 Mobile Architecture

The mobile application uses:

```text
Expo
React Native
TypeScript
Expo Router
```

The application is organized into:

```text
Screens
   ↓
Hooks
   ↓
Services
   ↓
API
   ↓
Go Backend
```

---

# 🧭 Expo Router Structure

```text
mobile/app/
```

Expo Router provides file-based navigation.

### Authentication

```text
app/(auth)/
├── _layout.tsx
├── login.tsx
└── register.tsx
```

### Main Tabs

```text
app/(tabs)/
├── _layout.tsx
├── index.tsx
├── history.tsx
├── analytics.tsx
└── profile.tsx
```

### Transactions

```text
app/transaction/
├── [id].tsx
└── edit.tsx
```

Additional application routes include:

```text
add-expense.tsx
add-income.tsx
settings.tsx
```

---

# 🖼️ Screens

The project also maintains dedicated screen-level components:

```text
mobile/screens/
```

```text
Login
Register
Dashboard
AddTransaction
History
Analytics
Profile
```

These provide screen-level composition while reusable UI elements remain inside `components/`.

---

# 🧩 Components

Reusable UI components are grouped by feature.

```text
components/
├── analytics/
├── common/
├── dashboard/
├── history/
├── profile/
└── transaction/
```

This organization makes feature-specific UI easier to maintain.

---

# 📊 Analytics Components

```text
components/analytics/
```

Contains:

* `BarChart`
* `DonutChart`
* `CategorySpendingCard`
* `SpendTrendCard`
* `StatsCard`
* `PeriodSelector`

These components provide the visual representation of financial analytics.

---

# 🏠 Dashboard Components

```text
components/dashboard/
```

Contains:

* Balance card
* Spending card
* Monthly spending card
* Quick actions
* Transaction cards
* Header
* Notification panel
* Tips

The dashboard combines these reusable components into the main financial overview.

---

# 💳 Transaction Components

```text
components/transaction/
```

Contains reusable controls for:

* Amount input
* Category selection
* Income/expense selection
* Date selection
* Notes
* Save operation

---

# 👤 Profile Components

```text
components/profile/
```

Contains:

* Profile card
* Profile header
* Profile menu
* Currency selector
* Monthly limit card
* Notification settings
* Menu items

---

# 🔄 React Hooks

```text
mobile/hooks/
```

The application uses feature-specific hooks:

```text
useLogin
useRegister
useExpenses
useRecentExpenses
useDashboard
useCategoryAnalytics
useMonthlyAnalytics
usePeriodSummary
useProfile
useMonthlyLimit
```

Hooks provide reusable state and API interaction logic to screens.

---

# 🌐 Frontend Services

```text
mobile/services/
```

## `api.ts`

Centralized HTTP communication.

Responsible for:

* API requests
* Request configuration
* Authentication handling
* API error processing

## `authService.ts`

Handles:

* Login
* Registration
* Logout
* Secure token storage
* User identification

## `expenseService.ts`

Handles:

* Getting expenses
* Getting recent expenses
* Creating expenses
* Updating expenses
* Deleting expenses
* Processing budget-alert responses

## `dashboardService.ts`

Handles dashboard-related API requests.

## `analyticsService.ts`

Handles analytics API requests.

## `userService.ts`

Handles profile and user settings operations.

## `notificationService.ts`

Handles:

* Notification permission
* Android notifications
* Budget notifications
* Daily reminders

## `notificationStorage.ts`

Handles local notification history using AsyncStorage.

---

# 🔔 Notification Architecture

Notifications use two separate mechanisms:

```text
                 Backend
                    │
                    ▼
              Budget Alert
                    │
                    ▼
             React Native
              /         \
             /           \
            ▼             ▼
     AsyncStorage    Expo Notifications
            │                 │
            ▼                 ▼
      Bell History       Android OS
```

### Local Notification History

Stored using AsyncStorage.

There is deliberately no MongoDB notifications collection.

Notification data is associated with the logged-in user so that separate accounts do not share notification history.

---

# 💰 Budget Alert Flow

When an expense is created:

```text
Create Expense
      ↓
Save Transaction
      ↓
Calculate Current Month Spending
      ↓
Get User Monthly Limit
      ↓
Calculate Percentage
      ↓
Check Alert State
      ↓
┌────────────────────────────┐
│ Percentage < 80%           │
│ → No Alert                  │
├────────────────────────────┤
│ Percentage >= 80%           │
│ → Warning Alert             │
├────────────────────────────┤
│ Percentage >= 100%          │
│ → Exceeded Alert            │
└────────────────────────────┘
      ↓
Return Budget Alert
      ↓
Mobile Notification Service
      ↓
Notification History + OS Notification
```

The backend tracks warning/exceeded state per user and month to avoid repeatedly triggering the same alert.

---

# 📋 API Endpoints

## Authentication

| Method | Endpoint         | Purpose       |
| ------ | ---------------- | ------------- |
| POST   | `/auth/register` | Register user |
| POST   | `/auth/login`    | Login user    |

## User

| Method | Endpoint              | Purpose              |
| ------ | --------------------- | -------------------- |
| GET    | `/user/profile`       | Get profile          |
| PUT    | `/user/profile`       | Update profile       |
| GET    | `/user/monthly-limit` | Get monthly limit    |
| PUT    | `/user/monthly-limit` | Update monthly limit |
| PUT    | `/user/settings`      | Update settings      |

## Expenses

| Method | Endpoint           | Purpose                 |
| ------ | ------------------ | ----------------------- |
| POST   | `/expenses`        | Create transaction      |
| GET    | `/expenses`        | Get transactions        |
| GET    | `/expenses/recent` | Get recent transactions |
| GET    | `/expenses/{id}`   | Get transaction         |
| PUT    | `/expenses/{id}`   | Update transaction      |
| DELETE | `/expenses/{id}`   | Delete transaction      |

## Dashboard

| Method | Endpoint     | Purpose           |
| ------ | ------------ | ----------------- |
| GET    | `/dashboard` | Dashboard summary |

## Analytics

| Method | Endpoint              | Purpose           |
| ------ | --------------------- | ----------------- |
| GET    | `/analytics/category` | Category spending |
| GET    | `/analytics/monthly`  | Monthly analytics |
| GET    | `/analytics/summary`  | Period summary    |

---

# 🔄 Example Request Flow

For creating an expense:

```text
React Native
    │
    │ POST /expenses
    ▼
API Service
    │
    ▼
Go Router
    │
    ▼
Auth Middleware
    │
    ▼
Expense Handler
    │
    ▼
Expense Service
    │
    ├── Validate
    ├── Create Expense
    ├── Calculate Spending
    ├── Get Budget
    └── Check Alert
    │
    ▼
Expense Repository
    │
    ▼
MongoDB
    │
    ▼
JSON Response
    │
    ▼
React Native
```

---

# 🗃️ Database

MongoDB is used as the primary persistent database.

Main application data includes:

```text
Users
Expenses
Budget Alert States
```

The application uses MongoDB aggregation for calculations such as current-month expense totals and analytics.

---

# 🔒 Security

Security-related implementation includes:

* JWT authentication
* Password hashing
* Secure token storage
* Protected backend endpoints
* User ID-based data isolation
* Environment-based secrets
* HTTPS production communication
* Password excluded from API responses
* Input validation

Sensitive environment files should never be committed to the repository.

---

# 🎨 UI & Theme System

The mobile application has a centralized theme:

```text
mobile/theme/
```

Including:

```text
colors.ts
spacing.ts
typography.ts
radius.ts
shadows.ts
gradients.ts
animation.ts
glass.ts
```

This provides centralized control over:

* Colors
* Typography
* Spacing
* Border radius
* Shadows
* Gradients
* Animations
* Glass-style UI

---

# 🛠️ Utilities & Constants

## Constants

```text
mobile/constants/
└── transactionCategories.ts
```

Contains predefined transaction categories.

## Utilities

```text
mobile/utils/
├── formatter.ts
└── helpers.ts
```

Provides reusable formatting and helper functions.

---

# ✅ Frontend Validation

```text
mobile/validators/
├── loginValidator.ts
└── registerValidator.ts
```

Client-side validation is separated from screen components to keep form logic organized and reusable.

---

# 📦 Technology Stack

## Frontend

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| React Native       | Mobile application                |
| Expo               | React Native development platform |
| Expo Router        | File-based navigation             |
| TypeScript         | Type-safe development             |
| AsyncStorage       | Local notification history        |
| Expo Secure Store  | Secure token storage              |
| Expo Notifications | Mobile notifications              |

## Backend

| Technology              | Purpose                |
| ----------------------- | ---------------------- |
| Go                      | Backend development    |
| Gorilla Mux             | HTTP routing           |
| JWT                     | Authentication         |
| bcrypt/password hashing | Password security      |
| MongoDB Driver          | Database communication |

## Database

```text
MongoDB
MongoDB Atlas
```

## Deployment

```text
Render
Expo EAS
MongoDB Atlas
```

## Development Tools

```text
Git
GitHub
VS Code
Postman
curl
Docker
```

---

# 🚀 Local Development

## Backend

```bash
cd backend
go mod download
go run ./cmd/server
```

Configure environment variables:

```env
MONGODB_URI=<your-mongodb-uri>
DB_NAME=expense_tracker
JWT_SECRET=<your-secret>
PORT=8080
```

The local backend runs on:

```text
http://localhost:8080
```

---

# 📱 Mobile

```bash
cd mobile
npm install
```

Start Expo:

```bash
npx expo start
```

For features requiring native functionality such as notifications, use an Expo development build rather than relying entirely on Expo Go.

---

# 🌍 Production Architecture

```text
                 Android Application
                         │
                         │ HTTPS
                         ▼
                 ┌─────────────────┐
                 │     Render      │
                 │    Go Backend   │
                 └────────┬────────┘
                          │
                          │ MongoDB Driver
                          ▼
                 ┌─────────────────┐
                 │  MongoDB Atlas  │
                 └─────────────────┘
```

The production mobile application communicates with the public HTTPS backend rather than localhost.

---

# 📦 Android Production Build

Production Android builds are generated using EAS:

```bash
eas build --platform android --profile production
```

Development builds can use the development EAS profile defined in:

```text
mobile/eas.json
```

---

# 🧪 Testing Checklist

The following scenarios should be tested before release:

### Authentication

* [ ] Register new account
* [ ] Login with valid credentials
* [ ] Reject invalid credentials
* [ ] Logout
* [ ] Login with another account

### Transactions

* [ ] Add expense
* [ ] Add income
* [ ] View transactions
* [ ] Edit transaction
* [ ] Delete transaction
* [ ] Validate invalid transaction data

### Budget

* [ ] Configure monthly limit
* [ ] Reach 80% threshold
* [ ] Reach 100% threshold
* [ ] Verify duplicate alerts are prevented
* [ ] Verify alerts are isolated between users

### Notifications

* [ ] Notification permission
* [ ] Budget warning notification
* [ ] Budget exceeded notification
* [ ] Notification appears in bell history
* [ ] Notification survives app restart
* [ ] Clear notifications
* [ ] Verify different users do not share notifications

### Profile & Settings

* [ ] Update profile
* [ ] Change currency
* [ ] Update monthly limit
* [ ] Enable/disable reminders
* [ ] Enable/disable budget alerts

### Analytics

* [ ] Category analytics
* [ ] Monthly analytics
* [ ] Period summary
* [ ] Spending trends
* [ ] Dashboard calculations

---

# 🧱 Design & Engineering Principles

The project follows these principles:

### Separation of Concerns

```text
Handler
   ↓
Service
   ↓
Repository
```

### Reusable Components

UI elements are extracted into reusable components instead of duplicating UI logic.

### Centralized Services

API communication and business-related frontend operations are centralized inside service classes.

### Validation

Validation is separated from screen and handler logic.

### Security

Authentication, password protection, secure token storage, and user isolation are treated as core requirements.

### Error Handling

Errors are explicitly handled across API, service, database, authentication, validation, and notification layers.

### User Data Isolation

Authenticated user IDs are used to ensure users only access their own financial data and notification history.

---

# 🔮 Future Improvements

Possible future improvements include:

* Refresh token mechanism
* Automated unit tests
* Backend integration tests
* Frontend testing
* CI/CD pipeline
* Structured logging
* Rate limiting
* API versioning
* Pagination for large transaction histories
* Offline transaction support
* Recurring transactions
* Savings goals
* Transaction export
* Automated backups
* Monitoring and observability
* Advanced financial reports

---

# 📌 Project Status

**Status: Active Development / Production Deployment**

Current functionality includes:

* Authentication
* JWT authorization
* Expense management
* Income management
* Dashboard
* Analytics
* Monthly budgets
* Budget alerts
* Notification history
* Android system notifications
* User profiles
* User settings
* MongoDB persistence
* Cloud backend deployment
* Production Android build configuration

---

# 📄 License

This project is licensed under the MIT License.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of this software, subject to the conditions of the MIT License.

See the LICENSE file for the complete license text.
