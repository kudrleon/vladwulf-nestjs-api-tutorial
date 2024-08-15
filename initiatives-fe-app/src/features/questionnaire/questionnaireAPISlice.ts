import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { be_base_url } from "../../utils/consts"
import { prepareHeaders } from "../../utils/apiUtils"

export const questionnaireAPI = createApi({
  reducerPath: "questionnaireAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: be_base_url,
    prepareHeaders,
  }),
  endpoints: builder => ({
    getQuestionnaireWithAnswers: builder.query({
      query: (id: number|null) => ({
        url: `questionnaire/${id}`,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
})

export const { useGetQuestionnaireWithAnswersQuery, useLazyGetQuestionnaireWithAnswersQuery } = questionnaireAPI
