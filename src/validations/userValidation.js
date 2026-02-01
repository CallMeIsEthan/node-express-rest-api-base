import Joi from 'joi'

import USER_ROLES from '../constants/roles.js'

export const createUserSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'any.required': 'validation:any.required',
    'string.empty': 'validation:string.empty',
  }),
  email: Joi.string().email().required().lowercase().trim().messages({
    'any.required': 'validation:any.required',
    'string.email': 'validation:email',
    'string.empty': 'validation:string.empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'validation:any.required',
    'string.empty': 'validation:string.empty',
    'string.min': 'validation:string.min',
  }),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .default(USER_ROLES.USER)
    .messages({
      'any.only': 'validation:role.invalid',
    }),
})

export const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'string.empty': 'auth:login.failed',
    'any.required': 'auth:login.failed',
    'string.email': 'auth:login.failed',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'auth:login.failed',
    'any.required': 'auth:login.failed',
  }),
})

export const addressSchema = Joi.object({
  receiverName: Joi.string().required(),
  receiverPhone: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  isDefault: Joi.boolean().default(false),
})
