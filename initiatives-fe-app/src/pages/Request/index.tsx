import "./index.scss"

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography
} from "@mui/material"
import React, { useEffect } from "react"
import { useGetQuestionnaireWithAnswersQuery, useLazyGetQuestionnaireWithAnswersQuery } from "../../features/questionnaire/questionnaireAPISlice"

import CreateIcon from "@mui/icons-material/Create"
import { useParams } from "react-router-dom"

export const Request = () => {
  let { id } = useParams()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [getQuestionnaire, {data: questionnaireData, error, isError, isFetching }] = useLazyGetQuestionnaireWithAnswersQuery()
  useEffect(() => {
    if (id) {
      getQuestionnaire(Number(id))
    } else {
      getQuestionnaire(null)
    }
  }, [id])
  
  if(isFetching) {
    return <CircularProgress />
  }
  if(isError) {
    return <div>Error: {(error as any)?.status} {(error as any)?.message}</div>
  }
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const steps = (questionnaireData?.sections || []).reduce(
    (acc: string[], {title}: any) => {
    
      return [...acc, title]
    }
    ,["Basic info"])
  const handleReset = () => {
    setActiveStep(0);
  };
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
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>,
  ]
}
