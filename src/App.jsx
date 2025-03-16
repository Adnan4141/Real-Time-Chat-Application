import "./app.css";


import MainRoute from "./routes/MainRoute";
import { socket, SocketContext } from "./socket/socket";

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <MainRoute />
    </SocketContext.Provider>
  );
};

export default App;
