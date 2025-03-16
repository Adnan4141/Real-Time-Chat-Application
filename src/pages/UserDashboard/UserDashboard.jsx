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
import { useFetchConversionsListQuery } from "../../redux-rtk-query/chatApiEndpoint";
import { HashLoader } from "react-spinners";
import { useSearchUserQuery } from "../../redux-rtk-query/userApiEndpoint";
import SearchUser from "./DashboardComponents/SearchUser";
import { formatMessageTime } from "../../utils/formatMessageTime";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { RiChatSmile2Line } from "react-icons/ri";
import { SocketContext } from "../../socket/socket";
import Sidebar from "./sidebarComponent/Sidebar";
import SettingModal from "./sidebarComponent/SettingModal";

const UserDashboard = () => {
  const [conversations, setConversations] = useState([]);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [name, setName] = useState(""); // State for updated name
  const [photo, setPhoto] = useState(null); // State for updated photo
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
      socket.off("active_users", handleActiveUsers); // Clean up the event listener
    };
  }, [socket]);

  
  // Set user and conversations when data loads
  useEffect(() => {
    if (!isLoading && data) {
      setUser(data.user);
      setConversations(data.data);
      setName(data.user.username);
    }
  }, [data, isLoading]);

  // Socket listener for new messages (using a proper dependency array)
  useEffect(() => {
    if (!user) return; // Wait until user is defined

    const handleReceiverId = (receiverId) => {
      console.log("receiverId", receiverId.toString());
      if (receiverId.toString() === user?._id.toString()) {
         console.log("object")
      }
    };

    socket.on("receiver_id", handleReceiverId);

    return () => {
      socket.off("receiver_id", handleReceiverId);
    };
  }, [socket, user])

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data.user);
      setConversations(data.data);
      setName(data.user.username);
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
        {selectedConversation ? (
          <ChatWindow
            user={user}
            OtherUser={OtherUser}
            setSelectedConversation={setSelectedConversation}
            conversationId={selectedConversation}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-50 to-indigo-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-8 bg-white rounded-2xl shadow-2xl border border-purple-100"
            >
              {/* Icon or Illustration */}
              <div className="flex justify-center mb-6">
                <RiChatSmile2Line className="text-6xl text-purple-500" />
              </div>

              {/* Message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Select a Conversation
              </h2>
              <p className="text-gray-500 mb-6">
                Choose a conversation from the sidebar or start a new one to
                begin chatting.
              </p>

              {/* Call-to-Action Button */}
              <button
                onClick={() => {
                  // Add functionality to start a new conversation
                  toast.info("Start a new conversation feature coming soon!");
                }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
              >
                Start New Chat
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingModal {...{ showSettings, setShowSettings }} />
    </div>
  );
};

export default UserDashboard;
