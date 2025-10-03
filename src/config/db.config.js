import mongoose from "mongoose";
import { logger } from "./logger.config.js";
import { config } from "./app.config.js";

export const dbConnect = async () => {
  try {
    mongoose.connection.on("connected", () => {
      logger.info("Connected to database successfully.");
    });
    mongoose.connection.on("error", (err) => {
      logger.error("Error in connecting database.", err);
    });
    await mongoose.connect(config.get("databaseUrl"));
  } catch (error) {
    logger.error("Failed to connecting to database", error);
    process.exit(1);
  }
};
