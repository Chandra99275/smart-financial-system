// frontend/src/components/PlaidLinkComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';

function PlaidLinkComponent({ onLinked }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/plaid/create_link_token', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLinkToken(res.data.link_token || res.data.link_token);
    };
    fetchLinkToken();
  }, []);

  const onSuccess = async (public_token, metadata) => {
    // Send public_token to backend to exchange & store
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/plaid/exchange_public_token', { public_token }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (onLinked) onLinked(metadata);
    alert('Account linked successfully!');
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess
  });

  return (
    <div>
      <button onClick={() => open()} disabled={!ready || !linkToken} style={{ padding: '10px 15px', background:'#4CAF50', color:'#fff', border:'none', borderRadius:6 }}>
        Connect bank account
      </button>
    </div>
  );
}

export default PlaidLinkComponent;
