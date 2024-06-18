const express = require('express');
const Product = require('../models/product');

// Controller to retrieve all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll(); // Fetching all products asynchronously
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (error) {
    console.error(error); 
  }
};

// Controller for the index page
exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll()
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.error(error); 
  }
};

// Controller for product details
exports.getProductDetail = async (req, res, next) => {
  const prodId = req.params.productID;
  try {
    const product = await Product.getProduct(prodId);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (err) {
    console.error(err); 
  }
};

// Controller for the cart page
exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cart
    });
  } catch (err) {
    console.error(err); 
  }
};

// Controller for rendering the orders page
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// Controller for rendering the checkout page
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

// Controller for adding a product to the cart
exports.postAddCart = async (req, res, next) => {
    const prodId = req.body.productID;
    const targetProduct = await Product.getProduct(prodId);
    await req.user.addToCart(targetProduct);
    res.redirect('/cart');
};

// Controller for removing a product from the cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    req.user.deleteFromCart(prodId);
    }
   catch (err) {
    console.error(err);
  }finally{
    res.redirect('/cart');
  }
};

// Controller for placing an order
exports.postOrder = async (req, res, next) => {
  try {
    await req.user.addOrder();
    res.redirect('/orders');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Controller for rendering the orders page with order details
exports.getOrders = async (req, res, next) => {
  try {
      const orders =await req.user.getOrder();
      res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};



// const model = Product;
// for (let assoc of Object.keys(model.associations)) {
//   for (let accessor of Object.keys(model.associations[assoc].accessors)) {
//     console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
//   }
// }

// product.getUser()
// product.setUser()
// product.createUser()
// product.getCarts()
// product.setCarts()
// product.addCarts()
// product.addCart()
// product.createCart()
// product.removeCart()
// product.removeCarts()
// product.hasCart()
// product.hasCarts()
// product.countCarts()