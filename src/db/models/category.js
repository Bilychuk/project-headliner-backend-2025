import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CategoriesCollection = model('categories', categorySchema);

