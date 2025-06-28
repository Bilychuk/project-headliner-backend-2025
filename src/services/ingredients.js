import { IngredientCollection } from "../db/models/ingredient.js";

export const getIngredients = async (req, res, next) => {
    const ingredients = await IngredientCollection.find();

    return ingredients;
};