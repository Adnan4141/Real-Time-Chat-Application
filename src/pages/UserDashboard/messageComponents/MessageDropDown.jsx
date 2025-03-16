import { AnimatePresence ,motion} from 'framer-motion'
import React from 'react'
import { BiDotsVertical } from 'react-icons/bi'

const MessageDropDownMenu = ({handleDeleteMessage,dropdownOpen,setDropdownOpen,msg}) => {
  return (
   <div className="relative">
   <button
     onClick={() =>
       setDropdownOpen(
         dropdownOpen === msg._id ? null : msg._id
       )
     }
     className="text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out"
   > 
     <BiDotsVertical className="text-xl" />
   </button>
     
   <AnimatePresence>
     {dropdownOpen === msg._id && (
       <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -10 }}
         className="absolute z-20 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-36 overflow-hidden"
       >
         <button
           className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition duration-200 ease-in-out"
           onClick={() => handleDeleteMessage(msg._id)}
         >
           Delete
         </button>
       </motion.div>
     )}
   </AnimatePresence>
 </div>
  )
}

export default MessageDropDownMenu
