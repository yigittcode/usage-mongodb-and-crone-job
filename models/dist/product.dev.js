"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getDB = require('../util/database').getDb;

var db;

var Product =
/*#__PURE__*/
function () {
  function Product(title, price, imageUrl, description) {
    _classCallCheck(this, Product);

    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    db = getDB().collection('products');
  }

  _createClass(Product, [{
    key: "save",
    value: function save() {
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(db.insertOne(this));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      return regeneratorRuntime.async(function fetchAll$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(db.find().toArray());

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return Product;
}();

module.exports = Product;