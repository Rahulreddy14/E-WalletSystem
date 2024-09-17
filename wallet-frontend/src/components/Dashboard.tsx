import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const profileResponse = await axios.get('/api/users/profile', config);
      setBalance(profileResponse.data.balance);

      const transactionResponse = await axios.get('/api/transactions', config);
      setTransactions(transactionResponse.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-red-500">Dashboard</h1>
      <div className="mt-4">
        <h2 className="text-xl">Balance: ${balance}</h2>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className="my-2 p-4 bg-gray-800 rounded">
              {transaction.amount} sent to {transaction.recipient.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
