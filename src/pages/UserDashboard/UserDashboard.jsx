import { useState, useEffect, useContext } from "react";
import ChatWindow from "./ChatWindow";
import { useNavigate } from "react-router-dom";
import { useFetchConversionsListQuery } from "../../app/redux-rtk-query/chatApiEndpoint";
import { HashLoader } from "react-spinners";
import { SocketContext, useSocket } from "../../socket/socket";
import Sidebar from "./sidebarComponent/Sidebar";
import SettingModal from "./sidebarComponent/SettingModal";
import useUserStore from "../../app/zustard/userStore";
import ChooseConversion from "./DashboardComponents/ChooseConversion";
import FetchError from "./DashboardComponents/FetchError";

const UserDashboard = () => {
  const [conversations, setConversations] = useState([]);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const user = useUserStore((state) => state.user);
  const [showSettings, setShowSettings] = useState(false);
  const { data, isLoading, error, refetch } = useFetchConversionsListQuery();
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const socket = useSocket();

  const OtherUser = conversations?.filter(
    (item) => item._id === selectedConversation
  );

  useEffect(() => {
    if (!socket) return;
    const handleOnlineUsers = (data) => {
      setActiveUsers(data);
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
    };

  }, [user?._id,socket]);

  useEffect(() => {
    if (!isLoading && data) {
      setConversations(data.data);
    }
  }, [data, isLoading]);



  useEffect(() => {
    if (!user || !socket) return;
  
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
    }
  }, [data, isLoading, socket]);

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
          activeUsers,
          setSelectedConversation,
          setShowSettings,
          setIsOpenSideMenu,
          user,
          conversations,
          selectedConversation,
        }}
      />

      {/* Chat Window */}
      <div className="flex-1 ml-12 md:ml-0 bg-white rounded-l-lg shadow-lg overflow-hidden">
        {!error && !isLoading && selectedConversation && (
          <ChatWindow
            user={user}
            OtherUser={OtherUser}
            activeUsers={activeUsers}
            setSelectedConversation={setSelectedConversation}
            conversationId={selectedConversation}
          />
        )}

        {!error && !isLoading && !selectedConversation && <ChooseConversion />}

        {/* Error component*/}
        {error && !isLoading && <FetchError refetch={refetch} error={error} />}
      </div>

      {/* Settings Modal */}
      <SettingModal {...{ user, showSettings, setShowSettings }} />
    </div>
  );
};

export default UserDashboard;
