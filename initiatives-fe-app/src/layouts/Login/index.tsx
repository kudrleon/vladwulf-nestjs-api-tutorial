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

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPassVisible, changePasswordVisibility] = useState(false)
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
        <Typography gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="h5" component="div">
          Please enter your login credentials below
        </Typography>
        <TextField
          id="outlined-basic"
          label="Login"
          variant="outlined"
          fullWidth={true}
          value={login}
          onChange={({target : { value }}) => setLogin(value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          fullWidth={true}
          type={isPassVisible ? "text" : "password"}
          value={password}
          onChange={({target : { value }}) => setPassword(value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => changePasswordVisibility(!isPassVisible)}
                edge="end"
              >
                {!isPassVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }}
        />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Rememeber my login?" />
      </CardContent>
      <CardActions>
        <Button variant="contained">Login</Button>
      </CardActions>
    </Card>
  </Box>;
};
