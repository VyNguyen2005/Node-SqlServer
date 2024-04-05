`use strict`;

const express = require(`express`);
const environment = require(`../controllers/products.controllers.js`);
const router = express.Router();

const {getProducts, getProduct, createProducts, deleteProduct, updateProduct} = environment;

router.get(`/products`, getProducts);
router.get(`/products/:id`, getProduct);
router.post(`/products`, createProducts);
router.delete(`/products/:id`, deleteProduct)
router.put(`/products/:id`, updateProduct);

module.exports = {routes: router};