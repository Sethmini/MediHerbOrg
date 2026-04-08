/**
 * Route Class for Authentications
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/delete/:id', authController.deleteUser);
router.put('/update/:id', authController.update);
router.get('/all-users', authController.getAllUsers);


module.exports = router;