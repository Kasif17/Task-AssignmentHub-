const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};
