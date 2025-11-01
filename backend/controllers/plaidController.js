const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
require("dotenv").config();

// Mock DB for demo purposes
let budgets = [
  { category: "Food", limit: 300 },
  { category: "Shopping", limit: 200 },
];
let accounts = [
  { name: "Checking Account", balance: 1250.75 },
  { name: "Savings Account", balance: 4320.50 },
];
let transactions = [
  { category: "Food", amount: 50 },
  { category: "Shopping", amount: 100 },
  { category: "Bills", amount: 120 },
  { category: "Entertainment", amount: 80 },
];

// ✅ Mock: Return connected accounts
exports.getAccounts = async (req, res) => {
  try {
    res.json({ accounts });
  } catch (error) {
    console.error("getAccounts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mock: Return transactions summary
exports.getTransactionSummary = async (req, res) => {
  try {
    const summary = {};
    transactions.forEach((t) => {
      summary[t.category] = (summary[t.category] || 0) + t.amount;
    });
    res.json({ summary });
  } catch (error) {
    console.error("getTransactionSummary Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mock: Return budgets
exports.getBudgets = async (req, res) => {
  try {
    res.json({ budgets });
  } catch (error) {
    console.error("getBudgets Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mock: Save budgets
exports.saveBudget = async (req, res) => {
  try {
    budgets = req.body.budgets || [];
    res.json({ message: "Budgets saved successfully", budgets });
  } catch (error) {
    console.error("saveBudget Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
