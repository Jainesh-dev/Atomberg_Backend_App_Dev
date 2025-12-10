// src/services/lockService.js
import { docClient } from "../clients/dynamoclient.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { config } from "../config/env.js";
import { logger } from "../core/logger.js";

export async function getStaleLocks(cutoffDate) {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: config.DYNAMO_LOCKS_TABLE
      })
    );

    const items = result.Items || [];

    const stale = items.filter((lock) => {
      if (!lock.last_battery_check) return true;
      return new Date(lock.last_battery_check) < cutoffDate;
    });

    logger.info(`Stale locks found: ${stale.length}`);
    return stale;
  } catch (err) {
    // SILENTLY FALLBACK → no warnings shown
    return [];
  }
}
