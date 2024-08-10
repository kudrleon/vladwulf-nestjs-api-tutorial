import "./SignUp.module.css";

import {
  Button,
  CardActions,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { errorSelector, isLoadingSelector, signedUpSelector } from "./signUpSlice";
import { redirect, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  signUp,
} from "./signUpSlice";

export const SignUp = () => {
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPassVisible, changePasswordVisibility] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isLoading = useAppSelector(isLoadingSelector);
  const error = useAppSelector(errorSelector);
  const signedUp = useAppSelector(signedUpSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (signedUp) {
      setUserName('');
      setPassword('');
      setSuccessMessage('You have successfully signed up!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
    if (isLoading) {
      setSuccessMessage('');
      setErrorMessage('');
    }
    if (error) {
      setErrorMessage(error.toString());
    }
  }, [signedUp, isLoading, error]);
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 1080 }}
    >
      <CardContent>
        {
          successMessage && <Typography color="success">
            {successMessage}
          </Typography>
        }
        {
          errorMessage && <Typography color="error">
            {errorMessage}
          </Typography>
        }
        {
          isLoading && <Typography color="error">
            <LinearProgress />
          </Typography>
        }
        <Typography gutterBottom variant="h5">
          Sign Up
        </Typography>
        <TextField
          id="outlined-basic"
          label="Please enter your desired username"
          variant="outlined"
          fullWidth={true}
          value={userName}
          onChange={({ target: { value } }) => setUserName(value)}
          onBlur={({ target: { value }}) => {
            // Check if username availiable
            console.log(value);
          }}
          sx={{
            marginTop: '20px'
          }}
        />
        <TextField
          id="outlined-basic"
          label="Choose password"
          variant="outlined"
          fullWidth={true}
          type={isPassVisible ? 'text' : 'password'}
          value={password}
          sx={{
            marginTop: '20px'
          }}
          onChange={({ target: { value } }) => setPassword(value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => changePasswordVisibility(!isPassVisible)}
                edge="end"
              >
                {!isPassVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>,
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(signUp({userName, password}));
          }}
        >
          Sign Up
        </Button>
      </CardActions>
    </Card>
  )
}
