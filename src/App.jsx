import axios from "axios";
import "./app.css";
import MainRoute from "./routes/MainRoute";
import { socket, SocketContext } from "./socket/socket";
import { baseUrl } from "./utils/BaseUrl";
import { useEffect } from "react";

const App = () => {

  return (
    <SocketContext.Provider value={socket}>
      <MainRoute />
    </SocketContext.Provider>
  );
};

export default App;
