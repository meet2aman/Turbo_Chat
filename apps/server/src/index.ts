import http from "http";
import SocketServices from "./services/socket";

(async function () {
  const socketServices = new SocketServices();
  const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  socketServices.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`HTTP Server listening on ${PORT}`);
  });
  socketServices.initListeners();
})();
