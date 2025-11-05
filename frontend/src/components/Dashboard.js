import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaWallet,
  FaList,
  FaChartPie,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PlaidLinkComponent from "./PlaidLinkComponent";

// Mock transactions
const mockTransactions = [
  { id: 1, description: "Salary", amount: 5000, date: "2025-10-01", category: "Income" },
  { id: 2, description: "Groceries", amount: -150, date: "2025-10-02", category: "Food" },
  { id: 3, description: "Rent", amount: -1200, date: "2025-10-03", category: "Housing" },
  { id: 4, description: "Investment", amount: 800, date: "2025-10-05", category: "Investment" },
  { id: 5, description: "Electricity Bill", amount: -200, date: "2025-10-10", category: "Utilities" },
  { id: 6, description: "Dining", amount: -90, date: "2025-10-12", category: "Food" },
];

// Helper
const calculateBalanceData = (transactions) => {
  let balance = 0;
  return transactions.map((tx) => {
    balance += tx.amount;
    return { date: tx.date, balance };
  });
};

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard"); // ✅ Default Dashboard
  const [linkToken, setLinkToken] = useState(null);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [spentAmount, setSpentAmount] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Fetch link token
  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:5000/api/plaid/create-link-token/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.link_token) setLinkToken(data.link_token);
        })
        .catch((err) => console.error("Error fetching link token:", err));
    }
  }, [user]);

  // Spending alert
  useEffect(() => {
    const spent = transactions
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    setSpentAmount(spent);
    if (spent > budgetLimit) setAlertMsg("🚨 You've exceeded your budget limit!");
    else if (spent > budgetLimit * 0.8) setAlertMsg("⚠️ You're close to your limit!");
    else setAlertMsg("");
  }, [transactions, budgetLimit]);

  const handleAddCategory = (id) => {
    if (!newCategory.trim()) return;
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, category: newCategory.trim() } : tx))
    );
    setNewCategory("");
  };

  // Style setup
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)",
      minHeight: "100vh",
      color: "#333",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 50px",
      color: "#fff",
      background: "rgba(0,0,0,0.15)",
      backdropFilter: "blur(10px)",
    },
    navbar: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      background: "rgba(255,255,255,0.9)",
      padding: "10px 20px",
      borderBottom: "2px solid rgba(255,255,255,0.3)",
    },
    navItem: (active) => ({
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      color: active ? "#fff" : "#0072ff",
      background: active ? "linear-gradient(90deg,#0072ff,#00c6ff)" : "transparent",
      transition: "0.3s",
    }),
    card: {
      background: "rgba(255,255,255,0.95)",
      borderRadius: "16px",
      padding: "30px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      width: "90%",
      margin: "25px auto",
    },
    button: {
      background: "linear-gradient(90deg,#0072ff,#00c6ff)",
      color: "#fff",
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
    },
  };

  // Pie chart: category breakdown
  const categoryData = Object.entries(
    transactions.reduce((acc, tx) => {
      const key = tx.category || "Uncategorized";
      acc[key] = (acc[key] || 0) + Math.abs(tx.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#00C6FF", "#0072FF", "#28A745", "#FFC107", "#E63946"];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>💰 Personal Finance Dashboard</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaUserCircle size={26} />
          <span>{user?.email}</span>
          <FaSignOutAlt size={22} style={{ cursor: "pointer" }} onClick={onLogout} />
        </div>
      </header>

      <nav style={styles.navbar}>
        <div style={styles.navItem(activeTab === "dashboard")} onClick={() => setActiveTab("dashboard")}>
          <FaWallet /> Dashboard
        </div>
        <div style={styles.navItem(activeTab === "transactions")} onClick={() => setActiveTab("transactions")}>
          <FaList /> Transactions
        </div>
        <div style={styles.navItem(activeTab === "budgets")} onClick={() => setActiveTab("budgets")}>
          <FaChartPie /> Budgets
        </div>
        <div style={styles.navItem(activeTab === "profile")} onClick={() => setActiveTab("profile")}>
          <FaUserCircle /> Profile
        </div>
      </nav>

      {/* ALERT */}
      {alertMsg && (
        <div style={{
          backgroundColor: "#fff3cd",
          padding: "10px 20px",
          borderRadius: "8px",
          color: "#856404",
          fontWeight: "600",
          margin: "20px auto",
          width: "90%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          {alertMsg}
        </div>
      )}

      {/* DASHBOARD TAB */}
      {activeTab === "dashboard" && (
        <div>
          {/* Summary Cards */}
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <div style={{ ...styles.card, width: "25%", textAlign: "center" }}>
              <h3>💵 Total Balance</h3>
              <h2 style={{ color: "#0072ff" }}>
                ₹
                {transactions.reduce((sum, tx) => sum + tx.amount, 0)}
              </h2>
            </div>
            <div style={{ ...styles.card, width: "25%", textAlign: "center" }}>
              <h3>📈 Income</h3>
              <h2 style={{ color: "#28a745" }}>
                ₹
                {transactions
                  .filter((t) => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)}
              </h2>
            </div>
            <div style={{ ...styles.card, width: "25%", textAlign: "center" }}>
              <h3>📉 Expenses</h3>
              <h2 style={{ color: "#e63946" }}>
                ₹
                {transactions
                  .filter((t) => t.amount < 0)
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0)}
              </h2>
            </div>
          </div>

          {/* Balance Chart */}
          <div style={styles.card}>
            <h3>📊 Balance Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calculateBalanceData(transactions)}>
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(v) => `₹${v}`} />
                <Tooltip formatter={(v) => `₹${v}`} />
                <Bar dataKey="balance" fill="#0072ff" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Spending Breakdown */}
          <div style={styles.card}>
            <h3>🍕 Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `₹${v}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TRANSACTIONS TAB */}
      {activeTab === "transactions" && (
        <div style={styles.card}>
          <h3>📋 Transactions</h3>
          {transactions.map((tx) => (
            <div key={tx.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: "12px 0",
            }}>
              <div>
                <strong>{tx.description}</strong> <br />
                <small>{tx.date}</small>
              </div>
              <div>
                <span style={{
                  color: tx.amount > 0 ? "#28a745" : "#e63946",
                  fontWeight: "600",
                }}>
                  {tx.amount > 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
                </span>
                <br />
                <small>Category: {tx.category}</small>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add/Edit Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginRight: "5px",
                  }}
                />
                <button style={styles.button} onClick={() => handleAddCategory(tx.id)}>
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BUDGET TAB */}
      {activeTab === "budgets" && (
        <div style={styles.card}>
          <h3>🎯 Budget Management</h3>
          <input
            type="number"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          />
          <p>💸 Total Spent: ₹{spentAmount}</p>
          <p>🎯 Limit: ₹{budgetLimit}</p>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === "profile" && (
        <div style={styles.card}>
          <h2>👤 Profile Information</h2>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?._id}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
