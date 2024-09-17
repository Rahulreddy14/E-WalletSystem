import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  token: null,
  status: 'idle',
};

// Define the payload type for login
interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginPayload) => {
    const response = await axios.post('/api/users/login', credentials);
    return response.data.token;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = 'idle';
        localStorage.setItem('token', action.payload); // Save token in localStorage
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
