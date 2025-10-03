import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard_container">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Dashboard;
