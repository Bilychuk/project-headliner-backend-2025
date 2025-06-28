import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(128).required().messages({
    'string.max': '"email" should be at most {#limit} characters long',
    'string.email': '"email" must be a valid email address',
    'string.empty': '"email" is required',
  }),
  password: Joi.string().min(8).max(128).required().messages({
    'string.empty': '"password" is required',
    'string.min': '"password" should be at least {#limit} characters long',
    'string.max': '"password" should be at most {#limit} characters long',
  }),
});