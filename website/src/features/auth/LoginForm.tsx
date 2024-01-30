import { Form, Formik } from "formik"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loginUser } from "./authActions"
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import * as Yup from "yup"
import { selectAuth } from "./authSlice"
import FormHeader from "../../common/components/FormHeader"

interface RegisterFormProps {
  switchToRegisterForm: () => void
}

export default function LoginForm({ switchToRegisterForm }: RegisterFormProps) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)

  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="sticky w-[520px] h-[680px] rounded-3xl top-[20%] left-[40%] bg-white p-[40px]">
      <FormHeader headline="LOGIN" secondaryHeadline="Welcome Back" />
      <Formik
        initialValues={{
          userIdentifier: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const { userIdentifier, password } = values

          dispatch(
            loginUser({
              userIdentifier,
              password,
            }),
          )

          actions.setSubmitting(false)
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors, isValid }) => {
          return (
            <div>
              <Form className="text-left mt-3">
                <TextField
                  fullWidth
                  name={"userIdentifier"}
                  label={"Username or Email"}
                  value={values.userIdentifier}
                  style={{ marginTop: 24 }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.userIdentifier && !!errors.userIdentifier}
                  helperText={touched.userIdentifier && errors.userIdentifier}
                />

                <TextField
                  fullWidth
                  name={"password"}
                  style={{ marginTop: 20 }}
                  label={"Password"}
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setShowPassword(e.target.checked)
                      }}
                    />
                  }
                  label="Show password"
                  className="text-left mt-1"
                />

                {auth.error && (
                  <p className="text-rose-500">{auth.error.toString()}</p>
                )}

                <div className="mt-5">
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    className="h-[48px]"
                    disabled={!isValid}
                  >
                    LOGIN
                  </Button>
                </div>
                <p className="text-center mt-3">OR</p>

                <div className="mt-5">
                  <Button
                    type="button"
                    fullWidth
                    color="error"
                    variant="contained"
                    className="h-[48px]"
                    disabled={!isValid}
                  >
                    LOGIN WITH GOOGLE
                  </Button>
                </div>
              </Form>

              <div className="pl-5 pr-5">
                <p className="mt-5 text-center text-sm text-gray-500">
                  Not on Viact yet?{" "}
                  <span
                    className="font-semibold text-rose-500 cursor-pointer"
                    onClick={() => switchToRegisterForm()}
                  >
                    Signup
                  </span>{" "}
                  now
                </p>
              </div>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

const validationSchema = Yup.object().shape({
  userIdentifier: Yup.string().required("Username or Email required."),
  password: Yup.string().required("No password provided."),
})
