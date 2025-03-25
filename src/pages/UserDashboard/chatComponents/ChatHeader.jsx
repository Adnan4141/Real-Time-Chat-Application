import { useContext, useState } from "react";
import {
  BiBlock,
  BiDotsHorizontalRounded,
  BiTrashAlt,
  BiBell,
  BiMessage,
} from "react-icons/bi";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const ChatHeader = ({
  OtherUser,
  user,
  handleDeleteConverions,
  activeUsers,
}) => {
 
  const [navDropdown, setNavDropDown] = useState(false);
  const [viewProfile, setViewProfile] = useState(false); 
  const isOnline = activeUsers.includes(OtherUser[0].otherUserId);


  const handleBlockContact = () => {
    toast.success("Contact blocked successfully!");
    setNavDropDown(false);
  };

  const toggleProfileView = () => {
    setViewProfile(!viewProfile);
  };

  return (
    <div className="w-full flex justify-between px-6 md:py-4 py-3 items-center h-16 md:h-20  bg-gradient-to-r from-purple-700 to-indigo-700 shadow-lg">
      {/* User Info Section */}
      <div className="flex gap-4 items-center">
        <div className="relative">
          <img
            className="md:h-12 md:w-12 w-10 h-10 rounded-full object-cover border-2 border-white"
            src={OtherUser[0]?.otherUserPhoto}
            alt={OtherUser[0]?.otherUserName}
          />
          {/* Online status dot */}
          {isOnline && (
            <span className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-gray-800"></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-white font-semibold text-xl capitalize">
            {OtherUser[0]?.otherUserName}
          </h4>
          {/* Optional text indicator */}
          {isOnline && (
            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
              Online
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
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
                  <span className="text-sm font-medium">
                    Delete Conversation
                  </span>
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
              <button
                onClick={toggleProfileView}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <img
                className="h-32 w-32 rounded-full object-cover border-2 border-gray-300"
                src={OtherUser[0]?.otherUserPhoto}
                alt={OtherUser[0]?.otherUserName}
              />
              <h3 className="mt-4 text-xl font-semibold">
                {OtherUser[0]?.otherUserName}
              </h3>
              <p className="mt-2 text-gray-600">Bio: {OtherUser[0]?.userBio}</p>
              <p className="mt-2 text-gray-500">
                Joined: {OtherUser[0]?.userJoinedDate}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
