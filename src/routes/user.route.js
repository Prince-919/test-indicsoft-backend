import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../utils/validation.js";
import {
  login,
  myProfile,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", isAuth, myProfile);
router.put("/update-profile", isAuth, updateProfile);

export default router;
