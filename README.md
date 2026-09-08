# 💰 Expense Tracker

A full-stack personal finance and expense management mobile application built with **React Native, Expo, TypeScript, Go, and MongoDB**.

The application allows users to manage income and expenses, monitor monthly spending, configure budgets, view financial analytics, manage profile and settings, and receive local and remote notifications.

---

## 📌 Overview

Expense Tracker follows a layered client-server architecture:

```text
┌──────────────────────────────────────────────┐
│             React Native Mobile              │
│               Expo + TypeScript              │
│                                              │
│ Screens → Hooks → Services → API Requests   │
└──────────────────────┬───────────────────────┘
                       │
                       │ HTTPS / JSON
                       ▼
┌──────────────────────────────────────────────┐
│                 Go Backend                   │
│                                              │
│ Middleware → Handlers → Services → Repository│
└──────────────────────┬───────────────────────┘
                       │
                       ▼
                ┌──────────────┐
                │   MongoDB    │
                │    Atlas     │
                └──────────────┘
```

The frontend handles presentation, navigation, client-side state, secure token storage, and notification UI. The Go backend handles authentication, authorization, validation, business logic, database operations, analytics, budget processing, and server-side scheduled reminders.

---

# ✨ Features

## 🔐 Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- JWT validation through middleware
- Secure token storage using Expo Secure Store
- Persistent login across app restarts
- Logout
- Password hashing using bcrypt
- Protected backend routes
- User-specific data access
- Authenticated user ID extracted from request context

## 💳 Transaction Management

- Add income
- Add expenses
- View transactions
- View recent transactions
- View individual transactions
- Edit transactions
- Delete transactions
- Transaction categories
- Transaction notes
- Transaction dates
- Income/expense separation
- User-specific transaction isolation

## 📊 Dashboard

- Current balance
- Monthly spending
- Spending information
- Recent transactions
- Quick actions
- Monthly budget information
- Notification count
- Budget utilization information

## 📈 Analytics

- Category spending analysis
- Monthly spending analysis
- Period-based summaries
- Spending trends
- Statistical summary cards
- Donut chart visualization
- Bar chart visualization

## 💰 Budget Management

- Configurable monthly spending limit
- Current-month expense aggregation
- Budget utilization percentage
- 80% warning threshold
- 100%+ exceeded threshold
- Monthly alert state tracking
- Prevention of repeated warning alerts
- Prevention of repeated exceeded alerts
- Per-user budget alert state
- Per-month budget alert state

### Budget Alert Flow

```text
Create Expense
      ↓
Save Transaction
      ↓
Calculate Current Month Spending
      ↓
Get User Monthly Limit
      ↓
Calculate Budget Percentage
      ↓
Check Monthly Alert State
      ↓
┌───────────────────────────────┐
│ < 80%                         │
│ No alert                      │
├───────────────────────────────┤
│ >= 80% and < 100%             │
│ Warning alert                 │
├───────────────────────────────┤
│ >= 100%                       │
│ Exceeded alert                │
└───────────────────────────────┘
      ↓
Return Budget Alert
      ↓
Mobile Notification Service
      ↓
Bell History + Android Notification
```

The backend stores warning/exceeded state per user and month so the same threshold is not repeatedly notified.

---

# 🔔 Notification System

The notification system uses both **local device notifications** and **backend-triggered push notifications**.

There is deliberately **no MongoDB notifications collection**.

```text
                         Notification System
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
       Budget Alerts                       Daily Reminders
              │                                   │
              ▼                                   ▼
        Go Backend                         Go Backend + Cron
              │                                   │
              ▼                                   ▼
        Mobile API                         Expo Push API
              │                                   │
              └───────────────┬───────────────────┘
                              ▼
                    Expo Notifications
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
          Android System              Local History
          Notification               AsyncStorage
```

## 🔔 Notification Bell

- Notification bell on dashboard
- Unread notification count
- Notification history
- Clear notifications
- Notifications remain until explicitly cleared
- Opening the bell does not automatically clear notifications
- Notification history is stored locally
- Notification history is isolated per logged-in user

## ⚠️ Budget Notifications

Two budget thresholds are supported:

