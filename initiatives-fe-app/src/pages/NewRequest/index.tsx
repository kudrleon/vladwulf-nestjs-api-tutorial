import "./index.scss"

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"

import CreateIcon from "@mui/icons-material/Create"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { selectUser } from "../../features/auth/authSlice"
import { useAppSelector } from "../../app/hooks"
import { useCreateRequestMutation } from "../../features/requests/requestsAPISlice"
import { useNavigate } from "react-router-dom"

export const NewRequest = () => {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [trigger, { data, isLoading, isSuccess, isError, error }] =
    useCreateRequestMutation()
  const [MLProjectTitle, setMLProjectTitle] = useState("")
  const [businessOwner, setBusinessOwner] = useState("")
  const [summary, setSummary] = useState("")
  const [openNotification, setOpenNotification] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    if (isError || isSuccess) {
      setOpenNotification(true)
    }
  }, [isSuccess, isError])

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
      <Snackbar // By some reason no close button appears
        open={openNotification}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(_e, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          if (isSaved) {
            navigate("/");
          } else {
            navigate("/request/" + data?.id);
          }
      
          setOpenNotification(false);
        }}
      >
        {
          isSuccess ? (
            <Alert
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Request has been {isSaved ? 'saved' : 'created'} successfully!
              {
                isSaved && "You will be redirected to the home page, shortly." 
              }
            </Alert>
          ) : isError ? (
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Sorry, something went wrong: <br />
              Status: {(error as FetchBaseQueryError)?.status} <br />
              Error message: {JSON.stringify((error as FetchBaseQueryError)?.data as any)}
            </Alert>
          ) : undefined // This code needs propper wrapper, I think. Something like global toast with custom messages
        }
      </Snackbar>
      <Card
        component="form"
        onSubmit={e => {
          e.preventDefault()
          trigger({
            title: MLProjectTitle,
            businessOwner,
            summary,
          })
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
        <Typography variant="h5">Create request</Typography>
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
          onChange={({ target: { value } }) => setMLProjectTitle(value)}
        />
        <TextField
          label="Who is business owner/unit of this solution?"
          InputLabelProps={{
            shrink: true,
          }}
          required
          placeholder="Enter owner/unit name"
          onChange={({ target: { value } }) => setBusinessOwner(value)}
        />
        <TextField
          label="Please provide a short summary of this project"
          multiline
          rows={5}
          required
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Type your answer"
          onChange={({ target: { value } }) => setSummary(value)}
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
          <Button 
           type="submit"
            variant="contained"
            data-no-navigate={true}
          >
            Save
          </Button>
          <Button type="submit" variant="contained" sx={{ marginLeft: "auto" }}>
            Next
          </Button>
        </CardActions>
      </Card>
    </Box>,
  ]
}
