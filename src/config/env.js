import "dotenv/config";

export const config = {
  AWS_REGION: process.env.AWS_REGION,
  DYNAMO_LOCKS_TABLE: process.env.DYNAMO_LOCKS_TABLE,

  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,

  FCM_PROJECT_ID: process.env.FCM_PROJECT_ID,
  FCM_CLIENT_EMAIL: process.env.FCM_CLIENT_EMAIL,
  // replace escaped newlines so private key works from .env
  FCM_PRIVATE_KEY: process.env.FCM_PRIVATE_KEY?.replace(/\\n/g, "\n"),

  METRICS_TABLE: process.env.METRICS_TABLE || "campaign_metrics"
};
