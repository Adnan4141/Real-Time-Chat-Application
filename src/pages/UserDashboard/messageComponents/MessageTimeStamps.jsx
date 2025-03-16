import { BiCheck, BiCheckDouble } from "react-icons/bi"
import { formatMessageTime } from "../../../utils/formatMessageTime"

const MessageTimeStampsAndSeenIndicator = ({msg,user}) => {
  return (
   <div
   className={`flex items-center gap-1 mt-1 ${
     msg.senderId._id === user._id
       ? "justify-end"
       : "justify-start"
   }`}
 >
   <p className="text-xs text-gray-500">
     {formatMessageTime(msg.createdAt)}
   </p>
   {msg.senderId._id === user._id && (
     <span className="text-xs text-gray-500">
       {msg.seen ? (
         <BiCheckDouble className="inline-block" />
       ) : (
         <BiCheck className="inline-block" />
       )}
     </span>
   )}
 </div>
  )
}

export default MessageTimeStampsAndSeenIndicator
