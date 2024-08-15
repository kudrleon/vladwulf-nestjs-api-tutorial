import "./index.scss"

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material"
import React, { useEffect } from "react"
import {
  useGetRequestTemplateQuery,
  useLazyGetRequestQuery,
} from "../../features/requests/requestsAPISlice"
import { useNavigate, useParams } from "react-router-dom"

import { BasicInfo } from "./BasicInfo"
import CreateIcon from "@mui/icons-material/Create"
import { Section } from "./Section"
import { calculateProgress } from "../../utils/calculateProgress"
import type { question } from "../../types/question.type"

export const Request = () => {
  let { id, step: stepParam = "1" } = useParams()
  const urlStep = Number(stepParam)
  const activeStep = stepParam ? Number(stepParam) - 1 : 0
  const navigate = useNavigate()
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const [stepsProgress, updateStepsProgress] = React.useState<number[]>([])
  const {
    data: requestTemplate,
    error: requestTemplateError,
    isError: requestTemplateIsError,
    isFetching: isRequestTemplateFetching,
  } = useGetRequestTemplateQuery("getRequestTemplate")
  const [
    getRequest,
    {
      data: request,
      isError: isRequestError,
      error: requestError,
      isFetching: isRequestFetching,
    },
  ] = useLazyGetRequestQuery()
  useEffect(() => {
    if (id) {
      getRequest(Number(id))
    }
  }, [id])

  const requestObject = request || requestTemplate

  const questionnaireData = requestObject?.questionnaire
  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }
  const steps = (questionnaireData?.sections || []).reduce(
    (acc: string[], { title }: any) => {
      return [...acc, title]
    },
    ["Basic info"],
  )
  useEffect(() => {
    console.log(requestObject)
    const progressValues = [
      {
        questions: [
          {
            question: "ML project title",
            answer: requestObject?.title,
          },
          {
            question: "Who is business owner/unit of this solution?",
            answer: requestObject?.businessOwner,
          },
          {
            question: "Please provide a short summary of this project",
            answer: requestObject?.summary,
          },
        ].map(({ question, answer }, index) => ({
          id: -1,
          question,
          order: index,
          questionAnswers: [
            {
              requestId: -1,
              userId: -1,
              questionId: -1,
              answer,
              id: -1,
            },
          ],
        })),
      },
      ...(requestObject?.questionnaire?.sections || []),
    ].map((section: { questions: question[] }) =>
      calculateProgress(section.questions),
    )
    updateStepsProgress(progressValues)
  }, [requestObject])
  if (isRequestFetching || isRequestTemplateFetching) {
    return <CircularProgress />
  }
  if (requestTemplateIsError || isRequestError) {
    const error = requestTemplateError || requestError
    return (
      <div>
        Error: {(error as any)?.status} {(error as any)?.message}
      </div>
    )
  }

  const isFinishDisabled = stepsProgress.some((progress) => progress !== 100)
  const handleNext = () => {
    
    if (activeStep === steps.length - 1) {
      if (isFinishDisabled) {
        return
      }
      navigate(`/`)
      return
    }
    navigate(`/request/${id}/${urlStep + 1}`)
  }

  const handleBack = () => {
    navigate(`/request/${id}/${urlStep - 1}`)
  }
  return [
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
      open
    >
      <div>
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Create a request"} // I think no action - you are already here
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>,
    <Box sx={{ flexGrow: 1 }} className="new-request-form-container">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label: string, index: number) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          const progressStatus = stepsProgress[index]

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography sx={{ textAlign: "left" }}>
                  Step {index + 1}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>{label}</Typography>
              </StepLabel>
              <LinearProgress
                value={progressStatus || 0}
                variant="determinate"
              />
              <Typography sx={{ textAlign: "left" }}>
                {
                  progressStatus === 100 ? "Completed" : activeStep === index ? "In progress" : "Pending"
                } 
                </Typography>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <BasicInfo
          setBasicInfoProgress={(value: number) => {
            if (value !== stepsProgress[activeStep]) {
              const updatedSteps = [...stepsProgress]
              updatedSteps[activeStep] = value
              updateStepsProgress(updatedSteps)
            }
          }}
          id={Number(id)}
          request={requestObject}
        />
      ) : (
        <Section
          description={
            requestObject?.questionnaire?.sections[activeStep - 1]?.description
          }
          questions={
            requestObject?.questionnaire?.sections[activeStep - 1]?.questions
          }
          requestId={Number(id)}
          handleNext={handleNext}
          handleBack={handleBack}
          isLastStep={activeStep === steps.length - 1}
          activeStep={activeStep}
          updateProgressValue={(value: number) => {
            const updatedSteps = stepsProgress
            updatedSteps[activeStep] = value
            console.log(updatedSteps)
            updateStepsProgress(updatedSteps)
          }}
          isFinishDisabled={isFinishDisabled}
        />
      )}
    </Box>,
  ]
}
