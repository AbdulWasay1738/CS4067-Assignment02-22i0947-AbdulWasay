// booking-service/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();

// POST /payments - Mock Payment Gateway
router.post('/', (req, res) => {
  const { userId, amount } = req.body;
  console.log(`Mock Payment Gateway -> Processing payment for user ${userId}, amount: ${amount}`);

  // Always succeed, or randomly fail if you want to test
  // For now, we always return success
  return res.json({ status: 'success' });
});

module.exports = router;
