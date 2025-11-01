import React, { useEffect, useState } from "react";
import axios from "axios";

function AccountsList({ userId }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/accounts/${userId}`);
        setAccounts(res.data);
      } catch (err) {
        console.error("Failed to fetch accounts, using mock data:", err.message);
        // Use mock data if backend fails
        setAccounts([
          { id: 1, name: "Checking Account", balance: 2500 },
          { id: 2, name: "Savings Account", balance: 10000 },
        ]);
      }
    };
    fetchAccounts();
  }, [userId]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Accounts</h3>
      {accounts.map((acc) => (
        <div
          key={acc.id}
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{acc.name}</strong>:  ₹{acc.balance.toLocaleString()}
        </div>
      ))}
    </div>
  );
}

export default AccountsList;
