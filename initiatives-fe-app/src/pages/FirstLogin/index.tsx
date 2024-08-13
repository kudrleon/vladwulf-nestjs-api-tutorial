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

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { useNavigate } from "react-router-dom"
import { useUpdateCurrentUserProfileMutation } from "../../features/auth/usersAPISlice"

export const FirstLogin = () => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [trigger, { isLoading, isSuccess, isError, error }] =
    useUpdateCurrentUserProfileMutation()
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
        onClose={() => navigate("/")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {isSuccess ? (
          <Alert
            onClose={() => navigate("/")}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Your profile has been updated! Now you will be redirected to the
            home page.
          </Alert>
        ) : isError ? (
          <Alert
            onClose={() => navigate("/")}
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
      <Typography variant="h2">We welcoming you on our platform</Typography>
      <Typography>
        {" "}
        In order to proceed using site please feel in following information
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
