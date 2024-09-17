import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Transaction Interface
interface Transaction {
  _id: string;
  amount: number;
  description: string;
  recipient: string;
  createdAt: string;
}

// Transaction State
interface TransactionState {
  transactions: Transaction[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TransactionState = {
  transactions: [],
  status: 'idle',
};

// Async thunk to fetch transaction history
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('/api/transactions', config);
    return response.data;
  }
);

// Async thunk to initiate a new transaction
export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData: { recipientId: string; amount: number; description: string }, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('/api/transactions', transactionData, config);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload); // Add the new transaction to the list
      });
  },
});

export default transactionSlice.reducer;
