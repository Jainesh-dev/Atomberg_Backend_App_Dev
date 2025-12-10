# Atomberg – Cloud & Backend Engineering Assignment

This Node.js project implements the weekly notification system described in the assignment.

## 📌 Overview
- DynamoDB table **`locks`** stores each lock and its `last_battery_check` timestamp.
- PostgreSQL table **`lock_user_mapping`** stores `user_id` and `fcm_id` for every lock.
- Once a week, the script sends an FCM notification to all users whose locks have **not been checked in the last 1 month**.

The solution includes:
- Complete weekly campaign pipeline  
- Notification sending (real Firebase or mock fallback)  
- Campaign metrics logging  
- Simulation mode (runs without AWS/RDS/FCM)  
- Click-tracking & effectiveness measurement design  

---

## 📁 Project Structure
```

src/
config/          # env + validation
core/            # logger + utils
clients/         # DynamoDB, Postgres, Firebase (or mock)
services/        # locks, users, notifications, metrics
simulations/     # mock data + simulate.js
app.js           # campaign runner
index.js         # cron entry

```

---

## ⚙️ Environment Variables
Create `.env`:

```

AWS_REGION=ap-south-1
DYNAMO_LOCKS_TABLE=locks
PG_CONNECTION_STRING=postgres://user:pass@host/db
FCM_PROJECT_ID=dummy
FCM_CLIENT_EMAIL=dummy@dummy
FCM_PRIVATE_KEY="DUMMY"
METRICS_TABLE=campaign_metrics

```

If Firebase credentials are invalid, a **mock FCM client** is automatically used.

---

## 🚀 Weekly Campaign Flow
Triggered via:

```

npm run start

```

Steps:
1. Identify stale locks (battery check older than 1 month)  
2. Fetch corresponding users & FCM tokens  
3. Send FCM notifications  
4. Log campaign metrics  

---

## 🧪 Simulation Mode (No AWS/DB Required)
```

npm run simulate

```

Uses mock data for:
- Locks
- User mappings
- Notifications

Allows reviewers to test everything locally.

---

## 📊 Bonus: Click Tracking & Effectiveness
Design included for:
- Notification click logging via API  
- CTR calculation  
- Comparing stale-lock count before vs after campaigns  

---

## ▶️ Commands
```

npm install
npm run start     # weekly campaign
npm run simulate  # mock simulation

```

---

## ✅ Requirement Coverage
- Detect stale locks → ✔️  
- Fetch users & fcm_ids → ✔️  
- Send weekly FCM notifications → ✔️  
- Track sent/failed → ✔️  
- Click tracking & effectiveness → ✔️ (design included)  
- No-cloud simulation → ✔️  

---

This solution is clean, modular, and production-style, with full support for testing and future extension.
```

---

If you want a **README with a diagram** or **a very minimal 10-line version**, just tell me!
