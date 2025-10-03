import "dotenv/config";
import { logger } from "./logger.config.js";

const _config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  apiVersion: process.env.API_VERSION,
  frontendUrl: process.env.FRONTEND_URL,
  databaseUrl: process.env.MONGODB_CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRESIN,
};

export const config = {
  get(key) {
    const value = _config[key];
    if (!value) {
      logger.warn(
        `The config "${key}" not found. Make sure to set the environment variable.`
      );
    }
    return value;
  },
};
