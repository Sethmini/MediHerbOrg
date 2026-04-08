/**
 * Service Class for Authentication 
 * Included Secure Login and Registration
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import User Model
const User = require('../models/User');

/**
 * Service-Function for Register User
 */
const registerUser = async ({ useremail, password, role }) => {
    // Find the Exist Users for the Email Address
    const existingUser = await User.findOne({ useremail });
    if (existingUser) {
        throw new Error('Email Address is Already Used!')
    }

    // Hashing the Password usng bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a New User Object
    const user = new User (
        {
            useremail,
            password: hashedPassword,
            role
        }
    )
    
    // Save the User to the Database
    await user.save();
    return user;
};

/**
 * User Login Function
 */
const loginUser = async ({useremail, password}) => {
    const user = await User.findOne({ useremail });
    if (!user) {
        throw new Error('Invalied User Email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalied Password');
    }

    // Create JWT SIgn Token
    const token = jwt.sign(
        { userId: user._id, email: user.useremail, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    );

    return {
        token, user
    }
}

const deleteUser = async (id) => {

   const deletedUser = await User.findByIdAndDelete(id);

   return deletedUser;

}

const updateUser = async (userId, { useremail, password, role }) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // If email is being updated, check for duplicates
    if (useremail && useremail !== user.useremail) {
        const existingUser = await User.findOne({ useremail });
        if (existingUser) {
            throw new Error('Email Address is Already Used!');
        }
        user.useremail = useremail;
    }

    // Update password if provided
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    // Update role if provided
    if (role) {
        user.role = role;
    }

    await user.save();

    // Return updated user without sensitive info
    return { useremail: user.useremail, role: user.role };
};

const getAllUsers = async () => {
    const users = await User.find().select('-password'); // Exclude passwords
    return users;
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUsers
}