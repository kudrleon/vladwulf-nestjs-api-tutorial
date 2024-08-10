import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { login } from './authAPI';
import { saveValueToLS } from '../../utils/saveValueToLS';

export interface AuthSliceState {
  token: string | null | false,
  loginFailed: string | null
}

const initialState: AuthSliceState = {
  token: null,
  loginFailed: null,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    setToken: create.reducer((state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload
    }),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    receiveToken: create.asyncThunk(
      async ({userName, password}: { [k: string]: string}) => {
        const response = await login(userName, password)
        const { access_token } = await response.json();
        saveValueToLS('token', access_token);
        return access_token;
      },
      {
        pending: state => {
          state.token = null;
          state.loginFailed = null;
        },
        fulfilled: (state, action) => {
          state.loginFailed = null;
          state.token += action.payload;
        },
        rejected: (state, action) => {
          state.token = false;
          state.loginFailed = action.message;
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
export const { setToken, receiveToken } =
  authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectToken, selectLoginFailureStatus } = authSlice.selectors
