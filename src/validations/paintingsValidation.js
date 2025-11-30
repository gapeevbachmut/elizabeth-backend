// src/validations/paintingValidation.js

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Недійсний формат ідентифікатора.')
    : value;
};

// Схема для перевірки параметра paintingId
export const paintingIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    paintingId: Joi.string().custom(objectIdValidator).required(),
  }),
};

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

export const updatePaintingSchema = {
  [Segments.PARAMS]: Joi.object({
    paintingId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30),
    year: Joi.number().integer().min(4).max(8),
    materials: Joi.string(),
    // якщо у моделі буде enum: [] - додати valid()

    imageUrl: Joi.string(),
  }).min(1),
};

export const getPaintingsSchema = {
  [Segments.QUERY]: Joi.object({
    // search: Joi.string().trim(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    // додати параметри фільтрації за назвою, роками, матеріалами та інше
    byYear: Joi.number().positive().min(2020), //за роками
    search: Joi.string().trim().allow(''), //валідацію параметра search - для індексованого пошуку
    sortBy: Joi.string().valid('_id', 'title', 'year').default('_id'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};
