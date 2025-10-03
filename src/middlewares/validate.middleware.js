import { AppError } from "../utils/appError.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details
      .map((d) => d.message.replace(/["]/g, ""))
      .join(", ");
    return next(new AppError(message, 400));
  }
  next();
};
