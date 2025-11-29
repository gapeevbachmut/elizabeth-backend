import { Painting } from '../models/painting.js';
import createHttpError from 'http-errors';

//  створення картини
export const createPainting = async (req, res) => {
  const painting = await Painting.create(req.body);
  res.status(201).json(painting);
};

// видалення картини
export const deletePainting = async (req, res, next) => {
  const { paintingId } = req.params;
  const painting = await Painting.findOneAndDelete({
    _id: paintingId,
  });
  if (!painting) {
    next(createHttpError(404, 'Картина не знайдена!!!'));
    return;
  }
  res.status(200).json(painting);
};

//редагування

export const updatePainting = async (req, res, next) => {
  const { paintingId } = req.params;
  const painting = await Painting.findOneAndUpdate(
    { _id: paintingId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!painting) {
    next(createHttpError(404, 'Картина не знайдена!!!'));
    return;
  }
  res.status(200).json(painting);
};
