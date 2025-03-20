import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatMessageTime } from "../../../utils/formatMessageTime";
import { BiDotsVertical, BiCheck, BiCheckDouble } from "react-icons/bi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeleteMessageMutation,
  useFetchConversionsListQuery,
  useFetchMessagesQuery,
  useMarkMessagesAsSeenMutation,
} from "../../../app/redux-rtk-query/chatApiEndpoint";
import { HashLoader } from "react-spinners";
import MessageSkelleton from "../messageComponents/MessageSkelleton";
import MessageDropDown from "../messageComponents/MessageDropDown";
import MessageTimeStamps from "../messageComponents/MessageTimeStamps";
import MessageTimeStampsAndSeenIndicator from "../messageComponents/MessageTimeStamps";
import EmptyMessages from "../messageComponents/EmptyMessages";
import EnlargePhoto from "../messageComponents/EnlargePhoto";
import DisplayPhoto from "../messageComponents/DisplayPhoto";
import { SocketContext } from "../../../socket/socket";

export const ChatMessages = ({
  user,
  conversationId,
  sidebarWidth,
  isPhotoUploading,
  uploadProgress,
  messagesEndRef,
  setParticipants,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [enlargedPhoto, setEnlargedPhoto] = useState(null); // State for enlarged photo
  const [loadingPhotos, setLoadingPhotos] = useState({}); // State for loading photos
  const [messages, setMessage] = useState([]);
  const { data, isLoading, refetch } = useFetchMessagesQuery(conversationId);
  const [deleteMessage] = useDeleteMessageMutation();
  const [markMessagesAsSeen] = useMarkMessagesAsSeenMutation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("received_message", (data) => {
       console.log("data receiveid",data.receiverId)
       console.log("user id",user._id)
      if (data.receiverId.toString() == user._id) {
         refetch()
      }
    });

    return () => {
      socket.off("received_message");
    };
  }, [socket]);

  const handleDeleteMessage = async (messageId) => {
    await deleteMessage(messageId);
    toast.success("Message deleted!");
    refetch();
  };

  useEffect(() => {
    if (data?.success) {
      setMessage(data?.data?.messages);
      setParticipants(data.data.participant);
    }
  }, [data, conversationId]);

  useEffect(() => {
    const unseenMessages = messages
      .filter((msg) => msg.senderId._id !== user._id && !msg.seen)
      .map((msg) => msg._id);

    if (unseenMessages.length > 0) {
      markMessagesAsSeen(conversationId);
    }
  }, [messages, user._id, markMessagesAsSeen, refetch]);

  useEffect(() => {
    socket.on(
      "receiver_id",
      (receiverId) => {
        if (receiverId.toString() === user._id.toString()) {
          refetch();
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      },
      [deleteMessage, markMessagesAsSeen]
    );

    return () => {
      socket.off("receive_message");
    };
  }, [user, refetch]);

  const handlePhotoLoad = (messageId) => {
    setLoadingPhotos((prev) => ({ ...prev, [messageId]: false }));
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <HashLoader />
      </div>
    );

  return (
    <div className="flex flex-col p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg h-full">
      {messages.length === 0 && <EmptyMessages />}

      {/* Messages List */}
      {messages.length > 0 &&
        [...messages]
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((msg, index) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`mb-4 relative flex ${
                msg.senderId._id === user._id ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  {msg.senderId._id !== user._id && (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white"
                      src={msg.senderId.photo}
                      alt={msg.senderId.username}
                    />
                  )}

                  {/* Message Content */}
                  <div
                    className="relative w-full"
                    style={{
                      maxWidth: `calc(100% - ${sidebarWidth}px)`, // Dynamically adjust based on sidebar width
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`${
                        msg.senderId._id === user._id
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-white text-gray-800"
                      } inline-block py-3 px-6 rounded-xl shadow-xl backdrop-blur-sm backdrop-filter bg-opacity-90 w-full`}
                    >
                      {/* Display Photo if Message Contains One */}
                      {msg.photo && (
                        <DisplayPhoto
                          {...{
                            loadingPhotos,
                            handlePhotoLoad,
                            setEnlargedPhoto,
                            msg,
                          }}
                        />
                      )}

                      {/* Display Text if Message Contains Text */}
                      {msg.text && (
                        <p className="text-sm break-words whitespace-pre-wrap overflow-hidden">
                          {msg.text}
                        </p>
                      )}
                    </motion.div>

                    {/* Timestamp and Seen Indicator */}
                    <MessageTimeStampsAndSeenIndicator {...{ msg, user }} />
                  </div>

                  {/* Dropdown Menu (for user's messages) */}
                  {msg.senderId._id === user._id && (
                    <MessageDropDown
                      handleDeleteMessage={handleDeleteMessage}
                      dropdownOpen={dropdownOpen}
                      setDropdownOpen={setDropdownOpen}
                      msg={msg}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

      {/* Message Skelleton   */}
      {isPhotoUploading && (
        <MessageSkelleton
          uploadProgress={uploadProgress}
          sidebarWidth={sidebarWidth}
        />
      )}

      {/* Scroll to Bottom Reference */}
      <div ref={messagesEndRef} />

      {/* Enlarged Photo Modal */}
      <AnimatePresence>
        {enlargedPhoto && (
          <EnlargePhoto {...{ setEnlargedPhoto, enlargedPhoto }} />
        )}
      </AnimatePresence>
    </div>
  );
};
