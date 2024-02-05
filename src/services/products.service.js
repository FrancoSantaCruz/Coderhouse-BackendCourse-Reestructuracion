import { productsManager } from "../dao/managers/products.manager.js"

export const findAll = async (obj) => {
    const products = await productsManager.findAllPg(obj)
    return products
};

export const findById = async (id) => {
    const product = await productsManager.findById(id)
    return product
};

export const createOne = async (obj) => {
    const newProduct = await productsManager.createOne(obj);
    return newProduct;
}

export const deleteOne = async (id) => {
    const deletedProduct = await productsManager.deleteOne(id);
    return deletedProduct;
}