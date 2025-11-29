// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json()); // Middleware для парсингу JSON
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// Маршрут
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.get('/gallery-paintings', (req, res) => {
  res.status(200).json({
    message: 'Отримано всі зображення картин.',
  });
});

app.get('/gallery-paintings/:paintingId', (req, res) => {
  const { paintingId } = req.params;
  res.status(200).json({
    message: `Отримано зображення картини - ${paintingId}`,
  });
});

// app.post('/painting', (req, res) => {
//   console.log(req.body); // тепер тіло доступне як JS-об`єкт
//   res.status(201).json({ message: 'Картина додана!' });
// });

// Маршрут для тестування middleware помилки
app.get('/test-error', (req, res) => {
  // Штучна помилка для прикладу
  throw new Error('Ви зробили помилку!!!');
});

// Middleware 404 (після всіх маршрутів)

app.use((req, res) => {
  res.status(404).json({ message: 'Сторінку не знайдено' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Щось пішло не так. Спробуйте ще раз пізніше.'
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});
