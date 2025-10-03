import { io, Socket } from "socket.io-client";
import type { Message } from "../components/dashboard/dashboardSlice";

let socket: Socket | null = null;

export const connectToSocketServer = (): void => {
  socket = io("http://localhost:4000");

  socket.on("connect", () => {
    console.log("successfully connected to socket.io server", socket?.id);
  });
};

export const sendConversationMessage = ({
  message,
  conversationId,
}: {
  message: Message;
  conversationId: string;
}): void => {
  if (!socket) return;

  socket.emit("conversation-message", { message, conversationId });
};
