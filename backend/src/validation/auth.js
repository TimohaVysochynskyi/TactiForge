import Joi from 'joi';

export const registerCustomerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginCustomerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
