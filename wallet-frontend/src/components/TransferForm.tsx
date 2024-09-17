import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../redux/transactionSlice';

const TransferForm = () => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && recipientId) {
      dispatch(createTransaction({ recipientId, amount, description }));
      setRecipientId('');
      setAmount(0);
      setDescription('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl text-red-500 mb-4">Send Money</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="Recipient ID"
          className="p-2 mb-4 w-full bg-gray-700 rounded"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          className="p-2 mb-4 w-full bg-gray-700 rounded"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 mb-4 w-full bg-gray-700 rounded
