import { motion } from 'framer-motion'
import React from 'react'

const EnlargePhoto = ({setEnlargedPhoto,enlargedPhoto}) => {
  return (
   <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
   onClick={() => setEnlargedPhoto(null)}
 >
   <motion.img
     initial={{ scale: 0.9 }}
     animate={{ scale: 1 }}
     exit={{ scale: 0.9 }}
     src={enlargedPhoto}
     alt="Enlarged Photo"
     className="max-w-[90vw] max-h-[90vh] rounded-lg"
   />
 </motion.div>
  )
}

export default EnlargePhoto
