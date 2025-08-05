const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted to protected route", userId: req.userId });
});

module.exports = router;