- **80%** → Budget warning
- **100% or more** → Budget exceeded

When the backend detects a threshold:

1. Expense is stored.
2. Current-month spending is calculated.
3. Monthly limit is retrieved.
4. Alert percentage is calculated.
5. Backend checks the user's monthly alert state.
6. A warning/exceeded alert is returned only when appropriate.
7. The mobile app creates the notification.
8. The notification is stored in user-specific AsyncStorage.
9. Android displays the system notification.

## 📅 Daily Expense Reminder

The application also supports a server-side daily reminder.

The purpose is to remind users who have enabled daily reminders but **have not recorded an expense for the current day**.

```text
Cron Job
   │
   │ POST /internal/daily-reminder
   │ X-Cron-Secret
   ▼
Daily Reminder Handler
   ▼
Daily Reminder Service
   │
   ├── Get users with daily_reminders = true
   │
   ├── Check push_token
   │
   ├── Check whether user has an expense today
   │
   └── Send push notification when no expense exists
              │
              ▼
        Expo Push API
              │
              ▼
          User Device
```

The daily expense check uses the **Asia/Kolkata timezone** so the definition of "today" matches the application's intended local time.

### Daily Reminder Schedule

- **9:00 AM local device reminder**: scheduled using Expo Notifications.
- **9:00 PM server-side reminder**: handled by the backend through an external cron service.
- The 9:00 PM reminder is skipped when the user has already recorded an expense that day.
- The 9:00 PM reminder is also skipped when daily reminders are disabled or no push token is available.

## 📲 Push Token Registration

After successful login:

```text
Login
  ↓
Save JWT + User ID
  ↓
Request Notification Permission
  ↓
Get Expo Push Token
  ↓
POST /user/push-token
  ↓
Authenticated Backend User
  ↓
MongoDB users.push_token
```

The push token is associated with the authenticated user.

The frontend does not provide the user ID for this operation. The backend obtains the user ID from authentication middleware.

---

# 👤 Profile & Settings

- View profile
- Update profile
- Currency selection
- Monthly spending limit
- Daily reminder setting
- Budget alert setting
- Account information
- User-specific notification settings

---

# 🏗️ Project Structure

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
│   │   ├── user_handler.go
│   │   └── daily_reminder_handler.go
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
│   │   ├── user_service.go
│   │   ├── daily_reminder_service.go
│   │   └── notification_service.go
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
    │   ├── analytics/
    │   ├── common/
    │   ├── dashboard/
    │   ├── history/
    │   ├── profile/
    │   └── transaction/
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
    ├── eas.json
    ├── index.ts
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

> `node_modules/`, `.git/`, and `.expo/` are generated directories and are intentionally excluded.

---

# 🖥️ Backend Architecture

The backend uses a layered architecture:

```text
HTTP Request
     ↓
Authentication Middleware
     ↓
Handler
     ↓
Service
     ↓
Repository
     ↓
MongoDB
```

Each layer has a dedicated responsibility.

## `backend/cmd/server/main.go`

Application entry point.

Responsibilities:

- Load environment configuration
- Connect to MongoDB
- Create database indexes
- Initialize repositories
- Initialize services
- Initialize handlers
- Configure routes
- Apply authentication middleware
- Start the HTTP server

## `backend/config/`

### `database.go`

Responsible for:

- Creating the MongoDB client
- Establishing the database connection
- Performing database connectivity checks
- Initializing the application database

### `indexes.go`

Contains MongoDB index creation logic.

The budget alert system uses a compound index involving:

```text
user_id + month
```

This improves monthly alert-state lookups.

---

# 📦 Backend Models

`backend/models/`

### `user.go`

Represents application users and their settings.

Includes:

- ID
- Name
- Email
- Password
- Monthly limit
- Currency
- Account type
- Daily reminder setting
- Budget alert setting
- Push token
- Created timestamp
- Updated timestamp

The password is excluded from normal API responses.

### `auth.go`

Authentication request and response structures.

### `expense.go`

Represents income and expense transactions.

Important fields:

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

Contains:

- Budget alert state
- Warning state
- Exceeded state
- Alert response information

### Analytics Models

