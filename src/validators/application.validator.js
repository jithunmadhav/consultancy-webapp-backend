import Joi from "joi";

const validateApplicationData = Joi.object({
  jobId: Joi.number().required().messages({
    "number.base": "Job ID must be a number.",
    "any.required": "Job ID is required.",
  }),
  clientId: Joi.number().required().messages({
    "number.base": "Client ID must be a number.",
    "any.required": "Client ID is required.",
  }),
  candiateId: Joi.number().required().messages({
    "number.base": "candiadate ID must be a number.",
    "any.required": "candiadate ID is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  mobile: Joi.string().pattern(/^\d{10}$/).required().messages({
    "string.pattern.base": "Mobile number must be a valid 10-digit number.",
    "any.required": "Mobile number is required.",
  }),
  resume: Joi.string().uri().required().messages({
    "string.uri": "Resume must be a valid URL.",
    "any.required": "Resume URL is required.",
  }),
  firstName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "First name is required.",
    "string.min": "First name must be at least 1 character.",
    "string.max": "First name must not exceed 50 characters.",
  }),
  lastName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Last name is required.",
    "string.min": "Last name must be at least 1 character.",
    "string.max": "Last name must not exceed 50 characters.",
  }),
  zipCode: Joi.string().pattern(/^\d{5,10}$/).required().messages({
    "string.pattern.base": "Zip code must be between 5 to 10 digits.",
    "string.empty": "zipCode is required.",
  }),
  address: Joi.string().max(255).required().messages({
    "string.max": "Address must not exceed 255 characters.",
    "string.empty": "Address is required.",
  }),
  fullAddress: Joi.string().max(1000).optional().messages({
    "string.max": "Full address must not exceed 1000 characters.",
  }),
  dob: Joi.date().optional().messages({
    "date.base": "Date of birth must be a valid date.",
  }),
  gender: Joi.string().valid("Male", "Female", "Other").optional().messages({
    "any.only": "Gender must be 'Male', 'Female', or 'Other'.",
  }),
  passportNo: Joi.string().alphanum().max(15).optional().messages({
    "string.max": "Passport number must not exceed 15 characters.",
  }),
  totalExperience: Joi.string().max(50).optional().messages({
    "string.max": "Total experience must not exceed 50 characters.",
  }),
  relevantExperience: Joi.string().max(50).optional().messages({
    "string.max": "Relevant experience must not exceed 50 characters.",
  }),
  currentCompany: Joi.string().max(100).optional().messages({
    "string.max": "Current company name must not exceed 100 characters.",
  }),
  noticePeriod: Joi.string().max(50).optional().messages({
    "string.max": "Notice period must not exceed 50 characters.",
  }),
  reasonForLeaving: Joi.string().max(1000).optional().messages({
    "string.max": "Reason for leaving must not exceed 1000 characters.",
  }),
  currentSalary: Joi.string().max(50).optional().messages({
    "string.max": "Current salary must not exceed 50 characters.",
  }),
  expectedSalary: Joi.string().max(50).optional().messages({
    "string.max": "Expected salary must not exceed 50 characters.",
  }),
  coverNote: Joi.string().max(2000).optional().messages({
    "string.max": "Cover note must not exceed 2000 characters.",
  }),
   
  
   
});

export { validateApplicationData };
