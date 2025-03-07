import Joi from "joi";

const createClientValidation = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    "string.empty": "username is required.",
    "string.min": "username must be at least 3 characters long.",
    "string.max": "username must not exceed 20 characters.",
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
  companyName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "companyName is required.",
    "string.min": "companyName must be at least 3 characters long.",
    "string.max": "companyName must not exceed 50 characters.",
  }),
  mobile: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/) // E.164 format
    .required()
    .messages({
      "string.pattern.base":
        "Mobile number must be a valid international number in E.164 format (e.g., +1234567890).",
      "string.empty": "Mobile number is required.",
    }),
  clientType: Joi.string().min(3).max(20).required().messages({
    "string.empty": "client type is required.",
    "string.min": "client type must be at least 3 characters long.",
    "string.max": "client type must not exceed 20 characters.",
  }),
});
 
const updateClientValidation = Joi.object({
    username: Joi.string().min(3).max(20).required().messages({
      "string.empty": "username is required.",
      "string.min": "username must be at least 3 characters long.",
      "string.max": "username must not exceed 20 characters.",
    }),
     
    companyName: Joi.string().min(3).max(50).required().messages({
      "string.empty": "companyName is required.",
      "string.min": "companyName must be at least 3 characters long.",
      "string.max": "companyName must not exceed 50 characters.",
    }),
    mobile: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/) // E.164 format
      .required()
      .messages({
        "string.pattern.base":
          "Mobile number must be a valid international number in E.164 format (e.g., +1234567890).",
        "string.empty": "Mobile number is required.",
      }),
    clientType: Joi.string().min(3).max(20).required().messages({
      "string.empty": "client type is required.",
      "string.min": "client type must be at least 3 characters long.",
      "string.max": "client type must not exceed 20 characters.",
    }),

  });
 
const clientLoginValidation = Joi.object({
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
 

export { createClientValidation,updateClientValidation,clientLoginValidation};
