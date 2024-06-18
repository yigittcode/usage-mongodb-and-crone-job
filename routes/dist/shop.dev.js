"use strict";

var path = require('path');

var express = require('express');

var shopController = require('../controllers/shop');

var router = express.Router();
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.post('/add-to-cart', shopController.postAddCart);
router.get('/product/detail/:productID', shopController.getProductDetail);
router.post('/cart-delete-item', shopController.removeFromCart);
router.post('/create-order', shopController.postOrder);
router.get('/orders', shopController.getOrders);
module.exports = router;