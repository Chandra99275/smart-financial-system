const express = require("express");
const router = express.Router();
const {
  getAccounts,
  getTransactionSummary,
  getBudgets,
  saveBudget,
} = require("../controllers/plaidController");

// Get connected accounts
router.get("/accounts", getAccounts);

// Get transactions summary (spending by category, etc.)
router.get("/transactions/summary", getTransactionSummary);

// Get saved budgets
router.get("/budgets", getBudgets);

// Save budgets
router.post("/budgets", saveBudget);

module.exports = router;
