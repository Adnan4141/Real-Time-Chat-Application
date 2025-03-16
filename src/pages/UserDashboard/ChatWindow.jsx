import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./chatComponents/ChatHeader";
import { ChatInput } from "./chatComponents/ChatInput";
import { ChatMessages } from "./chatComponents/ChatMessages";
import {
  useDeleteConversionMutation,
  useSendMessageMutation,
} from "../../redux-rtk-query/chatApiEndpoint";
import { HashLoader } from "react-spinners";

const ChatWindow = ({ conversationId,setSelectedConversation, user, OtherUser }) => {
  const [deleteConversion] = useDeleteConversionMutation();
  const [sendMessage,{isLoading:isUploading,error:sendMessageError}] = useSendMessageMutation();
  const [isPhotoUploading,SetIsPhotoUploading] = useState();
  const [uploadProgress,setUploadProgress] = useState(0);
  const messagesEndRef = useRef(null);

  const handleDeleteConverions = async () => {
    await deleteConversion(conversationId);
    setSelectedConversation(null)
    // refetch();
  };

 
 
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-4">
      {/* Chat Header */}


     <ChatHeader
        handleDeleteConverions={handleDeleteConverions}
        OtherUser={OtherUser}
      />

      {/* Chat Messages */}
      <div className="flex flex-col-reverse flex-grow overflow-y-auto py-4 px-3 space-y-4 bg-white rounded-lg shadow-md">
        <ChatMessages
          user={user}
          uploadProgress={uploadProgress}
          isPhotoUploading={isPhotoUploading}
          conversationId={conversationId}
          phot
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Chat Input */}
      <ChatInput
       setUploadProgress={setUploadProgress}
       uploadProgress={uploadProgress}
       sendMessage={sendMessage}
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
