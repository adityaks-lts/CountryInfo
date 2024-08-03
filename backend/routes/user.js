const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../modal/userSchema")

require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const user = Router();
user.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, email });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  user.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).send('User not found');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = user;