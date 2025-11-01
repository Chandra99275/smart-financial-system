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
  ResponsiveContainer,
} from "recharts";
import PlaidLinkComponent from "./PlaidLinkComponent";

const mockTransactions = [
  { id: 1, description: "Salary", amount: 5000, date: "2025-10-01", category: "Income" },
  { id: 2, description: "Groceries", amount: -150, date: "2025-10-02", category: "Food" },
  { id: 3, description: "Rent", amount: -1200, date: "2025-10-03", category: "Housing" },
  { id: 4, description: "Investment", amount: 800, date: "2025-10-05", category: "Investment" },
];

const calculateBalanceData = (transactions) => {
  let balance = 0;
  return transactions.map((tx) => {
    balance += tx.amount;
    return { date: tx.date, balance };
  });
};

function Dashboard({ userId, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [linkToken, setLinkToken] = useState(null);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    _id: userId || "",
  });
  const [transactions, setTransactions] = useState(mockTransactions);
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [spentAmount, setSpentAmount] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Fetch Plaid link token
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/plaid/create-link-token/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.link_token) setLinkToken(data.link_token);
        })
        .catch((err) => console.error("Error fetching link token:", err));
    }
  }, [userId]);

  // Fetch user profile
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/auth/me/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          username: data?.username || "User",
          email: data?.email || "Not available",
          _id: data?._id || userId,
        });
      })
      .catch(() => console.warn("Failed to load user profile"));
  }, [userId]);

  // Spending logic
  useEffect(() => {
    const spent = transactions
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    setSpentAmount(spent);
    if (spent > budgetLimit) {
      setAlertMsg("⚠️ You've exceeded your budget limit!");
    } else if (spent > budgetLimit * 0.8) {
      setAlertMsg("⚠️ You're close to your limit!");
    } else {
      setAlertMsg("");
    }
  }, [transactions, budgetLimit]);

  // Category handler
  const handleAddCategory = (id) => {
    if (!newCategory.trim()) return;
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, category: newCategory.trim() } : tx
      )
    );
    setNewCategory("");
  };

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f4f7fa",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 50px",
      background: "linear-gradient(90deg, #0072ff, #00c6ff)",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    navbar: {
      display: "flex",
      gap: "20px",
      background: "#fff",
      padding: "10px 40px",
      borderBottom: "1px solid #eee",
    },
    navItem: (active) => ({
      padding: "10px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: active ? "#0072ff" : "transparent",
      color: active ? "#fff" : "#333",
      fontWeight: "500",
      transition: "0.3s",
    }),
    main: {
      padding: "40px 50px",
    },
    sectionCard: {
      backgroundColor: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    },
    button: {
      background: "linear-gradient(90deg, #0072ff, #00c6ff)",
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h2>Welcome, {profile.username} 👋</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaUserCircle size={28} />
          <span>{profile.email}</span>
          <FaSignOutAlt
            size={24}
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={onLogout}
            title="Logout"
          />
        </div>
      </header>

      {/* NAVIGATION BAR */}
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

      <main style={styles.main}>
        {alertMsg && <p style={{ color: "red", fontWeight: "600" }}>{alertMsg}</p>}

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div style={styles.sectionCard}>
              <h3>Total Balance Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={calculateBalanceData(transactions)}>
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(v) => `₹${v}`} />
                  <Tooltip formatter={(v) => `₹${v}`} />
                  <Bar dataKey="balance" fill="#00c6ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.sectionCard}>
              {linkToken ? (
                <PlaidLinkComponent linkToken={linkToken} userId={userId} />
              ) : (
                <button
                  onClick={() => alert("Generating link token...")}
                  style={styles.button}
                >
                  Connect Bank Account
                </button>
              )}
            </div>
          </>
        )}

        {/* TRANSACTIONS */}
        {activeTab === "transactions" && (
          <div style={styles.sectionCard}>
            <h3>Transactions</h3>
            {transactions.map((tx) => (
              <div
                key={tx.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  padding: "10px 0",
                }}
              >
                <div>
                  <strong>{tx.description}</strong> <br />
                  <small>{tx.date}</small>
                </div>
                <div>
                  <span
                    style={{
                      color: tx.amount > 0 ? "#28a745" : "#e63946",
                      fontWeight: "600",
                    }}
                  >
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
                      padding: "5px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      marginRight: "5px",
                    }}
                  />
                  <button
                    style={styles.button}
                    onClick={() => handleAddCategory(tx.id)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BUDGETS */}
        {activeTab === "budgets" && (
          <div style={styles.sectionCard}>
            <h3>Budget Restriction</h3>
            <p>Set your monthly limit:</p>
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

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div style={styles.sectionCard}>
            <h3>Profile Information</h3>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>User ID:</strong> {profile._id}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
