import { useDispatch, useSelector } from "react-redux";
import DeleteConversationsButton from "./DeleteConversationsButton";
import ListItem from "./ListItem";
import NewChatButton from "./NewChatButton";
import {
  setSelectedConversationId,
  type Conversation,
} from "../dashboard/dashboardSlice";
import type { RootState } from "../../store";

function Sidebar() {
  const dispatch = useDispatch();
  const conversations: Conversation[] = useSelector(
    (state: RootState) => state.dashboard.conversations
  );

  const handleSetSelectedChat = (id: string) => {
    dispatch(setSelectedConversationId(id));
  };
  return (
    <div className="sidebar_container">
      <NewChatButton handleSetSelectedChat={handleSetSelectedChat} />
      {conversations.map((conversation) => (
        <ListItem
          key={conversation.id}
          title={conversation.messages[0].content}
          chatId={conversation.id}
        />
      ))}
      <DeleteConversationsButton />
    </div>
  );
}

export default Sidebar;
