// src/config/validateEnv.js

export function validateEnv(env) {
  const required = [
    "AWS_REGION",
    "DYNAMO_LOCKS_TABLE",
    "PG_CONNECTION_STRING",
    "FCM_PROJECT_ID",
    "FCM_CLIENT_EMAIL",
    "FCM_PRIVATE_KEY"
  ];

  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  console.log("✓ Environment variables validated");
}
