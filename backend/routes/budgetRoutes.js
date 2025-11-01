const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

router.post('/:userId', async (req, res) => {
  const { category, limit } = req.body;
  const budget = new Budget({ userId: req.params.userId, category, limit });
  await budget.save();
  res.json({ message: "Budget saved" });
});

router.get('/:userId', async (req, res) => {
  const budgets = await Budget.find({ userId: req.params.userId });
  res.json(budgets);
});

module.exports = router;
