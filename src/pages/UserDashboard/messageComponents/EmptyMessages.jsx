import { motion } from "framer-motion"


const EmptyMessages = () => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center h-full text-center"
  >
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-full shadow-2xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    </div>
    <h2 className="mt-6 text-2xl font-bold text-gray-800">
      No Messages Yet
    </h2>
    <p className="mt-2 text-gray-600">
      Start the conversation by sending a message!
    </p>
  </motion.div>
  )
}

export default EmptyMessages
