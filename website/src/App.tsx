import { store } from "./app/store"
import { Provider } from "react-redux"

// tailwind css
import "./global.css"

import "./App.css"
import LoginForm from "./features/auth/LoginForm"
import RegisterForm from "./features/auth/RegisterForm"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getCurrentUser } from "./features/auth/authActions"
import { logoutUser, selectAuth } from "./features/auth/authSlice"
import { Button, CircularProgress } from "@mui/material"

function App() {
  const [formType, setFormType] = useState<"login" | "register">("login")
  const dispatch = useAppDispatch()

  const auth = useAppSelector(selectAuth)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  if (auth.loadingCurrentUser) {
    return <CircularProgress />
  }

  return (
    <Provider store={store}>
      <div className="App bg-[#DAE0E6] h-lvh w-lvw overflow-auto">
        {auth.userInfo ? (
          <div className="p-12">
            <p>User logged in with profile:</p>
            <p>ID: {auth.userInfo.id}</p>
            <p>Email: {auth.userInfo.email}</p>
            <p>Username: {auth.userInfo.username}</p>
            <div className="mt-3">
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(logoutUser())
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <>
            {formType === "register" ? (
              <RegisterForm
                switchToLoginForm={() => {
                  setFormType("login")
                }}
              />
            ) : (
              <LoginForm
                switchToRegisterForm={() => {
                  setFormType("register")
                }}
              />
            )}
          </>
        )}
      </div>
    </Provider>
  )
}

export default App
