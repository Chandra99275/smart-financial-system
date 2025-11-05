// src/components/Signup.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById("auth-animation-style")) {
      const style = document.createElement("style");
      style.id = "auth-animation-style";
      style.textContent = `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log("🔹 Signup Response:", data);

      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background:
        "linear-gradient(-45deg, #e3f2fd, #bbdefb, #90caf9, #64b5f6)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 10s ease infinite",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(13,71,161,0.15)",
      padding: "40px",
      width: "90%",
      maxWidth: "420px",
      textAlign: "center",
      color: "#0d47a1",
      animation: "fadeInUp 0.8s ease forwards",
    },
    title: {
      background: "linear-gradient(90deg, #1976d2, #0d47a1)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #bbdefb",
      fontSize: "1rem",
      marginBottom: "15px",
      color: "#0d47a1",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#1976d2",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 5px 15px rgba(25,118,210,0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create an Account</h1>
        {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
