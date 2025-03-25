import { useContext, useEffect, useRef, useState } from "react";
import { ChatHeader } from "./chatComponents/ChatHeader";
import { ChatInput } from "./chatComponents/ChatInput";
import { ChatMessages } from "./chatComponents/ChatMessages";
import {
  useDeleteConversionMutation,
  useSendMessageMutation,
} from "../../app/redux-rtk-query/chatApiEndpoint";
import { HashLoader } from "react-spinners";
import {  SocketContext } from "../../socket/socket";


const ChatWindow = ({ conversationId,activeUsers,setSelectedConversation, user, OtherUser }) => {
  const [deleteConversion] = useDeleteConversionMutation();
  const [sendMessage,{isLoading:isUploading,error:sendMessageError}] = useSendMessageMutation();
  const [isPhotoUploading,SetIsPhotoUploading] = useState();
  const [uploadProgress,setUploadProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const [participants,setParticipants] = useState(); 
  const socket = useContext(SocketContext)
  const handleDeleteConverions = async () => {
    await deleteConversion(conversationId);
    setSelectedConversation(null)
    // refetch();
  };
  const SendMessageBySocket = (data)=>{
    const receiverId = participants?.filter(chatUser=>chatUser!=user._id.toString())[0]
    socket.emit("send_message",{
      ...data,
      receiverId
    })
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 ">
      {/* Chat Header */}


     <ChatHeader
        handleDeleteConverions={handleDeleteConverions}
        OtherUser={OtherUser}
        activeUsers={activeUsers}
        user={user}
      />

      {/* Chat Messages */}
      <div className="flex flex-col-reverse flex-grow overflow-y-auto py-4 px-3 space-y-4 bg-white rounded-lg shadow-md">
        <ChatMessages
          user={user}
          uploadProgress={uploadProgress}
          isPhotoUploading={isPhotoUploading}
          conversationId={conversationId}
          messagesEndRef={messagesEndRef}
          setParticipants={setParticipants}
        />
      </div>

      {/* Chat Input */}
      <ChatInput
       setUploadProgress={setUploadProgress}
       uploadProgress={uploadProgress}
       sendMessage={sendMessage}
       SendMessageBySocket={SendMessageBySocket}
       SetIsPhotoUploading={SetIsPhotoUploading}
       isUploading={isUploading}
       sendMessageError={sendMessageError}
        conversationId={conversationId}
       messagesEndRef ={messagesEndRef}
      />
    </div>
  );
};

export default ChatWindow;
