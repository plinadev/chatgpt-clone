import { BsChatLeft } from "react-icons/bs";

interface ListItemProps {
  title: string;
  conversationId: string;
  handleSetSelectedChat: (id: string) => void;
}
function ListItem({
  title,
  conversationId,
  handleSetSelectedChat,
}: ListItemProps) {
  return (
    <div
      className="list_item"
      onClick={() => handleSetSelectedChat(conversationId)}
    >
      <div className="list_item_icon">
        <BsChatLeft color="white" />
      </div>
      <p className="list_item_text">{title}</p>
    </div>
  );
}

export default ListItem;
