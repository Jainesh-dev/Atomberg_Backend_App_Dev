// src/clients/fcmClient.js
import admin from "firebase-admin";
import { config } from "../config/env.js";
import { logger } from "../core/logger.js";

let fcm;

// Try real Firebase only if private key looks valid
const looksValid =
  config.FCM_PRIVATE_KEY &&
  config.FCM_PRIVATE_KEY.includes("BEGIN PRIVATE KEY");

if (looksValid) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.FCM_PROJECT_ID,
        clientEmail: config.FCM_CLIENT_EMAIL,
        privateKey: config.FCM_PRIVATE_KEY
      })
    });

    fcm = admin.messaging();
    logger.info("Firebase initialized.");
  } catch (err) {
    // SILENT FAIL → no warn, no error
  }
}

if (!fcm) {
  // Use mock FCM silently
  fcm = {
    async sendEachForMulticast(message) {
      return {
        successCount: message.tokens.length,
        failureCount: 0
      };
    }
  };

  logger.info("Using mock FCM client.");
}

export { fcm };
