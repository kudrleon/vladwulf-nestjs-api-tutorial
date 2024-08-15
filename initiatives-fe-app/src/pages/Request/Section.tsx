import { Box, Button, Typography } from "@mui/material"

import { Fragment } from "react/jsx-runtime"
import { QuestionAnswer } from "../../features/questionAnswer/QuestionAnswer"
import React from "react"
import { calculateProgress } from "../../utils/calculateProgress"
import type { question } from "../../types/question.type"
import { useState } from "react"

type props = {
  description: string
  questions: question[]
  requestId: number
  handleNext: () => void
  handleBack: () => void
  updateProgressValue: (value: number) => void
  isLastStep: boolean
  activeStep: number
  isFinishDisabled: boolean
}

export const Section = ({
  description,
  questions,
  requestId,
  handleNext,
  isLastStep,
  activeStep,
  handleBack,
  updateProgressValue,
  isFinishDisabled,
}: props) => {
  const progressValue = calculateProgress(questions)
  updateProgressValue(Math.round(progressValue))
  return (
    <Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>{description}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
        {[...(questions || [])]
          .sort(({ order }, { order: order2 }) => order - order2)
          .map((question: question, index: number) => (
            <React.Fragment>
              <QuestionAnswer
                key={`${question.id}`}
                id={question.questionAnswers?.[0]?.id}
                question={question.question}
                questionId={question.id}
                requestId={requestId}
                questionAnswer={question.questionAnswers?.[0]?.answer}
              />
            </React.Fragment>
          ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext} disabled={isLastStep && isFinishDisabled}>
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </Box>
    </Fragment>
  )
}
