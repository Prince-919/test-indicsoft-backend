import { handleJWTError } from "../utils/jwtErrorHandler.js";

export const globalErrorHandler = (err, req, res, next) => {
  err = handleJWTError(err);
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    status,
    message,
  });
};
