const Joi = require('joi');

const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'Name should be a type of string',
    'string.min': 'Name should have at least 3 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of string',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password should be a type of string',
    'string.min': 'Password should have at least 6 characters',
    'any.required': 'Password is required'
  }),
});

module.exports = { registerValidationSchema };
