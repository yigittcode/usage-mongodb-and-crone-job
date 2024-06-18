const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

 router.get('/', shopController.getIndex);

 router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

 router.post('/add-to-cart', shopController.postAddCart);

router.get('/product/detail/:productID',shopController.getProductDetail)

router.post('/cart-delete-item',shopController.removeFromCart);

router.post('/create-order', shopController.postOrder);

 router.get('/orders', shopController.getOrders);

module.exports = router;
