import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { UserModel } from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

export const isAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new AppError("You are not logged in!", 401);
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  const user = await UserModel.findById(decoded.id);
  if (!user) throw new AppError("User no longer exists.", 401);
  req.user = user;
  next();
});
