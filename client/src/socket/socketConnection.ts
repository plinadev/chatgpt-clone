import { io, Socket } from "socket.io-client";
import {
  setConversations,
  type Conversation,
  type Message,
} from "../components/dashboard/dashboardSlice";
import { store } from "../store";

interface SessionData {
  sessionId: string;
  conversations: Conversation[];
}

let socket: Socket | null = null;

export const connectToSocketServer = (): void => {
  socket = io("http://localhost:4000");

  socket.on("connect", () => {
    console.log("successfully connected to socket.io server", socket?.id);

    //get session history
    socket?.emit("session-history", {
      sessionId: localStorage.getItem("sessionId"),
    });

    socket?.on("session-details", (data: SessionData) => {
      const { sessionId, conversations } = data;
      localStorage.setItem("sessionId", sessionId);

      store.dispatch(setConversations(conversations));
    });
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
