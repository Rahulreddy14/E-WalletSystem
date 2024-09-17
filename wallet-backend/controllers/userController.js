const { findUserByEmail, registerUser, validatePassword, findUserById } = require('../services/userService');
const generateToken = require('../utils/generateToken');

// Register a new user
const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await findUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await registerUser({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// User login
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (user && (await validatePassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get user profile
const getUserProfileController = async (req, res) => {
  const user = await findUserById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUserController, loginUserController, getUserProfileController };
