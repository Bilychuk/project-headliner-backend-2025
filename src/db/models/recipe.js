import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    area: {
      type: String,
    },
    calories: {
      type:Number,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        id: {
          type: String,
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

recipesSchema.post('save', mongooseSaveError);
recipesSchema.pre('findOneAndUpdate', setUpdateSettings);
recipesSchema.post('findOneAndUpdate', mongooseSaveError);

export const RecipesCollection = model('recipe', recipesSchema);
