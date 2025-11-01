const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  account_id: String,
  name: String,
  amount: Number,
  date: String,
  category: [String],
});

module.exports = mongoose.model("Transaction", transactionSchema);
