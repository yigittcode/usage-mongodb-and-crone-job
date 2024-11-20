const db = require('./database');
const cron = require('node-cron');

module.exports = cron.schedule('00 00 * * *', async () => {
    try {
        // Fetch all users and their carts
        const allUsers = await db.getDb().collection('users').find({}, { projection: { cart: 1 } }).toArray();
        // Fetch all products
        const allProducts = await db.getDb().collection('products').find({}, { projection: { _id: 1 } }).toArray();

        // Iterate over each user's cart
        for (let user of allUsers) {
            const cart = user.cart;

            if (!cart || !cart.items || cart.items.length === 0) {
                console.log(`User ${user._id} has no items in the cart.`);
                continue; // Skip to the next user if the cart is empty or items are missing
            }

            // Check each item in the cart
            for (let i = 0; i < cart.items.length; i++) {
                const cartItem = cart.items[i];
                const productId = cartItem.productID;

                // Check if the product exists in the products collection
                const productExists = allProducts.some(product => product._id.toString() === productId.toString());

                if (!productExists) {
                    // Product not found in the products collection, remove it from the cart
                    console.log(`Product ${productId} not found in Products collection. Removing from cart.`);
                    // Remove the item from the cart
                    cart.items.splice(i, 1);
                    i--; // Adjust index due to array modification
                }
            }

            // Update the user's cart in the database
            await db.getDb().collection('users').updateOne({ _id: user._id }, { $set: { cart: cart } });
        }

        console.log('Daily cron job completed.');
    } catch (error) {
        console.error('Error in daily cron job:', error);
    }
});
