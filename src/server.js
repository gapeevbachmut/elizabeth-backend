import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import paintingRoutes from './routes/paintingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json()); // Middleware для парсингу JSON
app.use(cors()); // Дозволяє запити з будь-яких джерел

// перша сторінка
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

// Маршрути
app.use(paintingRoutes);
app.use(adminRoutes);

app.use(notFoundHandler); // 404 — якщо маршрут не знайдено (після всіх маршрутів)
app.use(errors()); // обробка помилок від celebrate (валідація)
app.use(errorHandler); // Middleware для глобальної обробки помилок

// DB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});
