import { useSelector } from "react-redux";
import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";
import type { RootState } from "../../store";

function ChatLogo() {
  return (
    <div className="chat_gpt_logo_container">
      <p className="chat_gpt_logo">ChatGPT Clone</p>
    </div>
  );
}
function Chat() {
  const selectedConversationId = useSelector(
    (state: RootState) => state.dashboard.selectedConversationId
  );
  return (
    <div className="chat_container">
      {!selectedConversationId ? (
        <ChatLogo />
      ) : (
        <div className="chat_selected_container">
          <Messages />
          <NewMessageInput />
        </div>
      )}
    </div>
  );
}

export default Chat;
