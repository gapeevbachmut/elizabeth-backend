import { Painting } from '../models/painting.js';
import createHttpError from 'http-errors';

export const getPaintings = async (req, res) => {
  const paintings = await Painting.find();
  res.status(200).json(paintings);
};

export const getPaintingId = async (req, res, next) => {
  const { paintingId } = req.params;
  const painting = await Painting.findById(paintingId);
  if (!painting) {
    next(createHttpError(404, 'Картина не знайдена!!!'));
    return;
  }
  res.status(200).json(painting);
};
