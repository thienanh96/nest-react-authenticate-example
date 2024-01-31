import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  IAuthUser,
  getCurrentUser,
  loginUser,
  registerUser,
} from "./authActions"
import { RootState } from "../../app/store"

export interface IAuthState {
  userInfo: IAuthUser | null
  error: any
  success: boolean
  loadingCurrentUser?: boolean
  signingUpUser?: boolean
  loggingUserIn?: boolean
}

const initialState: IAuthState = {
  loadingCurrentUser: true,
  signingUpUser: false,
  loggingUserIn: false,
  userInfo: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null
      state.success = false
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.signingUpUser = true
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IAuthUser>) => {
          state.signingUpUser = false
          state.success = true
          state.userInfo = action.payload

          localStorage.setItem("token", action.payload.token)
        },
      )
      .addCase(registerUser.rejected, (state, error) => {
        state.signingUpUser = false
        state.success = false
        state.error = error.payload as string[]
      })
      .addCase(loginUser.pending, (state) => {
        state.loggingUserIn = true
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IAuthUser>) => {
          state.loggingUserIn = false
          state.success = true
          state.userInfo = action.payload

          localStorage.setItem("token", action.payload.token)
        },
      )
      .addCase(loginUser.rejected, (state, error) => {
        state.loggingUserIn = false
        state.success = false
        state.error = error.payload as string[]
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loadingCurrentUser = true
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<IAuthUser>) => {
          state.loadingCurrentUser = false
          state.success = true
          state.userInfo = action.payload
        },
      )
      .addCase(getCurrentUser.rejected, (state) => {
        state.loadingCurrentUser = false
        state.success = false
        state.userInfo = null
      })
  },
})

export const logoutUser = authSlice.actions.logoutUser

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
