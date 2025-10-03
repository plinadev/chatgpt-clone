import { createSlice } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  content: string;
  aiMessage: boolean;
  animate: boolean;
}

export interface Conversation {
  id: string;
  messages: Message[];
}

interface DashboardState {
  sessionEstablished: boolean;
  selectedConversationId: string | null;
  conversations: Conversation[];
}

const initialState: DashboardState = {
  sessionEstablished: false,
  conversations: [],
  selectedConversationId: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    },
    addMessage: (state, action) => {
      const { message, conversationId } = action.payload;
      const conversation = state.conversations.find(
        (c) => c.id === conversationId
      );

      if (conversation) conversation.messages.push(message);
      else
        state.conversations.push({
          id: conversationId,
          messages: [message],
        });
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.sessionEstablished = true;
    },
  },
});
export const { setSelectedConversationId, addMessage, setConversations } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
