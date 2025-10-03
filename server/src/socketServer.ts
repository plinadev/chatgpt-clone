import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
interface Message {
  id: string;
  content: string;
  aiMessage: boolean;
  animate: boolean;
}

const registerSocketServer = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("user connected:", socket.id);

    socket.on("conversation-message", (data: Message) => {
      conversationMessageHandler(socket, data);
    });
  });
};

const conversationMessageHandler = (socket: Socket, data: Message) => {
  console.log("message data: ", data);
};
export default registerSocketServer;
