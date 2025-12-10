import { runBatteryCampaign } from "./services/campaignManager.js";
import { logger } from "./core/logger.js";

export async function startApp() {
  try {
    logger.info("Starting Atomberg battery reminder service...");
    await runBatteryCampaign();
    logger.info("Service finished successfully.");
  } catch (err) {
    logger.error({ err }, "Service failed.");
    throw err;
  }
}
