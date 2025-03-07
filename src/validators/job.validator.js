import Joi from "joi";

const createJobValidation = Joi.object({
  clientId: Joi.number().required().messages({
    "any.required": "Client ID is required.",
  }),
  jobTitle: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Job title is required.",
    "string.min": "Job title must be at least 3 characters long.",
    "string.max": "Job title must not exceed 100 characters.",
  }),
  jobDescription: Joi.string().min(10).max(1000).required().messages({
    "string.empty": "Job description is required.",
    "string.min": "Job description must be at least 10 characters long.",
    "string.max": "Job description must not exceed 1000 characters.",
  }),
  jobType: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Job type is required.",
    "string.min": "Job type must be at least 3 characters long.",
    "string.max": "Job type must not exceed 50 characters.",
  }),
  jobCategory: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Job category is required.",
    "string.min": "Job category must be at least 3 characters long.",
    "string.max": "Job category must not exceed 50 characters.",
  }),
  jobLocation: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Job location is required.",
    "string.min": "Job location must be at least 3 characters long.",
    "string.max": "Job location must not exceed 100 characters.",
  }),
  experience: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Experience is required.",
    "string.min": "Experience must be at least 3 characters long.",
    "string.max": "Experience must not exceed 50 characters.",
  }),
  qualifications: Joi.array()
    .items(Joi.string().min(3).max(100))
    .required()
    .messages({
      "array.base": "Qualifications must be an array of strings.",
      "any.required": "Qualifications are required.",
    }),
  minSalary: Joi.number().min(0).required().messages({
    "number.base": "Minimum salary must be a valid number.",
    "any.required": "Minimum salary is required.",
  }),
  maxSalary: Joi.number()
    .min(Joi.ref("minSalary"))
    .required()
    .messages({
      "number.base": "Maximum salary must be a valid number.",
      "number.min": "Maximum salary must be greater than or equal to the minimum salary.",
      "any.required": "Maximum salary is required.",
    }),
  currency: Joi.string().length(3).default("INR").messages({
    "string.length": "Currency must be a 3-character code (e.g., INR).",
  }),
  postingDate: Joi.date().default(() => new Date()).messages({
    "date.base": "Posting date must be a valid date.",
  }),
  expiryDate: Joi.date().min("now").required().messages({
    "date.base": "Expiry date must be a valid date.",
    "date.min": "Expiry date must be in the future.",
  }),
  languagesRequired: Joi.array()
    .items(Joi.string().min(2).max(50))
    .messages({
      "array.base": "Languages required must be an array of strings.",
    }),
  skillsRequired: Joi.array()
    .items(Joi.string().min(2).max(50))
    .messages({
      "array.base": "Skills required must be an array of strings.",
    }),
  NoOfOpenings: Joi.number().integer().min(1).required().messages({
    "number.base": "Number of openings must be a valid integer.",
    "number.min": "Number of openings must be at least 1.",
    "any.required": "Number of openings is required.",
  }),
  isRemote: Joi.string().valid("YES", "NO").default("NO").messages({
    "any.only": "isRemote must be either 'YES' or 'NO'.",
  }),
});

export { createJobValidation };
