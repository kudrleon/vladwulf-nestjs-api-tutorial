import { createAppSlice } from "../../app/createAppSlice"
import { signUp as signeUpAPI } from './signupAPI';

export interface AuthSliceState {
  signedUp: boolean | null,
  error: string | null | boolean,
  isLoading: boolean,
}

const initialState: AuthSliceState = {
  signedUp: null,
  isLoading: false,
  error: null
}

export const signUpSlice = createAppSlice({
  name: "signup",
  initialState,
  reducers: create => ({
    signUp: create.asyncThunk(
      async ({userName, password}: { [k: string]: string}) => {
        const response = await signeUpAPI(userName, password)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

      },
      {
        pending: state => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.signedUp = true;
          state.isLoading = false;
        },
        rejected: (state, { error: { message } }) => {
          state.signedUp = false;
          state.error = message || 'Login failed: unknown error';
          state.isLoading = false;
        },
      },
    ),
  }),
  selectors: {
    signedUpSelector: authState => authState.signedUp,
    isLoadingSelector: authState => authState.isLoading,
    errorSelector: authState => authState.error,
  },
})

// Action creators are generated for each case reducer function.
export const { signUp } =
  signUpSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { signedUpSelector, isLoadingSelector, errorSelector } = signUpSlice.selectors
