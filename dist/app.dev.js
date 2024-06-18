"use strict";

var path = require("path");

var express = require('express');

var errorController = require("./controllers/error");

var db = require('./util/database');

var cronJob = require('./util/cron-jobs');

var User = require('./models/user');

var app = express();
app.set("view engine", "ejs");
app.set("views", "views");

var adminRoutes = require("./routes/admin");

var shopRoutes = require("./routes/shop");

app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          new User('Yigit', "yigit@gmail.com");
          _context.next = 4;
          return regeneratorRuntime.awrap(User.getUser('6665c28f54767c0814cfdea3'));

        case 4:
          user = _context.sent;
          req.user = new User(user.username, user.email, user.cart, user._id);
          next();
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next(_context.t0); // Hata durumunda error middleware'e yönlendir

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
db.mongoConnect().then(function () {
  return app.listen(3000);
});