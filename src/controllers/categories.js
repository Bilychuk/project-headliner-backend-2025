import { getCategories } from "../services/categories.js";

export const getCategoriesController = async (req, res) => {
    const categories = await getCategories();

    res.json({
        status: 200,
        message: "Successfully found categories",
        data: categories,
    });

};