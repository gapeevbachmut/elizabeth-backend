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
export const Painting = model('Painting', paintingSchema);
