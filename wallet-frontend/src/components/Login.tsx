import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';  // Import the AppDispatch type
import { loginUser } from '../redux/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();  // Correctly type the dispatch
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dispatch the async thunk
    const result = await dispatch(loginUser({ email, password }));
    
    // Handle the result of the dispatch
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="p-6 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-3 p-2 w-full bg-gray-700 rounded focus:outline-none"
        />
        <button type="submit" className="w-full bg-red-500 p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
