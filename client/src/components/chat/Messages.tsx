import Message from "./Message";

function Messages() {
  return (
    <div className="chat_messages_container">
      <Message aiMessage={false} content="Hello AI" animate={false} />
      <Message aiMessage={true} content="How can i help you?" animate={true} />
    </div>
  );
}

export default Messages;
