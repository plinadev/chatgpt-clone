import { BsChatLeft } from "react-icons/bs";

interface ListItemProps {
  title: string;
}
function ListItem({ title }: ListItemProps) {
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
