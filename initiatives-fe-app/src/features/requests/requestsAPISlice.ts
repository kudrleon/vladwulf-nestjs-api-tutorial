import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { be_base_url } from "../../utils/consts"
import { prepareHeaders } from "../../utils/apiUtils"

export const requestsAPI = createApi({
  reducerPath: "requestsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: be_base_url,
    prepareHeaders,
  }),
  endpoints: builder => ({
    getRequests: builder.query({
      query: () => ({
        url: "requests",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
    createRequest: builder.mutation({
      query: body => ({
        url: "requests",
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
    updateRequest: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `requests/${id}`,
        method: "PATCH",
        body,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
})

export const {
  useGetRequestsQuery,
  useLazyGetRequestsQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
} = requestsAPI
