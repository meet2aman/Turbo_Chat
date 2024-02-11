import { Server, Socket } from "socket.io";

class SocketServices {
  private _io: Server;
  constructor() {
    console.log(`Init Socket Server...`);
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
        credentials: true,
      },
    });
  }

  public initListeners() {
    const io = this.io;
    console.log(`Init Socket listeners...`);
    io.on("connect", (socket) => {
      console.log(`New Socket Connected ${socket.id}`);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New Message recieved: ${message}`);
      });
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketServices;
