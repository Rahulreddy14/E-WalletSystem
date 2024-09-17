import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import transactionReducer from './redux/transactionSlice';

// Create the store
export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
  },
});

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
