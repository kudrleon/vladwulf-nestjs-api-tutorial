import React, { useState } from 'react';

import {
  Box
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { SignUp as SignUpFeature } from '../../features/signup/SignUp';
import { useAppSelector } from '../../app/hooks';

export const SignUp = () => {
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
    <SignUpFeature />
  </Box>;
}
