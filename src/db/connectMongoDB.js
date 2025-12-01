// src/db/connectMongoDB.js
import mongoose from 'mongoose';
import { Painting } from '../models/painting.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    // console.log('✅ MongoDB connection established successfully');
    console.log('✅ З`єднання з MongoDB успішно встановлено');

    //Синхронізація індексів
    //гарантуємо, що індекси в БД відповідають схемі
    await Painting.syncIndexes();
    // console.log('Індекси успішно синхронізовано');

    //
  } catch (error) {
    // console.error('❌ Failed to connect to MongoDB:', error.message);
    console.error('❌ Не вдалося підключитися до MongoDB:', error.message);

    process.exit(1); // аварійне завершення програми
  }
};
