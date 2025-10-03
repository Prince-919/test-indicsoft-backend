export const handleJWTError = (err) => {
  if (err.name === "JsonWebTokenError") {
    return new AppError("Invalid token. Please log in again!", 401);
  }
  if (err.name === "TokenExpiredError") {
    return new AppError("Your token has expired! Please log in again.", 401);
  }
  return err;
};
