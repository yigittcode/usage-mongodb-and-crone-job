"use strict";

var db = require('./database');

var cron = require('node-cron');

module.exports = cron.schedule('00 00 * * *', function _callee() {
  var allUsers, allProducts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user, cart, _loop, i;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.getDb().collection('users').find({}, {
            projection: {
              cart: 1
            }
          }).toArray());

        case 3:
          allUsers = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(db.getDb().collection('products').find({}, {
            projection: {
              _id: 1
            }
          }).toArray());

        case 6:
          allProducts = _context.sent;
          // Iterate over each user's cart
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 10;
          _iterator = allUsers[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 25;
            break;
          }

          user = _step.value;
          cart = user.cart;

          if (!(!cart || !cart.items || cart.items.length === 0)) {
            _context.next = 18;
            break;
          }

          console.log("User ".concat(user._id, " has no items in the cart."));
          return _context.abrupt("continue", 22);

        case 18:
          _loop = function _loop(_i) {
            var cartItem = cart.items[_i];
            var productId = cartItem.productID; // Check if the product exists in the products collection

            var productExists = allProducts.some(function (product) {
              return product._id.toString() === productId.toString();
            });

            if (!productExists) {
              // Product not found in the products collection, remove it from the cart
              console.log("Product ".concat(productId, " not found in Products collection. Removing from cart.")); // Remove the item from the cart

              cart.items.splice(_i, 1);
              _i--; // Adjust index due to array modification
            }

            i = _i;
          };

          // Check each item in the cart
          for (i = 0; i < cart.items.length; i++) {
            _loop(i);
          } // Update the user's cart in the database


          _context.next = 22;
          return regeneratorRuntime.awrap(db.getDb().collection('users').updateOne({
            _id: user._id
          }, {
            $set: {
              cart: cart
            }
          }));

        case 22:
          _iteratorNormalCompletion = true;
          _context.next = 12;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError) {
            _context.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
          console.log('Daily cron job completed.');
          _context.next = 45;
          break;

        case 42:
          _context.prev = 42;
          _context.t1 = _context["catch"](0);
          console.error('Error in daily cron job:', _context.t1);

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 42], [10, 27, 31, 39], [32,, 34, 38]]);
});