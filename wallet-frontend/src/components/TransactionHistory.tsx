import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transactionSlice';
import { RootState } from '../store';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const status = useSelector((state: RootState) => state.transactions.status);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl text-red-500 mb-4">Transaction History</h2>
      {status === 'loading' ? (
        <p>Loading transactions...</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className="mb-2 p-4 bg-gray-800 rounded">
              {transaction.amount} sent to {transaction.recipient} - {transaction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
