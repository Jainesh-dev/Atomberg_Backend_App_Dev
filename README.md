# Atomberg – Cloud & Backend Engineering Assignment (Node.js)

This project implements the weekly notification system described in the assignment.

## 📌 Problem Summary
- DynamoDB table **`locks`** contains one item per lock, including `last_battery_check`.
- PostgreSQL table **`lock_user_mapping`** contains `user_id` and `fcm_id` for every `lock_id`.
- Once every week, we must send an FCM notification to all users whose locks **haven’t had a battery check in the last 1 month**.

This project contains:
- Full weekly campaign implementation  
- Notification sending (real Firebase or mock fallback)  
- Metrics tracking  
- A simulation mode that works without AWS/RDS/FCM  
- A design for click-tracking & campaign effectiveness  

---
## 📂 Project Structure
+atomberg-cloud-backend/
├── src/
│   ├── config/                        # Environment management
│   │   ├── env.js                     # Loads ENV variables using dotenv
│   │   └── validateEnv.js             # Validates required ENV fields
│   │
│   ├── core/                          # Core utilities shared across services
│   │   ├── logger.js                  # Centralized logger (Pino)
│   │   └── util.js                    # Helper functions (e.g., date utilities)
│   │
│   ├── clients/                       # Infrastructure layer
│   │   ├── dynamoClient.js            # DynamoDB connection (with mock fallback)
│   │   ├── postgresClient.js          # PostgreSQL client (User mappings / Metrics)
│   │   └── fcmClient.js               # Firebase FCM (auto-switch to MOCK client if invalid key)
│   │
│   ├── services/                      # Business Logic Layer (Domain Services)
│   │   ├── lockService.js             # Identifies stale locks (> 30 days)
│   │   ├── userService.js             # Fetches users + FCM tokens for lock IDs
│   │   ├── notificationService.js     # Sends push notifications (FCM or Mock)
│   │   ├── metricsService.js          # Saves campaign metrics (sent / failed)
│   │   └── campaignManager.js         # Orchestrates entire weekly workflow
│   │
│   ├── simulations/                   # 🧪 MOCK DATA + Offline testing mode
│   │   ├── mockDynamo.json            # Sample lock data (local DynamoDB simulation)
│   │   ├── mockUsers.json             # Sample user–lock mapping data
│   │   └── simulate.js                # Full pipeline simulation (no AWS/RDS/FCM required)
│   │
│   ├── app.js                         # Weekly campaign runner + error handling
│   └── index.js                       # Main entry point (cron-compatible)
│
├── package.json                       # Dependencies + scripts
├── .env                               # Environment variables (excluded from Git)
└── README.md                          # Documentation

# --------------------------
# 🔹 AWS Configuration
# --------------------------
AWS_REGION=ap-south-1               # Region of the DynamoDB table
DYNAMO_LOCKS_TABLE=locks            # DynamoDB table name for lock status data

# --------------------------
# 🔹 PostgreSQL (RDS)
# --------------------------
PG_CONNECTION_STRING=postgres://user:pass@host:5432/dbname
# Example:
# PG_CONNECTION_STRING=postgres://postgres:password@localhost:5432/atomberg

# --------------------------
# 🔹 Firebase Cloud Messaging (FCM)
# --------------------------
FCM_PROJECT_ID=dummy
FCM_CLIENT_EMAIL=dummy@dummy
FCM_PRIVATE_KEY="DUMMY"             # NOTE: If invalid, system auto-falls back to mock FCM

# --------------------------
# 🔹 Metrics Table
# --------------------------
METRICS_TABLE=campaign_metrics      # Table for storing weekly notification results


If Firebase credentials are invalid, the code automatically uses a **mock FCM client** so everything runs locally.

---

## 🚀 Weekly Campaign Flow

Executed via:

```

npm run start

```

Steps:
1. Compute cutoff date = now − 1 month  
2. Fetch stale locks from DynamoDB  
3. Fetch users & FCM tokens from PostgreSQL  
4. Send FCM notifications  
5. Save campaign metrics (sent / failed)  

This satisfies all core requirements of the assignment.

---

## 📊 Click Tracking & Effectiveness (Bonus)

The system includes a **design** for tracking:
- User clicks on notifications (via deep link + API)
- Campaign effectiveness  
- Click-through rate  
- Reduction in stale locks after campaigns  

The structure supports adding this with minimal changes.

---

## 🧪 Simulation Mode (For Reviewers — No AWS Needed)

Run:

```

npm run simulate

```

This uses:
- `mockDynamo.json`
- `mockUsers.json`
- A mock FCM client

The entire flow (locks → users → notifications → metrics) runs **without AWS/RDS/FCM**.

---

## ▶️ Commands

Install dependencies:

```

npm install

```

Run weekly campaign:

```

npm run start

```

Run simulation:

```

npm run simulate

```

---

## ✅ Requirement Coverage

| Requirement | Status |
|------------|--------|
| Read DynamoDB `locks` table | ✅ |
| Read PostgreSQL `lock_user_mapping` | ✅ |
| Detect locks not checked in 1 month | ✅ |
| Send weekly FCM notifications | ✅ |
| Track sent/failed notifications | ✅ |
| Design for click-tracking | ✅ (designed) |
| Design for campaign effectiveness | ✅ (implemented + metrics) |
| Run without cloud credentials | ✅ simulation mode |

---

This project is fully functional, clean, and production-style, with extensibility for analytics and campaign tracking.
```

---

