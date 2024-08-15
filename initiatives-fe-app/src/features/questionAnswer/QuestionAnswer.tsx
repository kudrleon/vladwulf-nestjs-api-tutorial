import { Box, CircularProgress, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material"
import { Check as CheckIcon, Warning as WarningIcon } from '@mui/icons-material';
import {
  useCreateQuestionAnswerMutation,
  useUpdateQuestionAnswerMutation,
} from "./questionAnswerAPISlice"

import { useState } from "react"

type props = {
  requestId: number
  questionAnswer?: string
  id: number
  question: string
  questionId: number
}

export const QuestionAnswer = ({
  question,
  requestId,
  questionAnswer,
  id,
  questionId
}: props) => {
  const [answer, setAnswer] = useState(questionAnswer)
  const [
    updateQuestionAnswer,
    {
      isSuccess: updateSucces,
      isError: updateErrored,
      error: updateError,
      isLoading: updateIsLoading,
    },
  ] = useUpdateQuestionAnswerMutation()
  const [
    createQuestionAnswer,
    {
      isSuccess: createSucces,
      isError: createErrored,
      error: createError,
      isLoading: createIsLoading,
    },
  ] = useCreateQuestionAnswerMutation()
  const isSuccess = updateSucces || createSucces
  const isError = updateErrored || createErrored
  const error = updateError || createError
  const isLoading = updateIsLoading || createIsLoading
  
  return (
    <Box sx={{ width: "100%" }} display={"block"}>
      <Typography sx={{ textAlign: "left" }}>{question}</Typography>
      <TextField
        sx={{ textAlign: "left" }}
        value={answer}
        onChange={({ target: { value } }) => setAnswer(value)}
        onBlur={() => {
          if (id) {
            updateQuestionAnswer({ answerId: id, answer })
          } else {
            createQuestionAnswer({ requestId, questionId, answer })
          }
        }}
        disabled={isLoading}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <Tooltip title={isError ? (error as any)?.message?.join('\n') : ""}>
              <IconButton
                edge="end"
                disabled={!isError}
                disableRipple
                
              >
                {isLoading && <CircularProgress size={20} />}
                {isSuccess && <CheckIcon color="success" />}
                {isError && <WarningIcon color="error" />}
              </IconButton>
            </Tooltip>
          </InputAdornment>,
        }}
      />
    </Box>
  )
}
