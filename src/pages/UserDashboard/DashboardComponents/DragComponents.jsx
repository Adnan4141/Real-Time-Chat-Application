import React from 'react'
import { useCreateNewConversionsMutation } from '../../../app/redux-rtk-query/chatApiEndpoint'
import { toast, Toaster } from 'sonner'

const DragComponents = ({user,SetIsOpenSuggestion}) => {
   const [createNewConversions,{data,error}] = useCreateNewConversionsMutation()  

   const createConversionWithUser = async (email)=>{
    try {
      const result = await createNewConversions({email});
      console.log(result.data);
       if(result.data.success){
          toast.success(result.data.message)
          SetIsOpenSuggestion(false)
       }else toast.error(result.data.message)
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
   }


  return (
   <div className="absolute px-4 py-5  -right-72 -top-5 w-72 bg-white p-2 rounded shadow-md ">
   <Toaster/>
   <div className="flex justify-between items-center p-3">
     <img
       className="w-24 h-24 rounded-full"
       src={user?.photo}
       alt=""
     />
     <button onClick={()=>createConversionWithUser(user?.email)} className="rounded h-12 bg-blue-900 hover:bg-blue-950 text-white py-1  text-base px-3 cursor-pointer">
       Add{" "}
     </button>
   </div>
   <h2 className="text-base font-bold font-sans capitalize ml-2">
     Username: {user?.username}
   </h2>
   <h2 className="text-base font-sans font-semibold  ml-2">
     Email: {user?.email}
   </h2>
   <h2 className="text-base font-sans font-medium  ml-2">
     Location: {user?.location}
   </h2>
 </div>
  )
}

export default DragComponents
