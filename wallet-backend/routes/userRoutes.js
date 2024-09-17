const express = require('express');
const { registerUser, loginUser, getUserProfile, getAllUsers, getUserById } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);

// Admin routes
router.get('/admin/users', protect, admin, getAllUsers); // Get all users
router.get('/admin/users/:id', protect, admin, getUserById); // Get specific user by ID

module.exports = router;
