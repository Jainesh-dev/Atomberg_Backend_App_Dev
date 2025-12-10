import pkg from "pg";
const { Pool } = pkg;

import { config } from "../config/env.js";

export const pool = new Pool({
  connectionString: config.PG_CONNECTION_STRING
});
