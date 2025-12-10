// src/services/notificationService.js
import { fcm } from "../clients/fcmClient.js";
import { logger } from "../core/logger.js";

export async function sendNotifications(tokens, payload) {
  if (!tokens.length)
    return { successCount: 0, failureCount: 0 };

  const message = {
    notification: {
      title: "Battery Check Reminder",
      body: "Your lock battery hasn't been checked recently. Please check now."
    },
    data: payload,
    tokens
  };

  const response = await fcm.sendEachForMulticast(message);

  logger.info(
    `Notification status → success: ${response.successCount}, failed: ${response.failureCount}`
  );

  return response;
}
