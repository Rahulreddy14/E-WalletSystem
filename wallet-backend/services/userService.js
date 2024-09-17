const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

/**
 * Find a user by email
 * @param {string} email - User's email
 */
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Register a new user
 * @param {object} userData - User details (name, email, password)
 */
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

/**
 * Validate user password
 * @param {string} enteredPassword - Plain text password
 * @param {string} storedPassword - Hashed password from the database
 */
const validatePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

/**
 * Find user by ID
 * @param {string} id - User ID
 */
const findUserById = async (id) => {
  return await User.findById(id).select('-password');
};

module.exports = {
  findUserByEmail,
  registerUser,
  validatePassword,
  findUserById,
};
