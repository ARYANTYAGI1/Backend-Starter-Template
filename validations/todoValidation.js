const Joi = require('joi');

const addTodoValidationSchema = Joi.object({
  todoName: Joi.string().min(3).required().messages({
    'string.base': 'Todo Name should be a type of string',
    'string.min': 'Todo Name should have at least 3 characters',
    'any.required': 'Todo Name is required'
  }),
  todoDesc: Joi.string().min(3).required().messages({
    'string.base': 'Todo Description should be a type of string',
    'string.min': 'Todo Description should have at least 3 characters',
    'any.required': 'Todo Description is required'
  }),
  status: Joi.string().optional(),
  priority: Joi.string().optional(),
  deadlineDate: Joi.string().optional()
  
});

const updateTodoValidationSchema = Joi.object({
  todoName: Joi.string().min(3).optional().messages({
    'string.base': 'Todo Name should be a type of string',
    'string.min': 'Todo Name should have at least 3 characters',
  }),
  todoDesc: Joi.string().min(3).optional().messages({
    'string.base': 'Todo Description should be a type of string',
    'string.min': 'Todo Description should have at least 3 characters',
  }),
  status: Joi.string().optional(),
  priority: Joi.string().optional(),
  deadlineDate: Joi.string().optional()
});

module.exports = { addTodoValidationSchema, updateTodoValidationSchema };
