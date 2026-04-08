/** Database configuration and connection setup
 * Using Mongoose to connect to MongoDB
 * Reads MongoDB URI from environment variables
 */

const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI
        );
        console.log('Connected to MongoDB database successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;