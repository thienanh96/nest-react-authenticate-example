import { store } from "./app/store"
import { PrimeReactProvider } from "primereact/api"
import { Provider } from "react-redux"

// tailwind css
import "./global.css"

// primreact css
import "primereact/resources/themes/lara-light-indigo/theme.css" // theme
import "primeicons/primeicons.css"
import "primereact/resources/primereact.css" // core css
import "./App.css"
import LoginForm from "./features/auth/LoginForm"
import RegisterForm from "./features/auth/RegisterForm"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getCurrentUser } from "./features/auth/authActions"
import { logoutUser, selectAuth } from "./features/auth/authSlice"
import { Button } from "@mui/material"

function App() {
  const [formType, setFormType] = useState<"login" | "register">("login")
  const dispatch = useAppDispatch()

  const auth = useAppSelector(selectAuth)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  return (
    <PrimeReactProvider>
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
    </PrimeReactProvider>
  )
}

export default App
