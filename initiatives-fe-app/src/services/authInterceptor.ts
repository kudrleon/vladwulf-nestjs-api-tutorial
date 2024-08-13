import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

import { deleteValueFromLS } from '../utils/saveValueToLS';

export const authInterceptor: Middleware = () => (next) => (action: any) => {
  if (isRejectedWithValue(action) && action.payload.status === 401) {
    deleteValueFromLS('token');
    window.location.href = '/login';
  }

  return next(action);
};
