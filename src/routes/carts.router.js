import { Router } from "express";
import { findCart, newCart, addProdToCart } from "../controllers/carts.controller.js";

const router = Router();

router.get('/:cid', findCart);

router.post('/', newCart);

router.post('/:cid/products/:pid', addProdToCart);

export default router;