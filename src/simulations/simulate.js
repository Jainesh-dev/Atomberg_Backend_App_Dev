// src/simulations/simulate.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { sendNotifications } from "../services/notificationService.js";
import { logger } from "../core/logger.js";

// Resolve current directory (ESM-safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJson(relativePath) {
  const fullPath = path.join(__dirname, relativePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

async function runSimulation() {
  logger.info("=== Running simulation mode (no AWS/RDS required) ===");

  // Load mock data
  const locks = loadJson("./mockDynamo.json");
  const users = loadJson("./mockUsers.json");

  // Pick only locks that are stale by logic: last_battery_check before 1 month or null
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const staleLockIds = locks
    .filter((lock) => {
      if (!lock.last_battery_check) return true;
      return new Date(lock.last_battery_check) < oneMonthAgo;
    })
    .map((l) => l.lock_id);

  logger.info({ staleLockIds }, "Stale locks from mock data");

  // Pick users mapped to those stale locks
  const targetUsers = users.filter((u) => staleLockIds.includes(u.lock_id));
  const tokens = targetUsers.map((u) => u.fcm_id);

  logger.info(
    { userCount: targetUsers.length, tokenCount: tokens.length },
    "Users selected for simulation"
  );

  if (!tokens.length) {
    logger.warn("No tokens found in simulation. Exiting.");
    return;
  }

  const payload = {
    campaign: "battery_check_simulation",
    run_date: new Date().toISOString()
  };

  const res = await sendNotifications(tokens, payload);

  logger.info(
    {
      success: res.successCount,
      failure: res.failureCount
    },
    "Simulation notification result"
  );

  logger.info("=== Simulation complete ===");
}

runSimulation().catch((err) => {
  logger.error({ err }, "Simulation failed");
  process.exit(1);
});
