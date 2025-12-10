// src/index.js
import { config } from "./config/env.js";
import { validateEnv } from "./config/validateEnv.js";
import { startApp } from "./app.js";
import { logger } from "./core/logger.js";

(async () => {
  try {
    validateEnv(config);
    await startApp();
    logger.info("All done. Exiting.");
    process.exit(0);
  } catch (err) {
    logger.error({ err }, "Fatal error in weekly campaign.");
    process.exit(1);
  }
})();
