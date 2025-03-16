import React from 'react'

const DisplayPhoto = ({loadingPhotos,handlePhotoLoad,setEnlargedPhoto,msg}) => {
  return (
   <div className="mb-2">
   {loadingPhotos[msg._id] && (
     <div className="w-[200px] h-[150px] bg-gray-200 animate-pulse rounded-lg"></div>
   )}
   <img
     src={msg.photo}
     alt="Message Photo"
     className={`max-w-[200px] h-auto rounded-lg object-cover ${
       loadingPhotos[msg._id] ? "hidden" : "block"
     }`}
     loading="lazy"
     onLoad={() => handlePhotoLoad(msg._id)}
     onClick={() => setEnlargedPhoto(msg.photo)}
   />
 </div>
  )
}

export default DisplayPhoto
