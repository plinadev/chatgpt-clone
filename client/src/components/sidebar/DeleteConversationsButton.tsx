import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteConversations as deleteConversationsFromStore } from "../dashboard/dashboardSlice";
import { deleteConversations } from "../../socket/socketConnection";

function DeleteConversationsButton() {
  const dispatch = useDispatch();
  const handleDeleteConversations = () => {
    dispatch(deleteConversationsFromStore());
    deleteConversations();
  };
  return (
    <div
      className="list_item delete_conv_button"
      onClick={handleDeleteConversations}
    >
      <div className="list_item_icon">
        <AiOutlineDelete color="white" />
      </div>
      <p className="list_item_text">Delete Chat History</p>
    </div>
  );
}

export default DeleteConversationsButton;
