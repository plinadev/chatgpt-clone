import { AiOutlinePlus } from "react-icons/ai";

interface NewChatButtonProps {
  handleSetSelectedChat: (state: string) => void;
}
function NewChatButton({ handleSetSelectedChat }: NewChatButtonProps) {
  return (
    <div
      className="new_chat_button"
      onClick={() => handleSetSelectedChat("new")}
    >
      <div className="new_chat_button_icon">
        <AiOutlinePlus />
      </div>
      <p className="new_chat_button_text">New Chat</p>
    </div>
  );
}

export default NewChatButton;
