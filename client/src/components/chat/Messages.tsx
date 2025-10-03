import { useSelector } from "react-redux";
import Message from "./Message";
import type { RootState } from "../../store";
import { useEffect, useRef } from "react";

function Messages() {
  const { selectedConversationId, conversations } = useSelector(
    (state: RootState) => state.dashboard
  );

  const conversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [conversation?.messages]);
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
      <div ref={scrollRef}></div>
    </div>
  );
}

export default Messages;
