import { useSelector } from "react-redux";
import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";
import LoadingSpinner from "./LoadingSpinner";
import type { RootState } from "../../store";

function Dashboard() {
  const sessionEstablished = useSelector(
    (state: RootState) => state.dashboard.sessionEstablished
  );
  return (
    <div className="dashboard_container">
      <Sidebar />
      <Chat />
      {!sessionEstablished && <LoadingSpinner />}
    </div>
  );
}

export default Dashboard;
