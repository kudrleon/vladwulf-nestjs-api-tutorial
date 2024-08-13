import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';

export const PrivateRouter = () => {
  const token = useAppSelector(state => state.auth.token);
  
  return token ? <Outlet /> : <Navigate to="/login" />;
}
