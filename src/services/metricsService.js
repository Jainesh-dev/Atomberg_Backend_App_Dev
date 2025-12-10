import { pool } from "../clients/postgresclient.js";
import { config } from "../config/env.js";

export async function saveMetrics({ campaign, sent, failed }) {
  const query = `
    INSERT INTO ${config.METRICS_TABLE}
    (campaign, sent, failed, created_at)
    VALUES ($1, $2, $3, NOW())
  `;
  await pool.query(query, [campaign, sent, failed]);
  logger.info("Campaign metrics saved.");
}
