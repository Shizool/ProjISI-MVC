const path = require('path');

const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.getIndex);

router.get('/products', productController.getProducts);

router.get('/products/:productId', productController.getProduct);

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.postEditProduct);

router.post('/delete-product', productController.postDeleteProduct);

module.exports = router;
