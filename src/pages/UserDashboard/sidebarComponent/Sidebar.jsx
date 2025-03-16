import {
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import SearchUser from "../DashboardComponents/SearchUser";
import { GiHamburgerMenu } from "react-icons/gi";
import { formatMessageTime } from "../../../utils/formatMessageTime";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpenSideMenu,setShowSettings, setIsOpenSideMenu,user,conversations,setSelectedConversation,selectedConversation}) => {
  const navigate = useNavigate()


 const handleLogout = () => {
    localStorage.removeItem("token");
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
        isOpenSideMenu ? "w-72 fixed md:static" : "w-16"
      } transition-all ease-in-out duration-300 bg-white shadow-2xl z-10 h-screen flex flex-col justify-between py-6`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4">
          <button
            onClick={() => setIsOpenSideMenu(!isOpenSideMenu)}
            className="p-2 rounded-full hover:bg-gray-100 transition-all"
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

        {/* Search User */}
        {isOpenSideMenu && (
          <div className="px-4 mt-6">
            <SearchUser />
          </div>
        )}

        {/* Conversations List */}
        {isOpenSideMenu && (
          <div className="mt-6">
            <h2 className="text-lg font-bold px-4 mb-4">Conversations</h2>
            <ul className="space-y-2">
              {conversations?.map((conv) => (
                <li
                  key={conv._id}
                  className={`flex capitalize overflow-hidden  flex-col p-3 mx-2 rounded-lg cursor-pointer transition-all ${
                    selectedConversation === conv._id
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedConversation(conv._id)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={conv.otherUserPhoto}
                      alt="Other User"
                    />
                    <div>
                      <p className="font-semibold">{conv.otherUserName}</p>
                      <p className={`text-sm  ${selectedConversation === conv._id?"text-white font-semibold text-sm":""} text-gray-600 line-clamp-1`}>
                        {truncateText(conv?.lastMessage?.text,20)}
                      </p>
                    </div>
                  </div>
                  <p className="text-right text-xs mt-1">
                    {formatMessageTime(conv.lastConversion)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Settings and Logout Buttons */}
      <div className="px-4 space-y-2">
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
