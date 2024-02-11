"use client";

import React, { useCallback, useContext } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface InterfaceSocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<InterfaceSocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`State is not defined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  React.useEffect(() => {
    const _socket = io("http://localhost:8000");
    return () => {
      _socket.disconnect();
    };
  }, []);

  const sendMessage: InterfaceSocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log(`Send Message: ${msg}`);
    },
    []
  );
  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