- `dashboard.go`
- `category_summary.go`
- `monthly_summary.go`

These contain structures used by dashboard and analytics endpoints.

---

# 🗄️ Repository Layer

```text
backend/repository/
├── budget_alert_repository.go
├── expense_repository.go
└── user_repository.go
```

The repository layer contains MongoDB-specific operations.

## `expense_repository.go`

Handles:

- Creating transactions
- Retrieving transactions
- Retrieving recent transactions
- Updating transactions
- Deleting transactions
- Current-month expense aggregation
- Checking whether the user has an expense today

## `user_repository.go`

Handles:

- User lookup
- User creation
- Profile operations
- Settings operations
- Monthly limit operations
- Budget settings
- Push token storage
- Retrieving users eligible for daily reminders

## `budget_alert_repository.go`

Handles:

- Getting monthly alert state
- Marking warning alerts as sent
- Marking exceeded alerts as sent

---

# 🧠 Service Layer

```text
backend/services/
├── expense_service.go
├── user_service.go
├── daily_reminder_service.go
└── notification_service.go
```

## Expense Service

Responsible for:

- Transaction validation
- Creating transactions
- Updating transactions
- Deleting transactions
- Monthly spending calculations
- Budget calculations
- Budget threshold decisions
- Returning budget alert information

## User Service

Responsible for:

- Registration
- Login
- Password verification
- JWT generation
- Profile operations
- Settings operations
- Monthly limit operations
- Push token updates

## Daily Reminder Service

Responsible for:

- Finding users who enabled daily reminders
- Checking whether a push token exists
- Checking whether the user has recorded an expense today
- Skipping users who already recorded an expense
- Sending push notifications to eligible users
- Handling notification failures per user

## Notification Service

Responsible for server-side push notification delivery through the Expo Push API.

---

# 🌐 Handler Layer

```text
backend/handlers/
├── expense_handler.go
├── user_handler.go
└── daily_reminder_handler.go
```

Handlers are responsible for HTTP-level concerns:

- HTTP method validation
- JSON decoding
- Authentication context extraction
- Request validation
- Calling services
- HTTP status handling
- JSON response generation

Handlers do not directly perform MongoDB operations.

---

# 🔐 Authentication Middleware

```text
backend/middleware/auth.go
```

Protected request flow:

```text
Client
  ↓
Authorization: Bearer <JWT>
  ↓
JWT Validation
  ↓
Extract User ID
  ↓
Request Context
  ↓
Protected Handler
```

The authenticated user ID is used to isolate user-specific data.

---

# 🔑 JWT Utility

```text
backend/utils/jwt.go
```

Provides:

- JWT creation
- JWT validation
- User identification

The JWT secret is supplied through environment configuration.

---

# ✅ Backend Validation

```text
backend/validators/
└── expense_validators.go
```

Validation is separated from HTTP handling and business logic.

Examples:

- Required transaction fields
- Valid transaction type
- Valid amount
- Valid category
- Valid transaction data

---

# 📱 Mobile Architecture

The mobile application uses:

- React Native
- Expo
- TypeScript
- Expo Router

Application flow:

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

# 🧭 Expo Router

`mobile/app/` provides file-based navigation.

## Authentication

```text
app/(auth)/
├── _layout.tsx
├── login.tsx
└── register.tsx
```

## Main Tabs

```text
app/(tabs)/
├── _layout.tsx
├── index.tsx
├── history.tsx
├── analytics.tsx
└── profile.tsx
```

## Transactions

```text
app/transaction/
├── [id].tsx
└── edit.tsx
```

Additional routes:

```text
add-expense.tsx
add-income.tsx
settings.tsx
```

---

# 🖼️ Screens

Dedicated screen-level components are maintained under:

```text
mobile/screens/
```

Main screens include:

- Login
- Register
- Dashboard
- Add Transaction
- History
- Analytics
- Profile
- Settings

Reusable UI components are maintained separately under `components/`.

---

# 🧩 Components

Reusable components are organized by feature:

```text
components/
├── analytics/
├── common/
├── dashboard/
├── history/
├── profile/
└── transaction/
```

This keeps feature-specific UI isolated and reusable.

