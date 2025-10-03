import jwt from "jsonwebtoken";
import { config } from "../config/app.config.js";
import { AppError } from "./appError.js";

export const genearteToken = (payload, expiresIn) => {
  return jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: expiresIn || config.get("jwtExpiresIn") || "7d",
  });
};
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.get("jwtSecret"));
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("Token expired. Please log in again.", 401);
    }
    throw new AppError("Invalid token. Please log in again.", 401);
  }
};
