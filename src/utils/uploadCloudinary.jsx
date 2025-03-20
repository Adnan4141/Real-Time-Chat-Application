import axios from "axios";


export const uploadPhotoInCloudinary = async(file,setUploadProgress) => {
  
   try {
      const formData = new FormData();
       formData.append("file",file);
       formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
       const cloudName = import.meta.env.VITE_CLOUD_NAME
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const response = await axios.post(url,formData,
      {
         onUploadProgress: (event) => {
            if(setUploadProgress){
               setUploadProgress(Math.round((100 * event.loaded) / event.total));
            }
         },
       }
   )
       return response.data.secure_url;
   } catch (error) {
      if (error.response) {
         // Server responded with an error
         console.error("Cloudinary Error Response:", error.response.data);
         console.error("Status Code:", error.response.status);
         return error.response.data;
       } else if (error.request) {
         // No response received from Cloudinary
         console.error("No Response from Cloudinary:", error.request);
       } else {
         // Other errors (e.g., network issues)
         console.error("Upload Error:", error.message);
       }
       return null;
   }

 
}

export default uploadPhotoInCloudinary
