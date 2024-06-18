const path = require("path");
const express = require('express');
const errorController = require("./controllers/error");
const db = require('./util/database');
const cronJob = require('./util/cron-jobs');

let User = require('./models/user');



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

 const adminRoutes = require("./routes/admin");
 const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    new User('Yigit', "yigit@gmail.com");
    const user = await User.getUser('6665c28f54767c0814cfdea3');
    req.user = new User(user.username, user.email, user.cart, user._id);
    next();
  } catch (err) {
    console.log(err);
    next(err); // Hata durumunda error middleware'e yönlendir
  }
});



app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

db.mongoConnect()
.then( () =>
app.listen(3000)
);