---

# 🔄 React Hooks

`mobile/hooks/`

Feature-specific hooks include:

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

Hooks provide reusable state and API interaction logic.

---

# 🌐 Frontend Services

`mobile/services/`

## `api.ts`

Centralized HTTP communication.

Handles:

- API requests
- Request configuration
- Authentication headers
- API errors

## `authService.ts`

Handles:

- Login
- Registration
- Logout
- JWT storage
- User ID storage

## `expenseService.ts`

Handles:

- Getting expenses
- Recent expenses
- Creating expenses
- Updating expenses
- Deleting expenses
- Budget alert responses
- Checking today's expense status

## `dashboardService.ts`

Handles dashboard API requests.

## `analyticsService.ts`

Handles analytics API requests.

## `userService.ts`

Handles:

- Profile operations
- Settings operations
- Monthly limit operations
- Push token registration

## `notificationService.ts`

Handles:

- Notification permission
- Expo push token registration
- Sending the token to the backend
- 9 AM local reminder
- Budget warning notifications
- Budget exceeded notifications
- Android system notifications

## `notificationStorage.ts`

Handles local notification history using AsyncStorage.

Notification storage is keyed by authenticated user ID so different accounts on the same device do not share notification history.

---

# 🔔 Notification Data Flow

## Budget Alert

```text
Expense Created
      ↓
Go Backend
      ↓
Budget Calculation
      ↓
Budget Alert Response
      ↓
React Native
      ├───────────────┐
      ▼               ▼
AsyncStorage     Expo Notifications
      │               │
      ▼               ▼
Bell History     Android OS
```

## Server Daily Reminder

```text
cron-job.org
      ↓
POST /internal/daily-reminder
      ↓
X-Cron-Secret
      ↓
DailyReminderHandler
      ↓
DailyReminderService
      ↓
Check Users
      ↓
Check Today's Expense
      ↓
Expo Push API
      ↓
Android Device
```

---

# 📋 API Endpoints

## Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |

## User

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/user/profile` | Get profile |
| PUT | `/user/profile` | Update profile |
| GET | `/user/monthly-limit` | Get monthly limit |
| PUT | `/user/monthly-limit` | Update monthly limit |
| PUT | `/user/settings` | Update settings |
| POST | `/user/push-token` | Store Expo push token |

## Expenses

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/expenses` | Create transaction |
| GET | `/expenses` | Get transactions |
| GET | `/expenses/recent` | Get recent transactions |
| GET | `/expenses/today` | Check today's expense |
| GET | `/expenses/{id}` | Get transaction |
| PUT | `/expenses/{id}` | Update transaction |
| DELETE | `/expenses/{id}` | Delete transaction |

## Dashboard

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/dashboard` | Dashboard summary |

## Analytics

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/analytics/category` | Category spending |
| GET | `/analytics/monthly` | Monthly analytics |
| GET | `/analytics/summary` | Period summary |

## Internal Scheduled Jobs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/internal/daily-reminder` | Process daily expense reminders |

The internal daily-reminder endpoint is protected with a server-side cron secret.

---

# 🔄 Example Request Flow

Creating an expense:

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
    ├── Calculate Monthly Spending
    ├── Get Monthly Budget
    ├── Check Alert State
    └── Generate Alert Response
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
    │
    ├── Update UI
    └── Show Notification if required
