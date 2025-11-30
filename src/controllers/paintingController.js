import { Painting } from '../models/painting.js';
import createHttpError from 'http-errors';

export const getPaintings = async (req, res) => {
  // Отримуємо параметри пагінації
  const {
    page = 1,
    perPage = 10,
    byYear,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const skip = (page - 1) * perPage;

  // Створюємо базовий запит до колекції
  const paintingsQuery = Painting.find();

  //----------------ПОШУК-----------------//
  // Текстовий пошук по title (працює лише якщо створено текстовий індекс)
  if (search) {
    paintingsQuery.where({ $text: { $search: search } }); // пошук по текстовому індексу - ціле слово
  }

  // //Пошук через $regex - частина слова - на великих колекціях буде повільно.
  // if (search) {
  //   paintingsQuery.where({ title: { $regex: search, $options: 'i' } });
  // }

  //----------------ФІЛЬТРАЦІЯ-----------------//

  // Будуємо фільтр, все додати як отримані параметри req.query
  if (byYear) {
    paintingsQuery.where('year').equals(byYear); //  за роками
  }
  // if () { }
  // if () { }   //  ......

  //----------------ПАГІНАЦІЯ + СОРТУВАННЯ-----------------//
  // Виконуємо одразу два запити паралельно
  const [totalItems, paintings] = await Promise.all([
    paintingsQuery.clone().countDocuments(),
    paintingsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  // Обчислюємо загальну кількість «сторінок»
  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, paintings });
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
