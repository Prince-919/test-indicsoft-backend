import express from "express";
import cors from "cors";
import { logger } from "./config/logger.config.js";
import { config } from "./config/app.config.js";
import { dbConnect } from "./config/db.config.js";
import { globalErrorHandler } from "./middlewares/error.middlware.js";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(cors({ origin: [config.get("frontendUrl")], credentials: true }));
app.use(express.json());

const API_VERSION = config.get("apiVersion");

app.use(`/api/${API_VERSION}/auth`, userRoutes);

app.use(globalErrorHandler);

const startServer = async () => {
  try {
    await dbConnect();
    const port = config.get("port") || 5000;
    app.listen(port, () => {
      logger.info(
        `Server is running on port ${port} on mode ${config.get("nodeEnv")}.`
      );
    });
  } catch (error) {
    logger.error(`Failed to starting server. ${error}`);
  }
};
startServer();
