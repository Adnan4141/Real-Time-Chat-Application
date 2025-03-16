import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/BaseUrl";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            localStorage.setItem("token", data.token); // Store token
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    // User Signup (Handles image upload)
    signup: builder.mutation({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData, // Directly send FormData for file support
      }),
    }),

    // Search User Query (by username or email)
    searchUser: builder.query({
      query: (query) => `/users/search?query=${query}`,
      // transformResponse: (response) => response.data,
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useSearchUserQuery } = userApi;
