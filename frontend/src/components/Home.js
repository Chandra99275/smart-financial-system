import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

function Home() {
  const [financeData, setFinanceData] = useState([
    { name: "Income", value: 5000 },
    { name: "Expenses", value: 2500 },
    { name: "Savings", value: 1500 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFinanceData((prev) =>
        prev.map((item) => ({
          ...item,
          value: Math.floor(item.value * (0.9 + Math.random() * 0.2)),
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#007bff", "#00b4d8", "#90e0ef"];

  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 30%, #90caf9 60%, #64b5f6 100%)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 10s ease infinite",
      fontFamily: "'Poppins', sans-serif",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 60px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    navLeft: {
      display: "flex",
      gap: "15px",
    },
    navRight: {
      fontSize: "1.4rem",
      fontWeight: "700",
      color: "#1565c0",
      letterSpacing: "1px",
    },
    link: {
      textDecoration: "none",
      padding: "8px 18px",
      borderRadius: "8px",
      fontWeight: "600",
      color: "#0d47a1",
      transition: "0.3s ease",
    },
    loginBtn: {
      background: "linear-gradient(90deg, #1565c0, #0d47a1)",
      color: "#fff",
    },
    signupBtn: {
      background: "linear-gradient(90deg, #00c6ff, #0072ff)",
      color: "#fff",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 20px",
      textAlign: "center",
    },
    card: {
      background: "#ffffff",
      borderRadius: "25px",
      padding: "60px 50px",
      maxWidth: "850px",
      width: "100%",
      boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
      color: "#0d47a1",
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "700",
      background: "linear-gradient(90deg, #1565c0, #0d47a1)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "20px",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#1565c0",
      marginBottom: "35px",
      opacity: 0.9,
      lineHeight: "1.6",
    },
    chartWrapper: {
      margin: "30px auto",
      width: "100%",
      height: "330px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    chartBox: {
      background: "linear-gradient(145deg, #e3f2fd, #bbdefb)",
      borderRadius: "50%",
      padding: "25px",
      boxShadow: "0 8px 30px rgba(13, 71, 161, 0.25)",
      transition: "transform 0.4s ease",
    },
    aboutSection: {
      background: "rgba(240, 248, 255, 0.9)",
      borderRadius: "15px",
      padding: "25px",
      marginTop: "20px",
      fontSize: "1rem",
      color: "#0d47a1",
      lineHeight: "1.7",
      textAlign: "justify",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "25px",
      marginTop: "40px",
    },
    button: {
      padding: "14px 32px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "600",
      color: "#fff",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    primaryBtn: { backgroundColor: "#1565c0" },
    secondaryBtn: {
      background: "linear-gradient(90deg, #00c6ff, #0072ff)",
    },
  };

  return (
    <div style={styles.container}>
      {/* ✅ Navbar with Login/Signup on LEFT */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <Link to="/login" style={{ ...styles.link, ...styles.loginBtn }}>
            Login
          </Link>
          <Link to="/signup" style={{ ...styles.link, ...styles.signupBtn }}>
            Signup
          </Link>
        </div>
        <div style={styles.navRight}>💼 SmartFinance</div>
      </nav>

      {/* ✅ Main Landing Section */}
      <div style={styles.mainContent}>
        <motion.div
          style={styles.card}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={styles.title}>Welcome to Smart Finance</h1>
          <p style={styles.subtitle}>
            Simplify your financial life. Track income, monitor expenses, and
            visualize savings — all in one dashboard.
          </p>

          <motion.div
            style={styles.chartWrapper}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div style={styles.chartBox}>
              <ResponsiveContainer width={280} height={280}>
                <PieChart>
                  <Pie
                    data={financeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={70}
                    label
                  >
                    {financeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#f5f5f5",
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div style={styles.aboutSection}>
            💡 <strong>SmartFinance</strong> empowers you to make smarter
            financial decisions. Plan budgets, categorize spending, and track
            goals effortlessly. With data visualizations and real-time insights,
            managing money has never been easier or more secure.
          </div>

          {/* ✅ Buttons inside main card */}
          <div style={styles.buttonGroup}>
            <Link to="/login" style={{ ...styles.button, ...styles.primaryBtn }}>
              Login
            </Link>
            <Link
              to="/signup"
              style={{ ...styles.button, ...styles.secondaryBtn }}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
