import { getIngredients } from "../services/ingredients.js";

export const getIngredientsController = async (req, res) => {
    const ingredients = await getIngredients();

    res.json({
        status: 200,
        message: "Successfully found ingredients",
        data: ingredients,
    });
};