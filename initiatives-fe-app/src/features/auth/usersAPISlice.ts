import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { be_base_url } from "../../utils/consts"
import { prepareHeaders } from '../../utils/apiUtils'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: be_base_url + '/users',
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getCurrentUserProfile: builder.query({
      query: () => ({
        url: 'me',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }),
    }),
    getUser: builder.query({
      query: (id: number) => ({
        url: '/' + id,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }),
    }),
    updateCurrentUserProfile: builder.mutation({
      query: (body: any) => ({
        url: '/',
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body
      }),
    }),
  }),
})

export const { useGetCurrentUserProfileQuery, useGetUserQuery, useUpdateCurrentUserProfileMutation } = usersAPI