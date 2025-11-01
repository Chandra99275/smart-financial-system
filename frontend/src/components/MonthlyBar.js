import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MonthlyBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/dashboard/monthly-summary');
        const transformed = res.data.data.map(monthObj => {
          const month = monthObj.month;
          const incomeItem = monthObj.items.find(i => i.type === 'income') || { total: 0 };
          const expenseItem = monthObj.items.find(i => i.type === 'expense') || { total: 0 };
          return { month, income: Math.abs(incomeItem.total || 0), expense: Math.abs(expenseItem.total || 0) };
        });
        setData(transformed);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" name="Expense" />
        <Bar dataKey="income" name="Income" />
      </BarChart>
    </ResponsiveContainer>
  );
}
