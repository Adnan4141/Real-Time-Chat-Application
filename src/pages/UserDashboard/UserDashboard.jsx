import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect, useContext } from "react";
import ChatWindow from "./ChatWindow";
import { baseUrl } from "../../utils/BaseUrl";
import { useNavigate } from "react-router-dom";
import { useFetchConversionsListQuery } from "../../app/redux-rtk-query/chatApiEndpoint";
import { HashLoader } from "react-spinners";
import { useSearchUserQuery } from "../../app/redux-rtk-query/userApiEndpoint";
import SearchUser from "./DashboardComponents/SearchUser";
import { formatMessageTime } from "../../utils/formatMessageTime";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { RiChatSmile2Line } from "react-icons/ri";
import { SocketContext } from "../../socket/socket";
import Sidebar from "./sidebarComponent/Sidebar";
import SettingModal from "./sidebarComponent/SettingModal";
import useUserStore from "../../app/zustard/userStore";
import ChooseConversion from "./DashboardComponents/ChooseConversion";
import FetchError from "./DashboardComponents/FetchError";

const UserDashboard = () => {
  const [conversations, setConversations] = useState([]);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const user = useUserStore(state=>state.user)
  const [showSettings, setShowSettings] = useState(false);

  const { data, isLoading, error, refetch } = useFetchConversionsListQuery();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [activeUsers, setActiveUsers] = useState([]);

  const OtherUser = conversations?.filter(
    (item) => item._id === selectedConversation
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpenSideMenu(true);
      } else {
        setIsOpenSideMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleActiveUsers = (users) => {
      setActiveUsers(users); 
    };
    socket.on("active_users", handleActiveUsers);
    return () => {
      socket.off("active_users", handleActiveUsers); 
    };
  }, [socket]);

  

  useEffect(() => {
    if (!isLoading && data) {
      setConversations(data.data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!user) return; 
    const handleReceiverId = (receiverId) => {
      if (receiverId.toString() == user?._id.toString()) {
         refetch()
      }
    };
    socket.on("receiver_id", handleReceiverId);

    return () => {
      socket.off("receiver_id", handleReceiverId);
    };
  }, [socket, user])

  useEffect(() => {
    if (!isLoading && data) {
      setConversations(data.data);
      if (data.user?._id) {
        socket.emit("user_login", data.user._id);
      }
    }

  }, [data, isLoading,socket]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-indigo-900">
        <HashLoader color="#ffffff" size={50} />
      </div>
    );
  }



  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-purple-50 to-indigo-50">
      {/* Sidebar */}

      <Sidebar
        {...{
          isOpenSideMenu,
          setSelectedConversation,
          setShowSettings,
          setIsOpenSideMenu,
          user,
          conversations,
          selectedConversation,
        }}
      />
  

      {/* Chat Window */}
      <div className="flex-1 bg-white rounded-l-lg shadow-lg overflow-hidden">
        {!error && !isLoading && 
        selectedConversation && (
          <ChatWindow
            user={user}
            OtherUser={OtherUser}
            setSelectedConversation={setSelectedConversation}
            conversationId={selectedConversation}
          />
        ) }

        {!error && !isLoading && 
        !selectedConversation && (
          <ChooseConversion/>
        ) }
        

           {/* Error component*/}
      { error && !isLoading && 
      <FetchError refetch={refetch} error={error}/>
      }
      </div>

   

      {/* Settings Modal */}
      <SettingModal {...{ user, showSettings, setShowSettings }} />
    </div>
  );
};

export default UserDashboard;
