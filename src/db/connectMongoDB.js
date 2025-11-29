// src/db/connectMongoDB.js
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    // console.log('✅ MongoDB connection established successfully');
    console.log('✅ З`єднання з MongoDB успішно встановлено');
  } catch (error) {
    // console.error('❌ Failed to connect to MongoDB:', error.message);
    console.error('❌ Не вдалося підключитися до MongoDB:', error.message);

    process.exit(1); // аварійне завершення програми
  }
};
