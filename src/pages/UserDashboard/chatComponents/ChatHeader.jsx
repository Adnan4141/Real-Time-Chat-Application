import { useContext, useState } from "react";
import { BiBlock, BiDotsHorizontalRounded, BiTrashAlt, BiBell, BiMessage } from "react-icons/bi";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { socket, SocketContext } from "../../../socket/socket";

export const ChatHeader = ({ OtherUser, handleDeleteConverions }) => {
  const socket = useContext(SocketContext);
  const [navDropdown, setNavDropDown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [viewProfile, setViewProfile] = useState(false); // State to control profile view visibility
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New message from John", read: false },
    { id: 2, text: "You have a new friend request", read: true },
  ]);

  
  useEffect(() => {
    const handleActiveUsers = (users) => {
      setActiveUsers(users); 
        // console.log(users)
        // console.log("other",OtherUser[0])
    };

    socket.on("active_users", handleActiveUsers);

    return () => {
      socket.off("active_users", handleActiveUsers);
    };
  }, [socket]);



  
  const handleBlockContact = () => {
    toast.success("Contact blocked successfully!");
    setNavDropDown(false); // Close dropdown after action
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared!");
  };

  const toggleProfileView = () => {
    setViewProfile(!viewProfile);
  };


  return (
    <div className="w-full flex justify-between px-6 py-4 items-center h-20 bg-gradient-to-r from-purple-700 to-indigo-700 shadow-lg">
      {/* User Info Section */}
      <div className="flex gap-4 items-center">
        <img
          className="h-12 w-12 rounded-full object-cover border-2 border-white"
          src={OtherUser[0]?.otherUserPhoto}
          alt={OtherUser[0]?.otherUserName}
        />
        <h4 className="text-white font-semibold text-xl capitalize">{OtherUser[0]?.otherUserName}</h4>
      </div>

      {/* Notification and Settings Dropdown */}
      <div className="flex items-center gap-6">
        {/* Notification Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationDropdown(!notificationDropdown)}
            className="text-white text-2xl cursor-pointer hover:text-teal-300 transition duration-200 ease-in-out relative"
          >
            <BiBell />
            {notifications.some((notification) => !notification.read) && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationDropdown && (
            <div className="bg-white absolute z-20 right-0 rounded-lg mt-2 shadow-xl w-64 overflow-hidden animate__animated animate__fadeIn animate__faster">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`py-3 px-4 flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out ${
                        notification.read ? "opacity-75" : "bg-gray-50"
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <span className="text-sm">{notification.text}</span>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="py-3 px-4 text-sm text-gray-500">No new notifications</li>
                )}
              </ul>
              {notifications.length > 0 && (
                <div className="p-2 border-t border-gray-200">
                  <button
                    onClick={clearAllNotifications}
                    className="w-full text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNavDropDown(!navDropdown)}
            className="text-white text-2xl cursor-pointer hover:text-teal-300 transition duration-200 ease-in-out"
          >
            <BiDotsHorizontalRounded />
          </button>

          {/* Settings Dropdown Menu */}
          {navDropdown && (
            <div className="bg-white absolute z-20 right-0 rounded-lg mt-2 shadow-xl w-64 overflow-hidden animate__animated animate__fadeIn animate__faster">
              <ul className="flex flex-col">
                {/* View Profile Option */}
                <li
                  onClick={toggleProfileView}
                  className="py-3 px-4 flex gap-3 items-center text-gray-700 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <BiMessage className="text-xl text-green-600" />
                  <span className="text-sm font-medium">View Profile</span>
                </li>

                {/* Delete Conversation Option */}
                <li
                  onClick={() => {
                    handleDeleteConverions();
                    setNavDropDown(false); // Close dropdown after action
                  }}
                  className="py-3 px-4 flex gap-3 items-center text-gray-700 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <BiTrashAlt className="text-xl text-red-600" />
                  <span className="text-sm font-medium">Delete Conversation</span>
                </li>

                {/* Block Contact Option */}
                <li
                  onClick={handleBlockContact}
                  className="py-3 px-4 flex gap-3 items-center text-gray-700 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
                >
                  <BiBlock className="text-xl text-purple-600" />
                  <span className="text-sm font-medium">Block Contact</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Profile View Section */}
      {viewProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white bg-opacity-90 z-30 flex justify-center items-center"
        >
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">User Profile</h2>
              <button onClick={toggleProfileView} className="text-gray-500 hover:text-gray-700">
                Close
              </button>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <img
                className="h-32 w-32 rounded-full object-cover border-2 border-gray-300"
                src={OtherUser[0]?.otherUserPhoto}
                alt={OtherUser[0]?.otherUserName}
              />
              <h3 className="mt-4 text-xl font-semibold">{OtherUser[0]?.otherUserName}</h3>
              <p className="mt-2 text-gray-600">Bio: {OtherUser[0]?.userBio}</p>
              <p className="mt-2 text-gray-500">Joined: {OtherUser[0]?.userJoinedDate}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
