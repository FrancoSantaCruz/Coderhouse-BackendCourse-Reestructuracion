import { Router } from "express";
import { homeView, loginView, signupView, allChatsView, newChat, chatView, allProductsView, productDetailsView } from "../controllers/views.controller.js";

import { authValidation } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', homeView)

router.get('/login', loginView)

router.get('/signup', signupView)

// CHATS VIEWS
router.get("/chats", authValidation, allChatsView)

router.post("/chats/new", authValidation, newChat)

router.get("/chat/:cid", authValidation, chatView)

// PRODUCTS VIEW
// All products
router.get('/products', allProductsView)

// Product detail
router.get('/products/:pid', productDetailsView)

export default router;