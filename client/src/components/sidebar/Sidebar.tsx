import DeleteConversationsButton from "./DeleteConversationsButton";
import ListItem from "./ListItem";
import NewChatButton from "./NewChatButton";

function Sidebar() {
  return (
    <div className="sidebar_container">
      <NewChatButton />
      <ListItem title="History 1" />
      <ListItem title="History 2" />
      <ListItem title="History 3" />
      <ListItem title="History 4" />
      <ListItem title="History 5" />
      <ListItem title="History 6" />
      <DeleteConversationsButton />
    </div>
  );
}

export default Sidebar;
