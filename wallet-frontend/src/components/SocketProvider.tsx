import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001'); // Backend running on port 5001

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    socket.on('transaction', (data) => {
      alert(`New transaction of ${data.amount} sent by ${data.sender}`);
    });
  }, []);

  return <>{children}</>;
};

export default SocketProvider;

