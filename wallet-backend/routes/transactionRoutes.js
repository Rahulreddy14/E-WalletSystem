const express = require('express');
const { createTransaction, getTransactionHistory } = require('../controllers/transactionController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createTransaction); // Create a new transaction
router.get('/', protect, getTransactionHistory); // Get user's transaction history

module.exports = router;
