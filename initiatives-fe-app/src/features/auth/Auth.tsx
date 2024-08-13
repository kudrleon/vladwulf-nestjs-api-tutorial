import "./Auth.module.css";

import {
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { deleteValueFromLS, getValueFromLS, saveValueToLS } from '../../utils/saveValueToLS';
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  receiveToken,
} from "./authSlice";
import { useState } from "react";

export const Auth = () => {
  const dispatch = useAppDispatch()
  const [login, setLogin] = useState(getValueFromLS('login', ''));
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(getValueFromLS('save_login_checkbox', false));
  const [isPassVisible, changePasswordVisibility] = useState(false);
  const loginFailed = useAppSelector(state => state.auth.loginFailed);
  const token = useAppSelector(state => state.auth.token);
  const loadingLogin = loginFailed === false && token === null;
  return (

    <Card
      sx={{ minWidth: 275, maxWidth: 1080 }}
    >
      <CardContent>
        {
           loginFailed && <Typography color="error">
            {loginFailed}
          </Typography>
        }
        {
          loadingLogin && <Typography color="error">
            <LinearProgress />
          </Typography>
        }
        <Typography gutterBottom variant="h5">
          Welcome!
        </Typography>
        <Typography component="div">
          Please enter your login credentials below
        </Typography>
        <TextField
          id="outlined-basic"
          label="Login"
          variant="outlined"
          fullWidth={true}
          value={login}
          onChange={({ target: { value } }) => setLogin(value)}
          sx={{
            marginTop: '20px'
          }}
          disabled={loadingLogin}
        />
        <TextField
          id="outlined-basic"
          label="Password"
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
          disabled={loadingLogin}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(_e, checked) => setRememberMe(!rememberMe)}
            />
          }
          disabled={loadingLogin}
          label="Remember my login?" />
        <Typography>
          <Link to="/signup">Don't have account, click here</Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => {
            saveValueToLS('save_login_checkbox', rememberMe);
            if(rememberMe) {
              saveValueToLS('login', login);
            } else {
              deleteValueFromLS('login')
            }
            dispatch(receiveToken({ userName: login, password }))
          }}
          disabled={loadingLogin}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  )
}
