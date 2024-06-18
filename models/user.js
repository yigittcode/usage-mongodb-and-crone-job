const db = require('../util/database').getDb;
const { ObjectId } = require('mongodb');

class User {
    constructor(username, email, cart, userID) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this.userID = new ObjectId(userID);
    }

    // Static method to get the database collection for users
    static #getDB() {
        return db().collection('users');
    }

    // Method to save the user instance into the database
    async save() {
        try {
            await User.#getDB().insertOne(this);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }

    // Method to add a product to the user's cart
    async addToCart(product) {
        try {
            // Get the existing cart or initialize it if it doesn't exist
            const existingCart = this.cart || { items: [] };

            // Check if the product already exists in the cart
            const cartProductIndex = existingCart.items.findIndex(cp => cp.productID.toString() === product._id.toString());
            
            let newQuantity = 1;
            const updatedCartItems = [...existingCart.items];

            if (cartProductIndex !== -1) {
                // Product already exists in the cart, increase its quantity
                newQuantity = existingCart.items[cartProductIndex].quantity + 1;
                updatedCartItems[cartProductIndex].quantity = newQuantity;
            } else {
                // Product does not exist in the cart, add it as a new item
                updatedCartItems.push({
                    productID: new ObjectId(product._id),
                    quantity: newQuantity
                });
            }

            // Update the user's cart in the database
            const updatedCart = { items: updatedCartItems };
            await User.#getDB().updateOne(
                { _id: new ObjectId(this.userID) }, // Filter to find the document to update
                { $set: { cart: updatedCart } } // Updated fields with new data
            );
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    // Method to retrieve the user's cart with populated product details
    async getCart() {
        try {
            if (!this.cart || !this.cart.items) {
                return [];
            }

            // Extract product IDs from the cart items
            const prodIds = this.cart.items.map(item => {
                return item.productID;
            });

            // Fetch products from the database based on product IDs
            const products = await db().collection('products').find({ _id: { $in: prodIds } }).toArray();
            const cart = [];

            // Populate the cart with product details and quantities
            for (const prod of products) {
                const cartItem = this.cart.items.find(item => {
                    return item.productID.toString() === prod._id.toString();
                });

                if (cartItem) {
                    cart.push({ ...prod, quantity: cartItem.quantity });
                }
            }

            return cart;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    }

    // Method to delete a product from the user's cart
    async deleteFromCart(productId) {
        try {
            // Get the current items in the cart
            const existingCart = this.cart;

            // Filter out the item with the given productId from the cart
            const updatedCartItems = existingCart.items.filter(item => item.productID.toString() !== productId.toString());

            // Update the user's cart in the database with the updated items
            await User.#getDB().updateOne(
                { _id: new ObjectId(this.userID) }, // Filter to find the document to update
                { $set: { cart: { items: updatedCartItems } } } // Updated fields with new data
            );
        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    }

    // Method to add an order for the user
    async addOrder() {
        try {
            // Get the products currently in the user's cart
            const products = await this.getCart();

            // Create the order object
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this.userID),
                }
            };

            // Add the order to the database
            await db().collection('orders').insertOne(order);

            // Clear the user's cart after placing the order
            this.cart = { items: [] };
            await User.#getDB().updateOne(
                { _id: new ObjectId(this.userID) },
                { $set: { cart: { items: [] } } }
            );

        } catch (error) {
            console.error('Error adding order:', error);
            throw error;
        }
    }

    // Method to retrieve orders for the user
    async getOrders() {
        try {
            const orders = await db().collection('orders').find({ "user._id": new ObjectId(this.userID) }).toArray();
            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }

    // Static method to fetch a user by their ID
    static async getUser(id) {
        try {
            const user = await User.#getDB().findOne({ "_id": new ObjectId(id) });
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Unable to fetch user');
        }
    }
}

module.exports = User;
