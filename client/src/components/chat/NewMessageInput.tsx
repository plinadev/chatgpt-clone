import { BsSend } from "react-icons/bs";

function NewMessageInput() {
  return (
    <div className="new_message_input_container">
      <input
        type="text"
        className="new_message_input"
        placeholder="Type your question..."
        value=""
        onChange={() => {}}
        onKeyDown={() => {}}
      />
      <div className="new_message_icon_container" onClick={() => {}}>
        <BsSend color="grey" />
      </div>
    </div>
  );
}

export default NewMessageInput;
