import {
  Box,
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Navigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppSelector } from '../../app/hooks';

export const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPassVisible, changePasswordVisibility] = useState(false);
  const token = useAppSelector(state => state.auth.token);
  const loginFailed = useAppSelector(state => state.auth.loginFailed);
  if (token !== null && loginFailed === null) {
    return <Navigate to={'/'} />;
  }
  return<Box
    width="calc(100% - 35px)"
    height="calc(100vh - 200px)"
    my={4}
    display="flex"
    alignItems="center"
    justifyContent="center"
    gap={4}
    p={2}
  >
    <Card
      sx={{ minWidth: 275, maxWidth: 1080 }}
    >
      <CardContent>
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
          }}
        >
          Sign Up
        </Button>
      </CardActions>
    </Card>
  </Box>;
}
