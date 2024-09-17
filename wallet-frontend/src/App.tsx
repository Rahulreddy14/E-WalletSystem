import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import SocketProvider from './components/SocketProvider';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App = () => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </SocketProvider>
    </Provider>
  );
};

export default App;
