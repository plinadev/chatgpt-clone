import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import type { RootState } from "../../store";
import {
  addMessage,
  setSelectedConversationId,
  type Conversation,
  type Message,
} from "../dashboard/dashboardSlice";
import { sendConversationMessage } from "../../socket/socketConnection";

function NewMessageInput() {
  const [content, setContent] = useState<string>("");
  const dispatch = useDispatch();
  const selectedConversationId = useSelector(
    (state: RootState) => state.dashboard.selectedConversationId
  );

  const conversations = useSelector(
    (state: RootState) => state.dashboard.conversations
  );

  const selectedConversation = conversations.find(
    (c: Conversation) => c.id === selectedConversationId
  );

  const handleSendMessage = (): void => {
    if (!content.length) return;

    const message: Message = {
      aiMessage: false,
      content,
      id: uuid(),
      animate: false,
    };

    const conversationId =
      selectedConversationId === "new" ? uuid() : selectedConversationId;

    if (!conversationId) return;

    // append this message to local store
    dispatch(
      addMessage({
        conversationId,
        message,
      })
    );

    dispatch(setSelectedConversationId(conversationId));

    // send message to the server

    sendConversationMessage({ message, conversationId });

    setContent(""); // reset input
  };

  const handleKeyPressed = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.code === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="new_message_input_container">
      <input
        type="text"
        className="new_message_input"
        placeholder="Type your question..."
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        onKeyDown={handleKeyPressed}
        disabled={
          selectedConversation &&
          !selectedConversation.messages[
            selectedConversation.messages.length - 1
          ].aiMessage
        }
      />
      <div className="new_message_icon_container" onClick={handleSendMessage}>
        <BsSend color="grey" />
      </div>
    </div>
  );
}

export default NewMessageInput;
