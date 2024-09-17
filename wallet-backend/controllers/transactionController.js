const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

// Create a new transaction (peer-to-peer transfer)
const createTransaction = async (req, res) => {
  const { recipientId, amount, description } = req.body;

  try {
    // Check if both users (sender and recipient) exist
    const sender = req.user;
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Ensure sender has enough balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Create and save the transaction
    const transaction = await Transaction.create({
      sender: sender._id,
      recipient: recipient._id,
      amount,
      description,
    });

    // Update balances of sender and recipient
    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    res.status(201).json({
      message: 'Transaction successful',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Transaction failed', error });
  }
};

// Get transaction history for the authenticated user
const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user._id }, { recipient: req.user._id }],
    }).sort({ createdAt: -1 }); // Get transactions involving the user

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve transaction history', error });
  }
};

module.exports = {
  createTransaction,
  getTransactionHistory,
};
