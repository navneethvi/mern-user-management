import { apiSlice } from "./apiSlice";

const USER_URL = "/api";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/register`,
              method: "POST", 
              body: data,
            }),
          }),
        login: builder.mutation({
          query: (data) => ({
            url: `${USER_URL}/login`,
            method: "POST", 
            body: data,
          }),
        }),
        logout: builder.mutation({
            query: () => ({
                url : `${USER_URL}/logout`,
                method : 'POST'
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/editProfile`,
              method: "POST", 
              body: data,
            }),
          }),
      })
  });

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useUpdateProfilePicMutation } = userApiSlice;