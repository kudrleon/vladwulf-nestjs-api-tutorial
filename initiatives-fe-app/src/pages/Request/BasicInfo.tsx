import { Alert, Button, Card, CardActions, LinearProgress, Snackbar, TextField, Typography } from "@mui/material"
import {
  useCreateRequestMutation,
  useLazyGetRequestsQuery,
  useUpdateRequestMutation,
} from "../../features/requests/requestsAPISlice"
import { useEffect, useState } from "react"

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { selectUser } from "../../features/auth/authSlice"
import { useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"

export const BasicInfo = ({ id }: { id: number }) => {
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
  const [getRequest, { data: requestData }] = useLazyGetRequestsQuery()
  const [MLProjectTitle, setMLProjectTitle] = useState("")
  const [businessOwner, setBusinessOwner] = useState("")
  const [summary, setSummary] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  
  const [openNotification, setOpenNotification] = useState(false)

  useEffect(() => {
    if (id) {
      getRequest(id)
    }
  }, [id])
  useEffect(() => {
    console.log(requestData)
    if (requestData) {
      setMLProjectTitle(requestData.title)
      setBusinessOwner(requestData.businessOwner)
      setSummary(requestData.summary)
    }
  }, [requestData])

  const isLoading = createIsLoading || updateIsLoading
  const isSuccess = createIsSuccess || updateIsSuccess
  const isError = createIsError || updateIsError
  const error = createError || updateError
  const shouldShowNotification =
    createIsError ||
    createIsSuccess ||
    createIsLoading ||
    updateIsError ||
    updateIsLoading ||
    updateIsSuccess
  useEffect(() => {
    if (createIsError || createIsSuccess) {
      setOpenNotification(true)
    }
  }, [shouldShowNotification])

  return [
    <Snackbar // By some reason no close button appears
      open={openNotification}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={(_e, reason) => {
        if (reason === "clickaway") {
          return
        }
        if (isSaved) {
          navigate("/")
        } else {
          if (!id) {
            navigate("/request/" + createData?.id)
          }
        }

        setOpenNotification(false)
      }}
    >
      {
        isLoading ? (
          <LinearProgress sx={{ width: "100%" }} />
        ) : isSuccess ? (
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Request has been {isSaved ? "saved" : "created"} successfully!
            {isSaved && "You will be redirected to the home page, shortly."}
          </Alert>
        ) : createIsError ? (
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            Sorry, something went wrong: <br />
            Status: {(error as FetchBaseQueryError)?.status} <br />
            Error message:{" "}
            {JSON.stringify((error as FetchBaseQueryError)?.data as any)}
          </Alert>
        ) : updateIsError ? (
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            Failed to update field: <br />
            Status: {(updateError as FetchBaseQueryError)?.status} <br />
            Error message:{" "}
            {JSON.stringify((updateError as FetchBaseQueryError)?.data as any)}
          </Alert>
        ) : undefined // This code needs propper wrapper, I think. Something like global toast with custom messages
      }
    </Snackbar>,
    <Card
      component="form"
      onSubmit={e => {
        e.preventDefault()
        if (id) {
          updateTrigger({
            id,
            title: MLProjectTitle,
            businessOwner,
            summary,
          })
        } else {
          trigger({
            title: MLProjectTitle,
            businessOwner,
            summary,
          })
        }
        if ((e.nativeEvent as SubmitEvent).submitter?.dataset.noNavigate) {
          setIsSaved(true)
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
