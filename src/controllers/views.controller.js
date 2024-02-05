import { 
    findAll as findAllMsg, 
    findByField as findByFieldMsg, 
    createOne as createMsg 
} from "../services/messages.service.js";

import {
    findAll as findAllProd,
    findById as findByIdProd,
} from "../services/products.service.js";


export const homeView = async (req, res) => {
    const user = req.user
    try {
        if (user) {
            let cart_total = 0
            user.cart.products.forEach(e => {
                cart_total += e.product.price
            })
            return res.render('home', { user: user, cart_total: cart_total })
        } else {
            return res.render('home')
        }
    } catch (error) {
        res.status(500).json({ error })
    }
};


export const loginView = async (req, res) => {
    res.render('login')
};

export const signupView = async (req, res) => {
    res.render('signup')
};


// CHATS VIEWS
export const allChatsView = async (req, res) => {
    const user = req.user;
    const chats = await findAllMsg();

    if (user) {
        return res.render('allChats', { user: user, chats });
    } else {
        return res.render('allChats', { chats });
    }
};


export const newChat = async (req, res) => {
    const { chatTitle } = req.body
    try {
        if (!chatTitle) {
            return res.status(400).json({ message: 'Some data is missing.' })
        }
        const chats = await createMsg({ chats: [], title: chatTitle })
        res.redirect('/chats')

    } catch (error) {
        res.status(500).json({ error })
    }
};


export const chatView = async (req, res) => {
    const { cid } = req.params;
    const chat = await findByFieldMsg({ '_id': cid });
    res.render("chat", { chat: chat._id, messages: chat.chats, user: req.user });
};


// ------PRODUCTS VIEW
// All products
export const allProductsView = async (req, res) => {
    const user = req.user
    try {
        const products = await findAllProd(req.query)
        products.payload.forEach(e => {
            if (e.sale) {
                e["sale_price"] = e.price - (Math.round(e.price * (e.sale_percent / 100)))
            }
        });
        if (user) {
            let cart_total = 0
            user.cart.products.forEach(e => {
                cart_total += e.product.price
            })
            return res.render('products_all', { products: products.payload, info: products, user: user, cart_total: cart_total })
        }
        res.render('products_all', { products: products.payload, info: products, user: user })
    } catch (error) {
        res.redirect(500, '/error')
    }
};

// Product detail
export const productDetailsView = async (req, res) => {
    const { pid } = req.params;
    const user = req.user;
    try {
        const product = await findByIdProd(pid)
        if (user) {
            let cart_total = 0
            user.cart.products.forEach(e => {
                cart_total += e.product.price
            })
            return res.render('products_detail', { product, user, cart_total })
        }
        res.render('products_detail', { product })
    } catch (error) {
        res.redirect(500, '/error')
    }
};

