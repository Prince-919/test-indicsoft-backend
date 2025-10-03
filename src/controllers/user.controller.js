import { UserModel } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { comparePassword, hashedPassword } from "../utils/bcrypt.js";
import { genearteToken } from "../utils/jwt.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    return next(new AppError(`User with email ${email} already exists`, 409));
  }
  const hashed_password = await hashedPassword(password);
  const newUser = new UserModel({ name, email, password: hashed_password });
  await newUser.save();
  res.status(201).json({ message: "User registered.", data: newUser });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new AppError(`Invalid credentials`, 400));
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return next(new AppError(`Invalid credentials`, 400));
  }
  const token = genearteToken({ id: user._id, email: user.email });

  res.status(200).json({ message: "User logged in.", token });
});

export const myProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { password, ...userData } = user.toObject();
  res.status(200).json({
    status: "success",
    data: userData,
  });
});
export const updateProfile = asyncHandler(async (req, res, next) => {
  const updates = { ...req.body };
  delete updates.password;
  delete updates._id;
  delete updates.email;
  const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, updates, {
    new: true,
  });
  const { password, ...userData } = updatedUser.toObject();
  res.status(200).json({
    status: "success",
    message: "Profile updated successfully.",
    data: userData,
  });
});
