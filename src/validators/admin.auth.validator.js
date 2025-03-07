import Joi from "joi";

const createAdminValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 50 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(5).max(12).required().messages({
    "string.empty": "password is required.",
    "string.min": "password must be at least 5 characters long.",
    "string.max": "password must not exceed 12 characters.",
  }),
});

const adminLoginValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format.",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().min(5).max(12).required().messages({
      "string.empty": "password is required.",
      "string.min": "password must be at least 5 characters long.",
      "string.max": "password must not exceed 12 characters.",
    }),
  });

export { createAdminValidation ,adminLoginValidation};
