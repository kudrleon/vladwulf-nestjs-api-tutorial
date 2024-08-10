import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';

export const PrivateRouter = () => {
  console.log('here')
  const token = useAppSelector(state => state.auth.token);
  console.log('token', token);
  return token ? <Outlet /> : <Navigate to="/login" />;
}
