const { ObjectId } = require('mongodb');

const db = require('../util/database').getDb;

class Product {
    constructor(title, price, imageUrl, description, userID) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.userID = new ObjectId(userID);
    }

    // Static method to get the database collection for products
    static #getDB() {
        return db().collection('products');
    }

    // Method to save the product instance into the database
    async save() {
        try {
            await Product.#getDB().insertOne(this);
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

    // Static method to fetch all products from the database
    static async fetchAll() {
        try {
            return await Product.#getDB().find().toArray();
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw error;
        }
    }

    // Static method to fetch a product by its ID from the database
    static async getProduct(id) {
        try {
            return await Product.#getDB().findOne({ "_id": new ObjectId(id) });
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }

    // Static method to update a product in the database
    static async setProduct(productId, newObject) {
        try {
            await Product.#getDB().updateOne(
                { _id: new ObjectId(productId) }, // Filter to find the document to update
                { $set: newObject } // Updated fields with new data
            );
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    // Static method to delete a product from the database
    static async deleteProduct(productId) {
        try {
            await Product.#getDB().deleteOne({ _id: new ObjectId(productId) });
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

module.exports = Product;
