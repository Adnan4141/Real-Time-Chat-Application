import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiImage,
  FiSmile,
  FiMic,
  FiPaperclip,
  FiType,
} from "react-icons/fi";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react"; // Ensure this is installed
import { toast } from "sonner";
import uploadPhotoInCloudinary from "../../../utils/uploadCloudinary";

export const ChatInput = ({
  conversationId,
  isUploading,
  sendMessage,
  sendMessageError,
  SetIsPhotoUploading,
  isPhotoUploading,
  uploadProgress,
  messagesEndRef,
  setUploadProgress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
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

    try {
      setFilePreview(null);
      if (selectedFile) {
        SetIsPhotoUploading(true);
        const uploadResponse = await uploadPhotoInCloudinary(
          selectedFile,
          setUploadProgress
        );
        if (uploadResponse) {
          await sendMessage({
            conversationId,
            text: newMessage,
            photo: uploadResponse,
          });
          SetIsPhotoUploading(false);
        } else {
          toast.error("Failed to upload photo");
          SetIsPhotoUploading(false);
        }
      } else {
        await sendMessage({ conversationId, text: newMessage });
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Play send sound effect
  const playSendSound = () => {
    if (sendSoundRef.current) {
      sendSoundRef.current.currentTime = 0; // Reset audio to start
      sendSoundRef.current.play();
    }
  };

  // Play receive sound effect
  const playReceiveSound = () => {
    if (receiveSoundRef.current) {
      receiveSoundRef.current.currentTime = 0; // Reset audio to start
      receiveSoundRef.current.play();
    }
  };

  return (
    <div className="p-4 pb-10 pt-10 h-[20vh] border-t border-gray-200 bg-white">
      {/* Audio elements for sound effects */}
      <audio ref={sendSoundRef} src="/public/sendMsg1.mp3" preload="auto" />
      <audio ref={receiveSoundRef} src="/public/tone.mp3" preload="auto" />

      <div className="flex items-center gap-3 max-w-2xl mx-auto">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4 z-50">
            <EmojiPicker
              onEmojiClick={handleEmojiClick} // Use the correct handler
            />
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

        {/* Input Field */}
        <motion.div
          className="flex-1 relative"
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