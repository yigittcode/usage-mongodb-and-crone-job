"use strict";

var db = require('./database').getDb;

cron.schedule('07 19 * * *', function _callee2() {
  var allUsersCursor, allProductsArray;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(db().collection('users').find());

        case 3:
          allUsersCursor = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(db().collection('products').find().toArray());

        case 6:
          allProductsArray = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(allUsersCursor.forEach(function _callee(userDoc) {
            var user, cart, _loop, i;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    user = userDoc; // Kullanıcı belgesi

                    cart = user.cart; // Kullanıcının cart'ı

                    if (!(!cart || !cart.items || cart.items.length === 0)) {
                      _context.next = 5;
                      break;
                    }

                    console.log("User ".concat(user.username, " has no items in the cart."));
                    return _context.abrupt("return");

                  case 5:
                    _loop = function _loop(_i) {
                      var cartItem = cart.items[_i];
                      var productId = cartItem.productID; // Ürünü product koleksiyonunda bul

                      var productExists = allProductsArray.some(function (product) {
                        return product._id.toString() === productId;
                      });

                      if (!productExists) {
                        // Ürün product koleksiyonunda bulunamadı, cart'tan kaldır
                        console.log("Product ".concat(productId, " not found in Product collection. Removing from cart.")); // Cart'tan ürünü kaldır

                        cart.items.splice(_i, 1);
                        _i--; // Dizide değişiklik yaptığımız için index'i azaltmalıyız
                      }

                      i = _i;
                    };

                    // Cart içindeki her ürünü kontrol et
                    for (i = 0; i < cart.items.length; i++) {
                      _loop(i);
                    } // Kullanıcı belgesini güncelle


                    _context.next = 9;
                    return regeneratorRuntime.awrap(db().collection('users').updateOne({
                      _id: user._id
                    }, {
                      $set: {
                        cart: cart
                      }
                    }));

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 9:
          console.log('Daily cron job completed.');
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error('Error in daily cron job:', _context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
});