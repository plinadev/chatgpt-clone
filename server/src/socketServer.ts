import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { v4 as uuid } from "uuid";
import openai from "./openai.config";

interface Message {
  id: string;
  content: string;
  aiMessage: boolean;
  animate?: boolean;
}

interface Conversation {
  id: string;
  messages: Message[];
}

interface SessionHistory {
  sessionId: string;
}

interface ConversationMessageData {
  sessionId: string;
  message: Message;
  conversationId: string;
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

    socket.on("conversation-message", (data: ConversationMessageData) => {
      conversationMessageHandler(socket, data);
    });

    socket.on(
      "conversations-delete",
      ({ sessionId }: { sessionId: string }) => {
        conversationDeleteHandler(socket, sessionId);
      }
    );
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
    socket.emit("session-details", {
      sessionId: newSessionId,
      conversations: [],
    });
  }
};

const conversationMessageHandler = async (
  socket: Socket,
  data: ConversationMessageData
) => {
  const { sessionId, message, conversationId } = data;

  if (!sessions[sessionId]) return;

  const conversation = sessions[sessionId].find((c) => c.id === conversationId);

  const previousConversationMessages: {
    role: "user" | "assistant";
    content: string;
  }[] = [];

  if (conversation) {
    previousConversationMessages.push(
      ...conversation.messages.map((m: Message) => ({
        role: (m.aiMessage ? "assistant" : "user") as "user" | "assistant",
        content: m.content,
      }))
    );
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...previousConversationMessages,
      { role: "user", content: message.content },
    ],
  });
  const aiMessageContent =
    response.choices[0].message.content ||
    "Can't answer your question right now. Try again later...";

  const aiMessage: Message = {
    id: uuid(),
    content: aiMessageContent,
    aiMessage: true,
  };

  if (!conversation) {
    // create new conversation if it doesn't exist
    sessions[sessionId].push({
      id: conversationId,
      messages: [message, aiMessage],
    });
    socket.emit("conversation-details", {
      id: conversationId,
      messages: [message, aiMessage],
    });
    return;
  }

  // append messages to existing conversation
  conversation.messages.push(message, aiMessage);
  socket.emit("conversation-details", conversation);
};

const conversationDeleteHandler = (socket: Socket, sessionId: string) => {
  if (sessions[sessionId]) {
    sessions[sessionId] = [];
  }
};
export default registerSocketServer;
