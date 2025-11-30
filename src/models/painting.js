import { model, Schema } from 'mongoose';

const paintingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: false, trim: true },
    materials: {
      type: String,
      required: true,
      // enum: []
    },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Додаємо текстовий індекс: кажемо MongoDB,
// що по полю title можна робити $text

paintingSchema.index(
  { title: 'text' },
  {
    name: 'PaintingTextIndex',
    weights: { title: 10 },
    default_language: 'english',
  },
);

export const Painting = model('Painting', paintingSchema);
