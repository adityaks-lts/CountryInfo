const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token, jwt_secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send('Invalid token.');
    }
  };
  
  module.exports = auth