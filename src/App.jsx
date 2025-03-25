import axios from "axios";
import "./App.css";
import MainRoute from "./routes/MainRoute";
import {  SocketProvider } from "./socket/socket";
import { baseUrl } from "./utils/BaseUrl";
import { useEffect } from "react";
import useUserStore from "./app/zustard/userStore";


const App = () => {
   const user = useUserStore(state=>state?.user);
   const userId = user?._id ;


  return (
    <SocketProvider userId={userId}>
      <MainRoute />
    </SocketProvider>
  );
};

export default App;
