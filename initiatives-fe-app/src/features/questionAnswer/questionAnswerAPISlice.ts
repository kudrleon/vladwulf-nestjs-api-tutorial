import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { be_base_url } from "../../utils/consts"
import { prepareHeaders } from "../../utils/apiUtils"

export const questionAnswerAPI = createApi({
  reducerPath: "questionAnswerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: be_base_url + "/question-answers",
    prepareHeaders,
  }),
  endpoints: builder => ({
    createQuestionAnswer: builder.mutation({
      query: ({requestId, questionId, answer}) => ({
        url: "",
        method: "POST",
        body: {requestId, questionId, answer},
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
    updateQuestionAnswer: builder.mutation({
      query: ({ answerId, answer}) => ({
        url: "/" + answerId,
        method: "PATCH",
        body: { answer },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
})

export const {
  useCreateQuestionAnswerMutation,
  useUpdateQuestionAnswerMutation
} = questionAnswerAPI
