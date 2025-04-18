import Joi from "joi";

export const getProfileValidation = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
});

export const updateProfileValidation = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.empty": "Name is required",
    "string.min": "Name should be at least 3 characters",
    "string.max": "Name should not exceed 50 characters",
  }),
  bio: Joi.string().max(500).allow("").messages({
    "string.max": "Bio should not exceed 500 characters",
  }),
  headline: Joi.string().max(100).allow("").messages({
    "string.max": "Headline should not exceed 100 characters",
  }),
  photo: Joi.string().uri().allow("").messages({
    "string.uri": "Photo must be a valid URL",
  }),
  interests: Joi.string().max(100).allow("").messages({
    "string.max": "Interests should not exceed 100 characters",
  }),
});

export const deleteProfileValidation = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
});
