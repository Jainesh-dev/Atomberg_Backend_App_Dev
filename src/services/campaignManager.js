import { getStaleLocks } from "./lockService.js";
import { getUsersForLockIds } from "./userService.js";
import { sendNotifications } from "./notificationService.js";
import { saveMetrics } from "./metricsService.js";
import { logger } from "../core/logger.js";
import { getOneMonthAgo } from "../core/util.js";

export async function runBatteryCampaign() {
  logger.info("=== Running Battery Reminder Campaign ===");

  const cutoff = getOneMonthAgo();

  // Step 1: Get stale locks
  const staleLocks = await getStaleLocks(cutoff);
  if (staleLocks.length === 0) {
    logger.info("No stale locks found. Exiting campaign.");
    return;
  }

  // Step 2: Extract lock IDs
  const lockIds = staleLocks.map((l) => l.lock_id);

  // Step 3: Get user mappings
  const users = await getUsersForLockIds(lockIds);
  const tokens = users.map((u) => u.fcm_id).filter(Boolean);

  if (tokens.length === 0) {
    logger.warn("No FCM tokens found for stale locks.");
    return;
  }

  // Step 4: Send notifications
  const payload = {
    campaign: "battery_check",
    run_date: new Date().toISOString()
  };

  const response = await sendNotifications(tokens, payload);

  // Step 5: Save metrics
  await saveMetrics({
    campaign: "battery_check",
    sent: response.successCount,
    failed: response.failureCount
  });

  logger.info("=== Battery Reminder Campaign Complete ===");
}
