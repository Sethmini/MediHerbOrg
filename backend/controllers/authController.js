    /**
 * Class for Auth Controller - User Loging and Registration
 */

const authService = require('../services/authService')

const register = async (req, res) => {

    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'User registration Successfully',
            user: { useremail: user.useremail, role: user.role, _id: user._id }
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { token, user } = await authService.loginUser(req.body);
        res.status(200).json({
             message: 'Login successful',
             token,
             user: { useremail: user.useremail, role: user.role, _id: user._id }
        })
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await authService.deleteUser(req.params.id);
        res.status(200).json({
            message: 'User Deleted Successful',
            user: deletedUser.useremail
        })
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const update = async (req, res) => {
    const userId = req.params.id;

    try {
        const updatedUser = await authService.updateUser(userId, req.body);
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports = {
    register,
    login,
    deleteUser, 
    update,
    getAllUsers
}