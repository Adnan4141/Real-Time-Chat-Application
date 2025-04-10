import React from 'react'
import { motion } from 'framer-motion';
import { RiChatSmile2Line } from 'react-icons/ri';
import { toast } from 'sonner';

const ChooseConversion = () => {
  return (
   <div className="flex px-5 items-center justify-center h-full bg-gradient-to-r from-purple-50 to-indigo-50">
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


   </motion.div>
 </div>
  )
}

export default ChooseConversion
