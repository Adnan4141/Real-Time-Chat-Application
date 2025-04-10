import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import SearchUser from "../DashboardComponents/SearchUser";
import { GiHamburgerMenu } from "react-icons/gi";
import { formatMessageTime } from "../../../utils/formatMessageTime";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutMutation } from "../../../app/redux-rtk-query/userApiEndpoint";
import useUserStore from "../../../app/zustard/userStore";

const Sidebar = ({
  isOpenSideMenu,
  setShowSettings,
  setIsOpenSideMenu,
  user,
  activeUsers,
  conversations,
  setSelectedConversation,
  selectedConversation,
}) => {
  const removeUserInfo = useUserStore((state) => state.removeUserInfo);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();


  


  const handleLogout = async () => {
    const response = await logout().unwrap();
    toast.success("Logout successfully");
    removeUserInfo();
    navigate("/login");
  };

  const truncateText = (text, maxLength, useWordBoundary = true) => {
    if (!text || text.length <= maxLength) return text;

    let truncated = text.slice(0, maxLength);
    if (useWordBoundary) {
      const lastSpace = truncated.lastIndexOf(" ");
      if (lastSpace !== -1) {
        truncated = truncated.slice(0, lastSpace);
      }
    }
    return truncated + "...";
  };

  return (
    <div
      className={`${
        isOpenSideMenu ? "w-72 " : "w-12 md:w-16 "
      } transition-all ease-in-out  absolute md:static  duration-300 bg-white shadow-2xl z-10 h-screen  flex flex-col justify-between py-6`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-1 md:px-4">
          <button
            onClick={() => setIsOpenSideMenu(!isOpenSideMenu)}
            className="p-2  rounded-full hover:bg-gray-100 transition-all"
          >
            {isOpenSideMenu ? (
              <AiOutlineClose className="text-2xl text-gray-700" />
            ) : (
              <GiHamburgerMenu className="text-2xl text-gray-700" />
            )}
          </button>
          {isOpenSideMenu && (
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photo}
              alt="User"
            />
          )}
        </div>
        <p className="font-semibold text-center my-2 text-lg">
          {isOpenSideMenu && user?.username}
        </p>

        {/* Search User */}
        {isOpenSideMenu && (
          <div className="px-4  mt-6">
            <SearchUser  />
          </div>
        )}

        {/* Conversations List */}
        {isOpenSideMenu && (
          <div className="mt-6">
            <h2 className="text-lg font-bold px-4 mb-4">Conversations</h2>
            <ul className="space-y-2">
  {conversations?.map((conv) => {
     
    const isOnline = activeUsers.includes(conv.otherUserId);
     const isSeen = conv.lastMessage.seen;
    
    return (
      <li
        key={conv._id}
        className={`flex capitalize overflow-hidden flex-col p-3 mx-2 rounded-lg cursor-pointer transition-all ${
          selectedConversation === conv._id
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            : "hover:bg-gray-100"
        }`}
        onClick={() => setSelectedConversation(conv._id)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="w-8 h-8 rounded-full"
              src={conv.otherUserPhoto}
              alt="Other User"
            />
            {/* Static online indicator */}
            {isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <p className="font-semibold flex items-center gap-2">
              {conv.otherUserName}
              {/* Alternative inline indicator */}
              {isOnline && (
                <span className="text-xs  font-bold text-green-500">(Online)</span>
              )}
            </p>
            <p
              className={`text-sm ${
                selectedConversation === conv._id
                  ? "text-white font-semibold"
                  : "text-gray-600"
              } line-clamp-1`}
            >
              {truncateText(conv?.lastMessage?.text, 20)}
            </p>
          </div>
        </div>
        <p className="text-right text-xs mt-1">
          {formatMessageTime(conv.lastConversion)}
        </p>
      </li>
    );
  })}
</ul>
          </div>
        )}
      </div>

      {/* Settings and Logout Buttons */}
      <div className="px-2 md:px-4 space-y-2">
        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg ${
            isOpenSideMenu
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-600 hover:bg-blue-700 rounded-full"
          } text-white transition-all`}
        >
          <AiOutlineSetting className="text-xl" />
          {isOpenSideMenu && <span className="text-sm">Settings</span>}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg ${
            isOpenSideMenu
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-600 hover:bg-red-700 rounded-full"
          } text-white transition-all`}
        >
          <AiOutlineLogout className="text-xl" />
          {isOpenSideMenu && <span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
