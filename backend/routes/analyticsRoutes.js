const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Spending by category
router.get('/spending-by-category/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    const summary = {};

    transactions.forEach(tx => {
      const cat = tx.category || "Other";
      summary[cat] = (summary[cat] || 0) + Math.abs(tx.amount);
    });

    const data = Object.keys(summary).map(cat => ({ category: cat, amount: summary[cat] }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate spending" });
  }
});

module.exports = router;
