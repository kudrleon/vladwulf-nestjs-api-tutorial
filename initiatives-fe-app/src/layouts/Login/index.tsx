import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Box,
  Button,
  CardActions,
  Checkbox,
  FormControlLabel, IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { deleteValueFromLS, getValueFromLS, saveValueToLS } from '../../utils/saveValueToLS';

export const Login = () => {
  const [login, setLogin] = useState(getValueFromLS('login', ''));
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(getValueFromLS('save_login_checkbox', false));
  const [isPassVisible, changePasswordVisibility] = useState(false);
  return <Box
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
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(_e, checked) => setRememberMe(!rememberMe)}
            />
          }
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
          }}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  </Box>;
};
