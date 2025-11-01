import React, { useEffect, useState } from "react";
import axios from "axios";

function BudgetSettings({ userId }) {
  const [budget, setBudget] = useState({ monthly: 0, spent: 0 });

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/budget/${userId}`);
        setBudget(res.data);
      } catch (err) {
        console.error("Failed to fetch budget, using mock data:", err.message);
        setBudget({ monthly: 3000, spent: 1200 });
      }
    };
    fetchBudget();
  }, [userId]);

  const remaining = budget.monthly - budget.spent;

  return (
    <div style={{ marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h3>Budget Settings</h3>
      <p>Monthly Budget: ₹{budget.monthly}</p>
      <p>Spent: ₹{budget.spent}</p>
      <p>Remaining: ₹{remaining}</p>
    </div>
  );
}

export default BudgetSettings;
