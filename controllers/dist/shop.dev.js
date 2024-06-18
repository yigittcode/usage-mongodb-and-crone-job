"use strict";

var express = require('express');

var Product = require('../models/product'); // Controller to retrieve all products


exports.getProducts = function _callee(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.fetchAll());

        case 3:
          products = _context.sent;
          // Fetching all products asynchronously
          res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for the index page


exports.getIndex = function _callee2(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.fetchAll());

        case 3:
          products = _context2.sent;
          res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for product details


exports.getProductDetail = function _callee3(req, res, next) {
  var prodId, product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          prodId = req.params.productID;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Product.getProduct(prodId));

        case 4:
          product = _context3.sent;
          res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; // Controller for the cart page


exports.getCart = function _callee4(req, res, next) {
  var cart;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(req.user.getCart());

        case 3:
          cart = _context4.sent;
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cart
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for rendering the orders page


exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
}; // Controller for rendering the checkout page


exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}; // Controller for adding a product to the cart


exports.postAddCart = function _callee5(req, res, next) {
  var prodId, targetProduct;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          prodId = req.body.productID;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.getProduct(prodId));

        case 3:
          targetProduct = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(req.user.addToCart(targetProduct));

        case 6:
          res.redirect('/cart');

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Controller for removing a product from the cart


exports.removeFromCart = function _callee6(req, res, next) {
  var prodId;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          try {
            prodId = req.body.productId;
            req.user.deleteFromCart(prodId);
          } catch (err) {
            console.error(err);
          } finally {
            res.redirect('/cart');
          }

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // Controller for placing an order


exports.postOrder = function _callee7(req, res, next) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(req.user.addOrder());

        case 3:
          res.redirect('/orders');
          _context7.next = 10;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          next(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; // Controller for rendering the orders page with order details


exports.getOrders = function _callee8(req, res, next) {
  var orders;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(req.user.getOrder());

        case 3:
          orders = _context8.sent;
          res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
          });
          _context8.next = 11;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          next(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // const model = Product;
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