"use client";

import { createContext, useContext, useState } from "react";

const RoomContext = createContext({});

const RoomProvider = ({ children }: any) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  return (
    <RoomContext.Provider value={{ room, setRoom, name, setName }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  return useContext(RoomContext);
};

export default RoomProvider;
