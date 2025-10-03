import { useSelector } from "react-redux";
import Message from "./Message";
import type { RootState } from "../../store";

function Messages() {
  const { selectedConversationId, conversations } = useSelector(
    (state: RootState) => state.dashboard
  );

  const conversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );

  return (
    <div className="chat_messages_container">
      {conversation?.messages.map((message, idx) => (
        <Message
          key={message.id}
          content={message.content}
          aiMessage={message.aiMessage}
          animate={
            idx === conversation.messages.length - 1 && message.aiMessage
          }
        />
      ))}
    </div>
  );
}

export default Messages;