```

---

# 🗃️ Database

MongoDB is the primary persistent database.

Main application data:

```text
Users
Expenses
Budget Alert States
```

## Users

Stores:

- Account information
- Authentication data
- Currency
- Monthly limit
- Notification settings
- Push token
- Timestamps

## Expenses

Stores:

- User ID
- Title
- Amount
- Category
- Income/expense type
- Note
- Date
- Timestamps

## Budget Alert States

Stores:

- User ID
- Month
- Warning sent state
- Exceeded sent state
- Timestamps

There is intentionally **no notifications collection**.

Notification history is local to the mobile device.

MongoDB aggregation is used for calculations such as:

- Current-month expense totals
- Category analytics
- Monthly analytics
- Dashboard summaries

---

# 🔒 Security

Security-related implementation includes:

- JWT authentication
- JWT validation
- Password hashing using bcrypt
- Secure token storage
- Protected backend endpoints
- User ID-based data isolation
- Authenticated user ID from middleware context
- Environment-based secrets
- HTTPS production communication
- Password excluded from API responses
- Input validation
- Cron-secret protection for internal reminder endpoint
- Android API-key application restriction
- Firebase/Google services configuration for Android push notifications

Sensitive environment files and credentials must never be committed to the repository.

---

# 🎨 UI & Theme System

The mobile application uses a centralized theme:

```text
mobile/theme/
```

Includes:

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

The theme system centralizes:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Gradients
- Animations
- Glass-style UI

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

Client-side validation is separated from screen components.

---

# 📦 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React Native | Mobile application |
| Expo SDK 54 | React Native development/build platform |
| Expo Router | File-based navigation |
| TypeScript | Type-safe development |
| AsyncStorage | Local notification history |
| Expo Secure Store | Secure JWT/user ID storage |
| Expo Notifications | Mobile notifications |
| Expo Dev Client | Native development build |
| EAS Build | Cloud Android builds |

## Backend

| Technology | Purpose |
|---|---|
| Go | Backend development |
| Gorilla Mux | HTTP routing |
| JWT | Authentication |
| bcrypt | Password hashing |
| MongoDB Go Driver | Database communication |
| Expo Push API | Server-side push notification delivery |

## Database

```text
MongoDB
MongoDB Atlas
```

## Android / Notifications

```text
Firebase / Google Services
Expo Notifications
Expo Push API
FCM V1
```

## Deployment

```text
Render
Expo EAS
MongoDB Atlas
cron-job.org
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

# 🌍 Production Architecture

```text
                    Android Production App
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

### Scheduled Notification Architecture

```text
                    cron-job.org
                         │
                         │ POST + Cron Secret
                         ▼
                    Render Backend
                         │
                         ▼
               Daily Reminder Service
                         │
                         ▼
                  Expo Push API
                         │
                         ▼
                   Android Device
```

The production mobile application communicates with the public HTTPS backend and does not depend on a local development server.

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
CRON_SECRET=<your-cron-secret>
```

Local backend:

```text
http://localhost:8080
```

## Mobile

```bash
cd mobile
npm install
```

Start Expo for normal development:

```bash
npx expo start
```

For features requiring native functionality, especially push notifications and Firebase/FCM integration, use an Expo development build rather than relying entirely on Expo Go.

---

# 📦 Android Builds

## Development Build

The development profile in `mobile/eas.json` uses:

```json
{
  "developmentClient": true,
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```

A development APK can be generated with:

```bash
eas build --platform android --profile development
```

## Production Build

The production profile currently uses:

```json
{
  "autoIncrement": true
}
```

Build command:

```bash
eas build --platform android --profile production
```

The current production configuration generates an Android App Bundle (`.aab`) by default, which is intended for Play Store distribution.

If a directly installable production APK is required for device testing, use a production profile with:

```json
"android": {
  "buildType": "apk"
}
```

and build that profile through EAS.

---

# ⏰ Production Daily Reminder Configuration

The production daily reminder endpoint is:

```text
POST /internal/daily-reminder
```

The scheduled job is configured externally with:

```text
Method: POST
Timezone: Asia/Kolkata
Schedule: Daily at 21:00
Header: X-Cron-Secret
```

The cron service calls the production Render backend. The backend then:

1. Finds users who enabled daily reminders.
2. Requires a stored push token.
3. Checks whether the user has an expense for the current day.
4. Skips users who already recorded an expense.
5. Sends a push notification to eligible users.
6. Continues processing other users if an individual notification fails.

This allows the reminder to operate even when the free Render service is normally sleeping because the external scheduler invokes the endpoint.

---

# 🧪 Testing Checklist

## Authentication

- [ ] Register a new account
- [ ] Login with valid credentials
- [ ] Reject invalid credentials
- [ ] Verify login persists after app restart
- [ ] Logout
- [ ] Login with another account
- [ ] Verify users cannot access another user's data

## Transactions

