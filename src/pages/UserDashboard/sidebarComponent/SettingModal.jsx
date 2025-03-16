import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SettingModal = ({showSettings,setShowSettings}) => {
    
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", name);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch(`${baseUrl}/user/update-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Profile updated successfully!");
        setUser(result.user); // Update user data in state
        setShowSettings(false); // Close settings modal
      } else {
        toast.error(result.message || "Failed to update profile");
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowSettings(false)} // Close on outside click
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-lg shadow-2xl w-96 p-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Update Profile</h2>
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Profile Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
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
  )
}

export default SettingModal
