// src/validations/studentsValidation.js

import { Joi, Segments } from 'celebrate';

export const createPaintingSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Назва картини має бути рядком.',
      'string.min':
        'Назва карттини повинна містити щонайменше {#limit} символів.',
      'string.max':
        'Назва картини повинна містити не більше {#limit} символів.',
      'any.required': "Назва картини повинна бути обов'язково",
    }),
    year: Joi.number().integer().min(4).max(8).required().messages({
      'number.base': 'Рік повинен бути числом',
      'number.min': 'Рік має містити щонайменше {#limit} цифри',
      'number.max': 'Рік має містити не більше {#limit} цифри',
      'any.required': "Рік повинен бути обов'язково",
    }),
    materials: Joi.string().required().messages({
      'string.base': 'Назва матеріалу має бути рядком.',
      'any.required': "Назва матеріалу повинна бути обов'язково",
    }),
    // materials: Joi.string().valid('male', 'female', 'other').required(),
    // якщо у моделі буде enum: [] - додати valid()
    imageUrl: Joi.string().required(false),
  }),
};
