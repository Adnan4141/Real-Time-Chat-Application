import { motion } from "framer-motion";
import React from "react";

const MessageSkeleton = ({ sidebarWidth,uploadProgress, hasPhoto = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 relative flex justify-end"
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          {/* Skeleton for Message Content */}
          <div
            className="relative w-full"
            style={{
              maxWidth: `calc(100% - ${sidebarWidth}px)`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white inline-block py-3 px-6 rounded-xl shadow-xl backdrop-blur-sm backdrop-filter bg-opacity-90 w-full"
            >
              {/* Skeleton for Photo */}
              {uploadProgress && (
                <div className="w-[200px] h-[150px] bg-gray-300 animate-pulse rounded-lg mb-2 relative flex items-center justify-center">
                  {/* Percentage Indicator */}
                  <span className="text-white text-sm font-medium z-10">
                    {uploadProgress}% {/* Replace this with dynamic value if needed */}
                  </span>
                  {/* Overlay for better visibility of the percentage */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
                </div>
              )}

              {/* Skeleton for Text */}
              <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
            </motion.div>

            {/* Skeleton for Timestamp */}
            <div className="flex justify-end mt-1">
              <div className="w-16 h-3 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>

          {/* Skeleton for User Photo */}
          <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageSkeleton;
