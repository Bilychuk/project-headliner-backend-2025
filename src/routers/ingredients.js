import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getIngredientsController } from "../controllers/ingredients.js";
import { Router } from "express";

const router = Router();

router.get("/", ctrlWrapper(getIngredientsController));

export default router;