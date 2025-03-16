import { configureStore } from "@reduxjs/toolkit";
import { chatApi } from "./chatApiEndpoint";
import { userApi } from "./userApiEndpoint";



export const store = configureStore({
   reducer:{
      [chatApi.reducerPath]:chatApi.reducer,
      [userApi.reducerPath]:userApi.reducer
   },
   middleware:(getdefaultMiddleware)=>getdefaultMiddleware().concat(chatApi.middleware,userApi.middleware)
})