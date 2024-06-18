const Product = require("../models/product");

// Controller for rendering the "Add Product" page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// Controller for adding a new product
exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userID = req.user.userID;
  try {
    // Creating a new product associated with the current user
   const product = new Product(title,price,imageUrl,description, userID);
   await product.save();

    res.redirect('/products'); 
  } catch (err) {
    console.log(err);
  }
};

// Controller for rendering the list of products in admin section
exports.getProducts = async (req, res, next) => {
  try {
    // Getting all products associated with the current user
    const products = await Product.fetchAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.log(error); 
  }
};

// Controller for rendering the "Edit Product" page
exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const productID = req.params.productID;
  const product = await Product.getProduct(productID);
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
  });
};

// Controller for updating a product
exports.postEditProduct = async (req, res, next) => {
  const productID = req.params.productID;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updated = { title, price, imageUrl, description };
  await Product.setProduct(productID, updated);
  res.redirect('/products'); // Redirecting to products page after editing product
};

// Controller for deleting a product
exports.deleteProduct = async (req, res, next) => {
  const productID = req.params.productID;
  await Product.deleteProduct(productID);
  res.redirect("/admin/products"); 
};
