"use client";
import React from "react";
import { useState } from "react";
import { Rings } from "react-loader-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSocket } from "../../context/SocketProvider";
import { useRouter } from "next/navigation";
import { useRoom } from "../../context/RoomContext";

const Room = () => {
  const router = useRouter();
  const { joinRoom } = useSocket();
  const { name, setName, room, setRoom }: any = useRoom();

  const [loading, setLoading] = useState(false);

  const handleJoin = () => {
    if (name === "" && room === "") {
      return alert("Please enter name and roomid.");
    }
    setLoading(true);
    joinRoom({ name, room });

    setTimeout(() => {
      router.push(`/roomId_${room}`);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="group">
      <div className="absolute opacity-75 group-hover:opacity-100  transition duration-1000 group-hover:duration-200 -inset-5 rounded-lg  bg-gradient-to-r from-yellow-600 via-purple-600 to-red-600 blur" />
      <Card className="w-[350px] bg-black border-none text-white scale-110">
        <CardHeader>
          <CardTitle>Create Room</CardTitle>
          <CardDescription>Deploy your new Room in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name of yours"
                  className="text-black"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Room Id</Label>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    id="room"
                    placeholder="Room Id"
                    className="text-black"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleJoin}
            className="hover:bg-white transition-all hover:text-green-600"
          >
            <span className="mr-2">
              {loading && (
                <>
                  <Rings
                    visible={true}
                    height="35"
                    width="35"
                    color="#4fa94d"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </>
              )}
            </span>
            {loading ? "Deploying" : "Deploy"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Room;
