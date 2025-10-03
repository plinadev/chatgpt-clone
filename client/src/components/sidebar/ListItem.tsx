import { BsChatLeft } from "react-icons/bs";

interface ListItemProps {
  title: string;
  chatId: string;
}
function ListItem({ title, chatId }: ListItemProps) {
  return (
    <div className="list_item" onClick={() => {}}>
      <div className="list_item_icon">
        <BsChatLeft color="white" />
      </div>
      <p className="list_item_text">{title}</p>
    </div>
  );
}

export default ListItem;
