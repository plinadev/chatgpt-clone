import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";

function ChatLogo() {
  return (
    <div className="chat_gpt_logo_container">
      <p className="chat_gpt_logo">ChatGPT Clone</p>
    </div>
  );
}
function Chat() {
  return (
    <div className="chat_container">
      <div className="chat_selected_container">
        <Messages />
        <NewMessageInput />
      </div>
    </div>
  );
}

export default Chat;
