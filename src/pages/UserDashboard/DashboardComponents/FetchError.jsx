import React from 'react';
import { motion } from 'framer-motion';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast } from 'sonner';

const FetchError = ({error,refetch}) => {
   
   const handleOnRetry = ()=>{
      refetch()
   }


  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-red-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-white rounded-2xl shadow-2xl border border-red-100"
      >
        {/* Icon or Illustration */}
        <div className="flex justify-center mb-6">
          <RiErrorWarningLine className="text-6xl text-red-500" />
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          { error?(error.meesage ||error.status) :"Oops! Something Went Wrong"}
          
        </h2>
        <p className="text-gray-500 mb-6">
          We couldn't load the data. Please check your connection and try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={() => {
            handleOnRetry();
            toast.info("Retrying...");
          }}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
        >
          Retry
        </button>
      </motion.div>
    </div>
  );
};

export default FetchError;