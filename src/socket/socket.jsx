import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";
export const SocketContext = createContext(null);


export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    if (!userId) return;
    const socketInstance = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      query: { userId },
    });

  
    setSocket(socketInstance)
     
   return ()=>{
    if (socketInstance.connected) {
      socketInstance.disconnect();
    }
      setSocket(null)
   }

  },[userId]);

  return (
   <SocketContext.Provider value={socket} >{children}</SocketContext.Provider>
  )

};

export const useSocket = ()=>{
    return useContext(SocketContext)
}


// export const SocketContext = createContext(initializeSocket());
