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

import { BasicInfo } from "./BasicInfo"
import CreateIcon from "@mui/icons-material/Create"
import { useParams } from "react-router-dom"

export const Request = () => {
  let { id } = useParams()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const [basicInfoProgress, setBasicInfoProgress] = React.useState(0)
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
  const requestObject = request || requestTemplate
  const questionnaireData = requestObject?.questionnaire
  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = (questionnaireData?.sections || []).reduce(
    (acc: string[], { title }: any) => {
      return [...acc, title]
    },
    ["Basic info"],
  )
  const handleReset = () => {
    setActiveStep(0)
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
          let progressStatus
          if (index === 0) {
            progressStatus = basicInfoProgress
          } else {
            const totalQuestion =
              questionnaireData?.sections[index + 1]?.questions?.length || 0
            const answeredQUestions =
              questionnaireData?.sections[index + 1]?.questions?.filter(
                (q: any) => q.answer?.length,
              )?.length || 0
            progressStatus =
              activeStep === index
                ? totalQuestion === 0
                  ? 100
                  : (answeredQUestions / totalQuestion) * 100
                : 0
          }
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Typography sx={{ textAlign: "left" }}>
                  Step {index + 1}
                </Typography>
                <Typography sx={{ textAlign: "left" }}>{label}</Typography>
              </StepLabel>
              <LinearProgress value={progressStatus} variant="determinate" />
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <BasicInfo 
          setBasicInfoProgress={setBasicInfoProgress}
          id={Number(id)}
          request={requestObject}
        />
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>,
  ]
}
