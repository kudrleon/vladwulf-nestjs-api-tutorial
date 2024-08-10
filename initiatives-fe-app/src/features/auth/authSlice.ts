import { getValueFromLS, saveValueToLS } from '../../utils/saveValueToLS';

import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { login } from './authAPI';

export interface AuthSliceState {
  token: string | null | false,
  loginFailed: string | null | boolean,
}

const initialState: AuthSliceState = {
  token: getValueFromLS('token', null),
  loginFailed: null,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    receiveToken: create.asyncThunk(
      async ({userName, password}: { [k: string]: string}) => {
        const response = await login(userName, password)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const { access_token } = await response.json();
        console.log('here', access_token);
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
          state.token += action.payload;
        },
        rejected: (state, { error: { message } }) => {
          console.log('rejected', message);
          state.token = false;
          state.loginFailed = message || 'Login failed: unknown error';
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectToken: authState => authState.token,
    selectLoginFailureStatus: authState => authState.loginFailed,
  },
})

// Action creators are generated for each case reducer function.
export const { receiveToken } =
  authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectToken, selectLoginFailureStatus } = authSlice.selectors
