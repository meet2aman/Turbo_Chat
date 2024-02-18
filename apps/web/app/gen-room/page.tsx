"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { useSocket } from "../../context/SocketProvider";

const page = () => {
  const { sendGenMessage, genMessages } = useSocket();
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = { message };
    sendGenMessage(data);
    setMessage("");
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-black/80 max-w-[400px] mx-auto p-2 mt-10 rounded-sm relative">
        <div className="-z-10 absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
        <div className="flex gap-5 items-center justify-start px-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-xl font-semibold uppercase text-white">
                Aman
              </AvatarFallback>
            </Avatar>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-white">
            <h2 className="uppercase font-semibold tracking-wide">{`Gen-User`}</h2>
            <p className="text-sm text-slate-500">General Room</p>
          </div>
        </div>
        <Separator className="my-4 w-[90%] mx-auto" />
        <div className="text-white bg-black p-4 my-1 rounded-sm min-h-[500px] max-h-[500px] overflow-scroll">
          {genMessages.map((message, index) => (
            <>
              <p
                className="text-md capitalize inline-block font-medium bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl mb-2 px-4 py-2"
                key={index}
              >
                {message}
              </p>
              <br />
            </>
          ))}
        </div>
        <div className="">
          <form onSubmit={handleSubmit} className="grid gap-1 grid-cols-8">
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type a message"
              type="text"
              className="col-span-6 no-focus border-none bg-black rounded-sm px-3 py-2"
            />
            <button className="px-4 py-2 rounded-sm  !border-transparent !focus:border-transparent !focus:ring-0 col-span-2 bg-black text-white tracking-wide hover:bg-black/70">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
