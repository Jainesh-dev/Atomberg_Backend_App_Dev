import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { config } from "../config/env.js";

export const dynamo = new DynamoDBClient({ region: config.AWS_REGION });
export const docClient = DynamoDBDocumentClient.from(dynamo);
