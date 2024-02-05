import { Router } from "express";

import {
    findById as findByIdCart,
    createOne as createOneCart,
    updateOne as updateOneCart
} from "../services/carts.service.js";

import { findById as findByIdProd } from "../services/products.service.js";


const router = Router();

 
export const findCart = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await findByIdCart(cid)
        res.status(200).json({ message: 'Cart found', cart })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const newCart = async (req, res) => {
    try {
        const cart = { products: [] }
        const newCart = await createOneCart(cart)
        res.status(200).json({ message: ' New cart', cart: newCart })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const addProdToCart = async (req, res) => {
    const { cid, pid } = req.params;
    let user = req.user
    try {
        const cart = await findByIdCart(cid)
        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }
        const product = await findByIdProd(pid);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }
        const prod_idx = cart.products.findIndex((prod) => prod.product._id.equals(pid));
        // Como prod.product son tipo de datos ObjectId de mongoose
        // necesitamos usar .equals() para comparar con otro tipo de dato
        if (prod_idx === -1) {
            cart.products.push({ product: pid, quantity: 1 })
        } else {
            cart.products[prod_idx].quantity++
        }

        await updateOneCart(cid, cart)

        res.status(200).redirect('back')
    } catch (error) {
        res.status(500).json({ error })
    }
}

export default router;