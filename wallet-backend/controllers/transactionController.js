const { createTransaction, getTransactionHistory } = require('../services/transactionService');
const User = require('../models/userModel');
const sendNotification = require('../services/notificationService');

// Create a new transaction
const createTransactionController = async (req, res) => {
  const { recipientId, amount, description } = req.body;

  try {
    const sender = req.user;
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    const transaction = await createTransaction(sender, recipient, amount, description);

    // Send notification
    sendNotification({
      sender: sender.email,
      recipient: recipient.email,
      amount,
      description,
    });

    res.status(201).json({
      message: 'Transaction successful',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Transaction failed', error });
  }
};

// Get transaction history
const getTransactionHistoryController = async (req, res) => {
  try {
    const transactions = await getTransactionHistory(req.user._id);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve transaction history', error });
  }
};

module.exports = { createTransactionController, getTransactionHistoryController };
