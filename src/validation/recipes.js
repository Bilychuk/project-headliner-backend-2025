import Joi from 'joi';

export const createRecipeSchema = Joi.object({
  title: Joi.string().max(64).required(),
  description: Joi.string().max(200).required(),
  time: Joi.string().min(1).max(360).required(),
  category: Joi.string().required(),
  area: Joi.string().max(100).optional(),
  instructions: Joi.string().max(1200).required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        measure: Joi.string().min(1).max(16).required(),
      }),
    )
    .min(1)
    .required(),
});
