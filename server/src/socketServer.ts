import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { v4 as uuid } from "uuid";

interface Message {
  id: string;
  content: string;
  aiMessage: boolean;
  animate: boolean;
}

interface Conversation {
  id: string;
  messages: Message[];
}

interface SessionHistory {
  sessionId: string;
}

// sessions object: keys are sessionId, values are arrays of Conversation
let sessions: Record<string, Conversation[]> = {};

const registerSocketServer = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("user connected:", socket.id);

    socket.on("session-history", (data: SessionHistory) => {
      sessionHistoryHandler(socket, data);
    });

    socket.on("conversation-message", (data: Message) => {
      conversationMessageHandler(socket, data);
    });
  });
};

const sessionHistoryHandler = (socket: Socket, data: SessionHistory): void => {
  const { sessionId } = data;

  if (sessions[sessionId]) {
    // send existing session data back to user
    socket.emit("session-details", {
      sessionId,
      conversations: sessions[sessionId],
    });
  } else {
    const newSessionId = uuid();
    sessions[newSessionId] = [];
    const sessionDetails = {
      sessionId: newSessionId,
      conversations: [] as Conversation[],
    };
    socket.emit("session-details", sessionDetails);
  }
};

const conversationMessageHandler = (socket: Socket, data: Message): void => {
  console.log("message data: ", data);
};

export default registerSocketServer;
