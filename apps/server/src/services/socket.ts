import { Server, Socket } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-2ab32b9a-meet2amankushwaha-478c.a.aivencloud.com",
  port: 18452,
  username: "default",
  password: "AVNS_wTp5qk9TFONNQM88nMS",
});
const sub = new Redis({
  host: "redis-2ab32b9a-meet2amankushwaha-478c.a.aivencloud.com",
  port: 18452,
  username: "default",
  password: "AVNS_wTp5qk9TFONNQM88nMS",
});

type DataProps = {
  message: string;
  name: string;
  room: string;
};

class SocketServices {
  private _io: Server;
  constructor() {
    console.log(`Init Socket Server...`);
    this._io = new Server({
      pingTimeout: 600000,
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
        credentials: true,
      },
    });
    sub.subscribe("GEN-MESSAGE");
    sub.subscribe("ROOM-MESSAGE");
  }

  public initListeners() {
    const io = this.io;
    console.log(`Init Socket listeners...`);
    io.on("connect", (socket) => {
      console.log(`New Socket Connected ${socket.id}`);

      socket.on("event:gen-message", async (data) => {
        await pub.publish("GEN-MESSAGE", JSON.stringify(data));
      });

      socket.on("event:room-message", async (data: DataProps) => {
        console.log(`New Message recieved: ${data}`);
        await pub.publish("ROOM-MESSAGE", JSON.stringify(data));
      });

      socket.on("event:joinRoom", ({ room, name }) => {
        socket.join(room);
        console.log(`user-${name} with id-${socket.id} joined room - ${room}`);
      });
    });
    sub.on("message", (channel, data) => {
      if (channel === "GEN-MESSAGE") {
        console.log(`Sub gen-messsage ${data}`);
        io.emit("message", data);
      } else if (channel === "ROOM-MESSAGE") {
        console.log(`Sub room-messsage ${data}`);
        const Data: DataProps = JSON.parse(data);
        io.to(Data.room).emit("room", Data);
      }
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketServices;
