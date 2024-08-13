import { getValueFromLS, saveValueToLS } from '../../utils/saveValueToLS';

import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { login } from './authAPI';

export interface AuthSliceState {
  token: string | null | false,
  loginFailed: string | null | boolean,
  user: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
  }
}

const initialState: AuthSliceState = {
  token: getValueFromLS('token', null),
  loginFailed: null,
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    receiveToken: create.asyncThunk(
      async ({userName, password}: { [k: string]: string}) => {
        const response = await login(userName, password)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const { access_token } = await response.json();
        saveValueToLS('token', access_token);
        return access_token;
      },
      {
        pending: state => {
          state.token = null;
          state.loginFailed = false;
        },
        fulfilled: (state, action) => {
          state.loginFailed = null;
          state.token = action.payload;
        },
        rejected: (state, { error: { message } }) => {
          console.log('rejected', message);
          state.token = false;
          state.loginFailed = message || 'Login failed: unknown error';
        },
      },
    ),

    setUser : create.reducer((state, action: PayloadAction<{ id: string, firstName: string, lastName: string, email: string }>) => {
      state.user = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectToken: authState => authState.token,
    selectLoginFailureStatus: authState => authState.loginFailed,
    selectUser: authState => authState.user,
  },
})

// Action creators are generated for each case reducer function.
export const { receiveToken, setUser } =
  authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectToken, selectLoginFailureStatus, selectUser } = authSlice.selectors
