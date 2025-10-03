import { useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { connectToSocketServer } from "./socket/socketConnection";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  useEffect(() => {
    connectToSocketServer();
  }, []);
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
