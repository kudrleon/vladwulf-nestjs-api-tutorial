import {
  Alert,
  Button,
  Card,
  CardActions,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import {
  useCreateRequestMutation,
  useUpdateRequestMutation
} from "../../features/requests/requestsAPISlice"
import { useEffect, useState } from "react"

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { calculateProgress } from "../../utils/calculateProgress"
import { selectUser } from "../../features/auth/authSlice"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

type props = {
  id?: number
  setBasicInfoProgress: (progressValue: number) => void
  request: any
}

export const BasicInfo = ({ id, setBasicInfoProgress, request }: props) => {
  const [
    trigger,
    {
      data: createData,
      isLoading: createIsLoading,
      isSuccess: createIsSuccess,
      isError: createIsError,
      error: createError,
    },
  ] = useCreateRequestMutation()
  const [
    updateTrigger,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateRequestMutation()
  const [MLProjectTitle, setMLProjectTitle] = useState("")
  const [businessOwner, setBusinessOwner] = useState("")
  const [summary, setSummary] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  const [openNotification, setOpenNotification] = useState(false)

  useEffect(() => {
    if (request) {
      setMLProjectTitle(request.title)
      setBusinessOwner(request.businessOwner)
      setSummary(request.summary)
    }
  }, [request])

  const progressValue = calculateProgress(
    [
      {
        question: "ML project title",
        answer: MLProjectTitle,
      },
      {
        question: "Who is business owner/unit of this solution?",
        answer: businessOwner,
      },
      {
        question: "Please provide a short summary of this project",
        answer: summary,
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
  )
  setBasicInfoProgress(Math.round(progressValue))
  const isLoading = createIsLoading || updateIsLoading
  const isSuccess = createIsSuccess || updateIsSuccess
  const isError = createIsError || updateIsError
  const error = createError || updateError
  const shouldShowNotification = isSuccess || isError
  useEffect(() => {
    if (isError || isLoading) {
      setOpenNotification(true)
    }
  }, [shouldShowNotification])

  return [
    <Snackbar // By some reason no close button appears
      open={openNotification}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {
        isLoading ? (
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            <p>"Updating"</p>
          </Alert>
        ) : isError ? (
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
            onClose={_e => {
              if (isSaved) {
                navigate("/")
              } else {
                if (!id) {
                  navigate("/request/" + createData?.id + "/2")
                }
              }
            }}
          >
            {updateIsError ? (
              <p>
                Failed to update field: <br />
              </p>
            ) : (
              <p>
                Failed to create request: <br />
              </p>
            )}
            Status: {(error as FetchBaseQueryError)?.status} <br />
            Error message:{" "}
            {JSON.stringify((error as FetchBaseQueryError)?.data as any)}
          </Alert>
        ) : undefined // This code needs propper wrapper, I think. Something like global toast with custom messages
      }
    </Snackbar>,
    <Card
      component="form"
      onSubmit={async e => {
        e.preventDefault()
        if (id) {
          updateTrigger({
            id,
            title: MLProjectTitle,
            businessOwner,
            summary,
          })
        } else {
          const requestResult = await trigger({
            title: MLProjectTitle,
            businessOwner,
            summary,
          })
          navigate("/request/" + requestResult.data.id + "/2")
          return
        }
        if ((e.nativeEvent as SubmitEvent).submitter?.dataset.noNavigate) {
          setIsSaved(true)
          navigate("/")
          return
        } else {
          navigate("/request/" + id + "/2")
        }
      }}
      sx={{
        maxWidth: "800px",
        flexGrow: 1,
        minWidth: "500px",
        boxShadow: "none",
        flexDirection: "column",
        display: "flex",
      }}
      name="new-request-form"
    >
      {id ? (
        <Typography variant="h5">Edit request</Typography>
      ) : (
        <Typography variant="h5">Create request</Typography>
      )}

      <Typography variant="body1">Here will be stepper</Typography>
      <TextField
        label="Full Name"
        InputLabelProps={{
          shrink: true,
        }}
        value={`${user?.firstName} ${user?.lastName}`}
        disabled={true}
      />
      <TextField
        label="ML project title"
        InputLabelProps={{
          shrink: true,
        }}
        required
        placeholder="Enter project title"
        value={MLProjectTitle}
        onChange={({ target: { value } }) => {
          setMLProjectTitle(value)
        }}
      />
      <TextField
        label="Who is business owner/unit of this solution?"
        InputLabelProps={{
          shrink: true,
        }}
        required
        placeholder="Enter owner/unit name"
        value={businessOwner}
        onChange={({ target: { value } }) => {
          setBusinessOwner(value)
        }}
      />
      <TextField
        label="Please provide a short summary of this project"
        multiline
        rows={5}
        required
        InputLabelProps={{
          shrink: true,
        }}
        value={summary}
        placeholder="Type your answer"
        onChange={({ target: { value } }) => {
          setSummary(value)
        }}
      />
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          type={"button"}
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" data-no-navigate={true}>
          Save
        </Button>
        <Button type="submit" variant="contained" sx={{ marginLeft: "auto" }}>
          Next
        </Button>
      </CardActions>
    </Card>,
  ]
}
