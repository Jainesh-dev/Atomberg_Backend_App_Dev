import { pool } from "../clients/postgresclient.js";
import { logger } from "../core/logger.js";

export async function getUsersForLockIds(lockIds) {
  if (!lockIds.length) return [];

  const query = `
    SELECT lock_id, user_id, fcm_id
    FROM lock_user_mapping
    WHERE lock_id = ANY($1)
  `;

  const { rows } = await pool.query(query, [lockIds]);

  logger.info(`Users mapped to stale locks: ${rows.length}`);

  return rows;
}
