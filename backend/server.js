/** Express server setup and configuration 
 * 
 * Entry point for the backend server application.
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const connectToDatabase = require('./configs/database');

/**
 * Import Routes
 */
const authRoutes = require('./routes/authRoutes');
const userProfileRoutes = require('./routes/profileRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const pharmacyRoutes = require('./routes/phamacyRoutes');
const drugRoutes = require('./routes/drugRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectToDatabase();

//Mount the routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user-profiles', userProfileRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/pharmacies', pharmacyRoutes);
app.use('/api/v1/drugs', drugRoutes);

// Server Setup and Start Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});