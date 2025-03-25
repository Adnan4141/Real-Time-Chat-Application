import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useUpdateProfileMutation } from "../../../app/redux-rtk-query/userApiEndpoint";
import uploadPhotoInCloudinary from "../../../utils/uploadCloudinary";
import { toast } from "sonner";

const SettingModal = ({user, showSettings, setShowSettings }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    photo: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      let photoUrl = "";
      if (selectedFile) {
        const uploadResponse = await uploadPhotoInCloudinary(selectedFile);
        photoUrl= uploadResponse;
      }
      const result = await updateProfile({
        ...formData,
        photo:photoUrl || ""
      })
      if (result.data.success) {
        toast.success("Profile updated successfully!");
        setUser(result.user); 
        setShowSettings(false); 
      } else {
        toast.error(result.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSettings(false)} // Close on outside click
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white mx-5 md:m-0 rounded-lg shadow-2xl w-96 p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Update Profile
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>

            {/* Profile Update Form */}
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    // value={formData.username}
                    defaultValue={user?.username}
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    onChange={handleFileInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    accept="image/*"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingModal;
