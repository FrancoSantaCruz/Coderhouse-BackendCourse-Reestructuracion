import { Router } from "express";
import { findProducts, findProductById, newProduct, deleteProduct } from '../controllers/products.controller.js'

import { authValidation } from "../middlewares/auth.middleware.js";
import { roleValidation } from "../middlewares/role.middleware.js";

const router = Router();

router.get('/', findProducts);

router.get('/:pid', findProductById);


router.post('/new', authValidation, roleValidation, newProduct);

router.delete('/delete/:pid', deleteProduct);

export default router;