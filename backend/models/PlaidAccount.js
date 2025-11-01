const mongoose = require('mongoose');

const plaidAccountSchema = new mongoose.Schema({
  userId: String,
  access_token: String
});

module.exports = mongoose.model('PlaidAccount', plaidAccountSchema);
