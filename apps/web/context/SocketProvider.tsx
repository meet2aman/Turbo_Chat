"use client";

import React, { useCallback, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
type DataProps = {
  message: string;
  name: string;
  room: string;
};
interface InterfaceSocketContext {
  sendRoomMessage: ({
    message,
    room,
    name,
  }: {
    name: string;
    room: string;
    message: string;
  }) => any;
  joinRoom: ({ name, room }: { name: string; room: string }) => any;
  sendGenMessage: ({ message }: { message: string }) => any;
  genMessages: string[];
  socket: any;
  onRoomMessageRec: any;
  roomMessages: string[];
}

const SocketContext = React.createContext<InterfaceSocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`State is not defined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket>();
  const [genMessages, setGenMessages] = React.useState<string[]>([
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
  ]);
  const [roomMessages, setRoomMessages] = React.useState<string[]>([
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
    "name",
    "cool",
  ]);

  React.useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onGenMessageRec);
    _socket.on("room", onRoomMessageRec);
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      _socket.off("message", onGenMessageRec);
      _socket.off("room", onRoomMessageRec);
      setSocket(undefined);
    };
  }, []);

  //// sending room specific message with roomId name and message
  const sendRoomMessage: InterfaceSocketContext["sendRoomMessage"] =
    useCallback(
      (data) => {
        console.log(`Send room Message: ${data.message}`);
        if (socket) {
          socket.emit("event:room-message", data);
        }
      },
      [socket]
    );

  //// sending general message with message only
  const sendGenMessage: InterfaceSocketContext["sendGenMessage"] = useCallback(
    (data) => {
      console.log(`Send Gen Message: ${data.message}`);
      if (socket) {
        socket.emit("event:gen-message", data);
      }
    },
    [socket]
  );

  //// joiining room with name and roomId to a specific room
  const joinRoom: InterfaceSocketContext["joinRoom"] = useCallback(
    ({ name, room }: { name: string; room: string }) => {
      console.log(`Name and Room: ${{ name, room }}`);
      if (socket) {
        socket.emit("event:joinRoom", { name, room });
      }
    },
    [socket]
  );

  // ON RECIEVING EV

  const onGenMessageRec = useCallback(
    (message: string) => {
      console.log(`From server Gen Message recieved: ${message}`);
      const msg = JSON.parse(message);
      setGenMessages((prev) => [...prev, msg.message]);
    },
    [socket]
  );
  const onRoomMessageRec = useCallback(
    (data: DataProps) => {
      console.log(`From server Room Message recieved: ${data.message}`);
      // const msg = JSON.parse(data);
      setRoomMessages((prev) => [...prev, data.message]);
    },
    [socket]
  );
  return (
    <SocketContext.Provider
      value={{
        sendRoomMessage,
        joinRoom,
        sendGenMessage,
        genMessages,
        roomMessages,
        socket,
        onRoomMessageRec,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
