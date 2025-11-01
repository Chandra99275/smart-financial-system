import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert("User already exists or registration failed.");
    }
  };

  const styles = {
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "16px",
      padding: "50px 45px",
      width: "90%",
      maxWidth: "420px",
      textAlign: "center",
      color: "#ffffff",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      animation: "fadeIn 0.9s ease-in-out",
    },
    logo: {
      fontSize: "2.4rem",
      fontWeight: "700",
      marginBottom: "10px",
      background: "linear-gradient(90deg, #4facfe, #00f2fe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    tagline: {
      fontSize: "1rem",
      color: "#cfd8dc",
      marginBottom: "35px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      marginBottom: "18px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.2)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.3s ease",
    },
    button: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "10px",
      color: "#fff",
      fontWeight: "600",
      fontSize: "1rem",
      background: "linear-gradient(90deg, #43cea2, #185a9d)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(67,206,162,0.3)",
    },
    footer: {
      marginTop: "25px",
      fontSize: "0.95rem",
      color: "#cfd8dc",
    },
    link: {
      color: "#00f2fe",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          input:focus {
            background: rgba(255,255,255,0.25) !important;
            box-shadow: 0 0 0 2px #00f2fe;
          }

          button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(67,206,162,0.45);
          }

          button:active {
            transform: scale(0.98);
          }
        `}
      </style>

      <div style={styles.glassCard}>
        <h1 style={styles.logo}>PFM Signup</h1>
        <p style={styles.tagline}>Create your account to manage finances smartly.</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