- [ ] Add expense
- [ ] Add income
- [ ] View transactions
- [ ] View recent transactions
- [ ] View individual transaction
- [ ] Edit transaction
- [ ] Delete transaction
- [ ] Validate invalid transaction data

## Budget

- [ ] Configure monthly limit
- [ ] Reach 80% threshold
- [ ] Verify warning notification
- [ ] Reach 100% threshold
- [ ] Verify exceeded notification
- [ ] Verify duplicate warning alerts are prevented
- [ ] Verify duplicate exceeded alerts are prevented
- [ ] Verify alert state resets correctly for a new month
- [ ] Verify budget alerts are isolated between users

## Notifications

- [ ] Grant notification permission
- [ ] Register push token
- [ ] Verify push token is stored in MongoDB
- [ ] Verify budget warning appears in Android
- [ ] Verify budget exceeded notification appears in Android
- [ ] Verify budget notification appears in bell history
- [ ] Verify notification history survives app restart
- [ ] Verify opening the bell does not clear history
- [ ] Verify Clear removes history
- [ ] Verify different users do not share notification history
- [ ] Verify 9 AM local reminder
- [ ] Verify 9 PM backend reminder
- [ ] Verify 9 PM reminder is skipped when an expense already exists
- [ ] Verify daily reminder can be disabled
- [ ] Verify users without a push token are skipped

## Profile & Settings

- [ ] Update profile
- [ ] Change currency
- [ ] Update monthly limit
- [ ] Enable daily reminders
- [ ] Disable daily reminders
- [ ] Enable budget alerts
- [ ] Disable budget alerts

## Analytics

- [ ] Category analytics
- [ ] Monthly analytics
- [ ] Period summary
- [ ] Spending trends
- [ ] Dashboard calculations

## Multi-User

- [ ] Login as User A
- [ ] Create transactions
- [ ] Generate notifications
- [ ] Logout
- [ ] Login as User B
- [ ] Verify User A's transactions are not visible
- [ ] Verify User A's notification history is not visible
- [ ] Verify push tokens remain associated with the correct account

---

# 🧱 Design & Engineering Principles

## Separation of Concerns

```text
Handler
   ↓
Service
   ↓
Repository
```

Each layer has a defined responsibility.

## Reusable Components

Reusable UI elements are extracted into feature-specific components.

## Centralized Services

API communication and frontend business operations are centralized in service classes.

## Validation

Validation is separated from screens and backend handlers.

## Security

Authentication, password protection, secure token storage, user isolation, and protected internal endpoints are treated as core requirements.

## Error Handling

Errors are explicitly handled across:

- API
- Authentication
- Validation
- Handlers
- Services
- Repositories
- MongoDB
- Notification delivery
- Scheduled reminder processing

Individual reminder failures do not stop processing for other users.

## User Data Isolation

Authenticated user IDs are used to ensure that users only access their own:

- Transactions
- Profile information
- Settings
- Budget alert state
- Notification history

---

# 🔮 Future Improvements

Possible future improvements:

- Refresh token mechanism
- Automated unit tests
- Backend integration tests
- Frontend testing
- CI/CD pipeline
- Structured logging
- Rate limiting
- API versioning
- Pagination for large transaction histories
- Offline transaction support
- Recurring transactions
- Savings goals
- Transaction export
- Automated backups
- Monitoring and observability
- Advanced financial reports
- Notification delivery monitoring
- Push token cleanup for invalid/uninstalled devices

---

# 📌 Project Status

**Status: Active Development / Production Deployment**

Current functionality includes:

- Authentication
- JWT authorization
- Password hashing
- Persistent login
- Expense management
- Income management
- Dashboard
- Analytics
- Monthly budgets
- Budget threshold alerts
- Local notification history
- Android system notifications
- Expo push token registration
- Server-side daily expense reminders
- 9 AM local reminders
- 9 PM backend reminders
- User profiles
- User settings
- MongoDB persistence
- Cloud backend deployment
- External scheduled job
- Firebase/FCM Android configuration
- Production Android build configuration

---

# 📄 License

This project is licensed under the MIT License.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of this software, subject to the conditions of the MIT License.

See the LICENSE file for the complete license text.
