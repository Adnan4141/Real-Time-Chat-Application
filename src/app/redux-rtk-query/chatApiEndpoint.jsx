import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/BaseUrl";
import Cookies from "js-cookie";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token") || localStorage.getItem("token");
      ;
      console.log()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages", "Conversations"],
  endpoints: (builder) => ({
    fetchConversionsList: builder.query({
      query: () => `/conversions`,
      // transformResponse: (response) => response.data.messages,
      providesTags: ["Messages", "Conversations"],
    }),
    fetchMessages: builder.query({
      query: (conversationId) => `/conversions/${conversationId}`,
      // transformResponse: (response) => response.data ,
      providesTags: ["Messages", "Conversations"],
    }),
    createNewConversions: builder.mutation({
      query:({email})=>({
        url:`/conversions/new`,
        method:"POST",
        body:{email}
      }),
      invalidatesTags:["Messages", "Conversations"]
    }),
    sendMessage: builder.mutation({
      query: ({ conversationId, text ,photo}) => ({
        url: `/messages/${conversationId}`,
        method: "POST",
        body: { conversationId, text,photo },
      }),
      invalidatesTags: ["Messages"], // Refetch messages after sending
    }),

    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/messages/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"], // Refetch messages after deleting
    }),
    deleteConversion: builder.mutation({
      query: (conversationId) => ({
        url: `/conversions/${conversationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages", "Conversations"],
    }),
    markMessagesAsSeen: builder.mutation({
      query: (conversationId) => ({
        url: `/conversions/markAsSeen/${conversationId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Messages", "Conversations"],
    }),
  }),
});

export const {
  useFetchMessagesQuery,
  useFetchConversionsListQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useDeleteConversionMutation,
  useMarkMessagesAsSeenMutation,
  useCreateNewConversionsMutation
} = chatApi;
