import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

const registerSocketServer = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("user connected:", socket.id);
  });
};

export default registerSocketServer;
