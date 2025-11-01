import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function TransactionsChart({ userId, startDate, endDate }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/transactions/${userId}?start=${startDate}&end=${endDate}`
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions, using mock data:", err.message);
        setTransactions([
          { id: 1, description: "Salary", amount: 5000, date: "2025-10-01" },
          { id: 2, description: "Groceries", amount: -150, date: "2025-10-02" },
          { id: 3, description: "Rent", amount: -1200, date: "2025-10-03" },
          { id: 4, description: "Investment", amount: 800, date: "2025-10-05" },
        ]);
      }
    };
    fetchTransactions();
  }, [userId, startDate, endDate]);

  // Calculate cumulative balance
  const balanceData = transactions.reduce((acc, tx) => {
    const lastBalance = acc.length ? acc[acc.length - 1].balance : 0;
    acc.push({ date: tx.date, balance: lastBalance + tx.amount });
    return acc;
  }, []);

  return (
    <div style={{ marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h3>Transactions</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={balanceData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="balance" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TransactionsChart;
