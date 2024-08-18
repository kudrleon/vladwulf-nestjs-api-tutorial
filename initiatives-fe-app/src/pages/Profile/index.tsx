import {
  Alert,
  Box,
  Button,
  Card,
  FormGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import React, { useEffect } from "react"
import { useGetCurrentUserProfileQuery, useUpdateCurrentUserProfileMutation } from "../../features/auth/usersAPISlice"

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
  const [trigger, { isLoading, isSuccess, isError, error }] =
    useUpdateCurrentUserProfileMutation()

  const { data, isFetching } = useGetCurrentUserProfileQuery("userDetails", {
    // perform a refetch every 5mins
    pollingInterval: 300000,
  })
  const [firstName, setFirstName] = React.useState(data?.firstName ?? "")
  const [lastName, setLastName] = React.useState(data?.lastName ?? "")
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      setOpen(true)
    }
  })
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => window.location.href = "/"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {isSuccess ? (
          <Alert
            onClose={() => window.location.href = "/"}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Your profile has been updated! Now you will be redirected to the
            home page.
          </Alert>
        ) : isError ? (
          <Alert
            onClose={() => window.location.href = "/"}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Sorry, something went wrong: <br />
            Status: {(error as FetchBaseQueryError)?.status} <br />
            Error message: {(error as FetchBaseQueryError)?.data as string}
          </Alert>
        ) : undefined}
      </Snackbar>
      <Typography>
        User profile page
      </Typography>
      <Typography>
        Please fill in your first and last name
      </Typography>
      <Card
        component="form"
        onSubmit={e => {
            trigger({ firstName, lastName });
            e.preventDefault();
        }}
        sx={{
          maxWidth: "800px",
          flexGrow: 1,
          minWidth: "500px",
          boxShadow: "none",
        }}
      >
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          fullWidth={true}
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
          sx={{
            marginTop: "20px",
          }}
          required={true}
          disabled={isLoading}
        />

        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          fullWidth={true}
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
          sx={{
            marginTop: "20px",
          }}
          required={true}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Card>
    </Box>
  )
}
