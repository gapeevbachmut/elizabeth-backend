// src/validations/authValidation.js

import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    // phone: Joi.string().required(),
    // username: Joi.string().max(32).allow('', null),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(28).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
