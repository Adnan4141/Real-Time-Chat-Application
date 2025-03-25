import { useRef, useState } from "react";
import { FiSend, FiImage, FiSmile } from "react-icons/fi";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import { toast } from "sonner";
import uploadPhotoInCloudinary from "../../../utils/uploadCloudinary";
import receiveMsgTone from "/tone.mp3";
import SendMsgTone from "/sendMsg1.mp3";

export const ChatInput = ({
  conversationId,
  isUploading,
  sendMessage,
  SetIsPhotoUploading,
  isPhotoUploading,
  uploadProgress,
  messagesEndRef,
  setUploadProgress,
  SendMessageBySocket,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Audio elements for sound effects
  const sendSoundRef = useRef(null);
  const receiveSoundRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;
    let payload = {};
    try {
      setFilePreview(null);
      if (selectedFile) {
        SetIsPhotoUploading(true);
        const uploadResponse = await uploadPhotoInCloudinary(
          selectedFile,
          setUploadProgress
        );
        if (uploadResponse) {
          payload = {
            conversationId,
            text: newMessage,
            photo: uploadResponse,
          };
          SetIsPhotoUploading(false);
        } else {
          toast.error("Failed to upload photo");
          SetIsPhotoUploading(false);
        }
      } else {
        payload = {
          conversationId,
          text: newMessage,
        };
      }

      const response = await sendMessage(payload);
      if (response.data.success) {
        SendMessageBySocket(response.data.data);
      }

      setNewMessage("");
      setSelectedFile(null);
      setUploadProgress(null);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      playSendSound();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Display file preview
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };

  // Play send sound effect
  const playSendSound = () => {
    if (sendSoundRef.current) {
      sendSoundRef.current.currentTime = 0; // Reset audio to start
      sendSoundRef.current.play();
    }
  };

  return (
    <div className="p-4 pb-10 pt-10 border-t border-gray-200 bg-white">
      {/* Audio elements for sound effects */}
      <audio ref={sendSoundRef} src={SendMsgTone} preload="auto" />
      <audio ref={receiveSoundRef} src={receiveMsgTone} preload="auto" />

      {/* Input Field and Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl mx-auto">
        {/* Text Input Field */}
        <motion.div
          className="flex-1 relative w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            type="text"
            className={`w-full h-12 p-3 rounded-xl border-2 ${
              isFocused ? "border-purple-500" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder={isUploading ? "Uploading..." : "Type a message..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={handleKeyPress}
            disabled={isUploading}
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-20 right-4 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* File Preview */}
          {filePreview && (
            <div className="absolute bottom-20 left-4 z-50 bg-white p-2 rounded-lg shadow-lg">
              <img
                src={filePreview}
                alt="File Preview"
                className="w-20 h-20 object-cover rounded"
              />
              <button
                onClick={handleRemoveFile}
                className="mt-2 text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          {/* Photo Upload Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-100 text-gray-600 h-12 w-12 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
          >
            <FiImage className="text-xl" />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
              disabled={isUploading}
            />
          </motion.button>

          {/* Emoji Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`bg-gray-100 text-gray-600 h-12 w-12 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={isUploading}
          >
            <FiSmile className="text-xl" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`bg-gradient-to-r from-purple-500 to-indigo-500 text-white h-12 px-6 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendMessage}
            disabled={isUploading}
          >
            <FiSend className="text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Upload Progress Bar */}
      {isPhotoUploading && (
        <div className="max-w-2xl mx-auto mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};