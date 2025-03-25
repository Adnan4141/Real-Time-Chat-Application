import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/BaseUrl";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    // credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // User Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
        credentials: "include",
      }),
    }),

    signup: builder.mutation({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
     
    }),
    logout:builder.mutation({
      query:()=>({
        url:'/auth/logout',
        method:"POST",
      })
    }),


    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: formData,
      }),
    }),


    searchUser: builder.query({
      query: (query) => `/users/search?query=${query}`,
    }),
  }),
});

export const { useLogoutMutation, useUpdateProfileMutation, useLoginMutation, useSignupMutation, useSearchUserQuery } = userApi;
