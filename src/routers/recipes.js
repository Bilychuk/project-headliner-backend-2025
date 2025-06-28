import express from 'express';
import { createRecipeController } from '../controllers/recipes.js';
import { createRecipeSchema } from '../validation/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
//import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/',
  jsonParser,
  upload.single('thumb'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

export default router;
