require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);

// --- Plaid Setup ---
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // change to 'development' or 'production' later
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// 1️⃣ Create link token
app.get("/api/plaid/create-link-token/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: "My PFM App",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });
    res.json({ link_token: response.data.link_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create link token" });
  }
});

// 2️⃣ Exchange public token for access token
app.post("/api/plaid/exchange-token", async (req, res) => {
  const { public_token, userId } = req.body;

  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const access_token = response.data.access_token;
    const item_id = response.data.item_id;

    // TODO: Save access_token and item_id in DB for the user
    // Example: await User.findByIdAndUpdate(userId, { access_token, item_id });

    res.json({ access_token, item_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to exchange token" });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
