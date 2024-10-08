import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"

import { authInterceptor } from "../services/authInterceptor"
import { authSlice } from "../features/auth/authSlice"
import { questionAnswerAPI } from "../features/questionAnswer/questionAnswerAPISlice"
import { requestsAPI } from "../features/requests/requestsAPISlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { signUpSlice } from "../features/signup/signUpSlice"
import { usersAPI } from "../features/auth/usersAPISlice"

const rootReducer = combineSlices(
  authSlice,
  signUpSlice,
  requestsAPI,
  usersAPI,
  questionAnswerAPI,
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([
        authInterceptor,
        requestsAPI.middleware,
        usersAPI.middleware,
        questionAnswerAPI.middleware,
      ]),
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
