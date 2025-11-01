import React from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

function PlaidLinkComponent({ linkToken, userId }) {
  const onSuccess = async (public_token) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/plaid/exchange-token`, {
        public_token,
        userId,
      });
      alert("Bank account connected successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error exchanging token:", err.message);
      alert("Failed to connect bank account.");
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      style={{
        backgroundColor: "#4CAF50",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Connect Bank Account
    </button>
  );
}

export default PlaidLinkComponent;
