import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRouter = () => {
  const auth = null;
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
