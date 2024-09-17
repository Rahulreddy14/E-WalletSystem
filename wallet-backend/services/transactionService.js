const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

/**
 * Create a peer-to-peer transaction
 * @param {object} sender - Sender user object
 * @param {object} recipient - Recipient user object
 * @param {number} amount - Transaction amount
 * @param {string} description - Transaction description
 */
const createTransaction = async (sender, recipient, amount, description) => {
  // Create and save the transaction
  const transaction = await Transaction.create({
    sender: sender._id,
    recipient: recipient._id,
    amount,
    description,
  });

  // Update sender and recipient balances
  sender.balance -= amount;
  recipient.balance += amount;

  await sender.save();
  await recipient.save();

  return transaction;
};

/**
 * Get transaction history for a user
 * @param {string} userId - User ID
 */
const getTransactionHistory = async (userId) => {
  // Get all transactions where the user is either the sender or recipient
  return await Transaction.find({
    $or: [{ sender: userId }, { recipient: userId }],
  }).sort({ createdAt: -1 });
};

module.exports = {
  createTransaction,
  getTransactionHistory,
};
    