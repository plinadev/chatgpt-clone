import { io, Socket } from "socket.io-client";
import {
  setConversations,
  setConversationHistory,
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

    socket?.on("conversation-details", (conversation: Conversation) => {
      store.dispatch(setConversationHistory(conversation));
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

  socket.emit("conversation-message", {
    sessionId: localStorage.getItem("sessionId"),
    message,
    conversationId,
  });
};

export const deleteConversations = () => {
  socket?.emit("conversations-delete", {
    sessionId: localStorage.getItem("sessionId"),
  });
};
