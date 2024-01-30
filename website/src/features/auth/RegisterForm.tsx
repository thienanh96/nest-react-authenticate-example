import { Field, Form, Formik } from "formik"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { registerUser } from "./authActions"
import Logo from "../../../public/logo.svg"
import { ReactSVG } from "react-svg"
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import * as Yup from "yup"
import { MuiTelInput } from "mui-tel-input"
import { selectAuth } from "./authSlice"
import { parsePhoneNumber } from "libphonenumber-js/max"
import FormHeader from "../../common/components/FormHeader"

interface RegisterFormProps {
  switchToLoginForm: () => void
}

export default function RegisterForm({ switchToLoginForm }: RegisterFormProps) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)

  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="sticky w-[1000px] h-[870px] rounded-3xl top-[20%] left-1/4 bg-white p-[30px]">
      <div className="flex justify-evenly gap-5">
        <div className="w-1/2" style={{ borderRight: "1px solid #EBEBEB" }}>
          <FormHeader
            headline="CREATE NEW ACCOUNT"
            secondaryHeadline="Build smart risk free"
          />

          <p className="text-left mt-[30px]">
            Understand why Viact is being used on millions of customers everyday
          </p>

          <p className="text-left mt-[30px]">
            Find out if Viact is the right fit for your business
          </p>

          <p className="text-left mt-[30px]">
            Get all your questions answered (personally)
          </p>

          <p className="text-left mt-[30px]">
            Completely risk-free with 14-day free trial and a 30-day money back
            guarantee!
          </p>
        </div>
        <div className="w-1/2">
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              username: "",
              phone: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              const { username, password, firstname, lastname, phone, email } =
                values

              dispatch(
                registerUser({
                  username,
                  password,
                  firstname,
                  lastname,
                  phone,
                  email,
                }),
              )

              actions.setSubmitting(false)
            }}
          >
            {({
              setFieldValue,
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
              isValid,
              dirty,
            }) => {
              return (
                <div>
                  <Form className="text-left">
                    <TextField
                      fullWidth
                      name={"firstname"}
                      label={"First Name"}
                      value={values.firstname}
                      style={{ marginTop: 24 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstname && !!errors.firstname}
                      InputProps={{ classes: { input: "h-[53px]" } }}
                      helperText={touched.firstname && errors.firstname}
                    />

                    <TextField
                      fullWidth
                      style={{ marginTop: 12 }}
                      name={"lastname"}
                      label={"Last Name"}
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastname && !!errors.lastname}
                      helperText={touched.lastname && errors.lastname}
                    />
                    <TextField
                      fullWidth
                      name={"username"}
                      style={{ marginTop: 12 }}
                      label={"User Name"}
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />

                    <TextField
                      fullWidth
                      name={"email"}
                      style={{ marginTop: 12 }}
                      label={"Email"}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />

                    <MuiTelInput
                      fullWidth
                      label={"Phone Number"}
                      value={values.phone}
                      defaultCountry="VN"
                      style={{ marginTop: 12 }}
                      onChange={(value) => {
                        setFieldValue("phone", value)
                      }}
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />

                    <TextField
                      fullWidth
                      name={"password"}
                      style={{ marginTop: 12 }}
                      label={"Password"}
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />

                    <TextField
                      fullWidth
                      name={"confirmPassword"}
                      style={{ marginTop: 12 }}
                      label={"Confirm Password"}
                      type={showPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
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
                        SIGN UP
                      </Button>
                    </div>
                  </Form>

                  <div className="pl-5 pr-5">
                    <p className="mt-5 text-center text-sm text-gray-500">
                      By clicking Sign up or Continue with Google, you agree to
                      viAct’s{" "}
                      <a className="font-semibold cursor-pointer text-rose-500">
                        Terms and Conditions for Free Trial.
                      </a>
                    </p>

                    <p className="mt-5 text-center text-sm text-gray-500">
                      Already has an account?{" "}
                      <span
                        className="font-semibold text-rose-500 cursor-pointer"
                        onClick={() => switchToLoginForm()}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </div>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First Name is Required.")
    .min(1, "First Name is Too Short."),
  lastname: Yup.string()
    .required("Last Name is Required.")
    .min(1, "Last Name is Too Short."),
  email: Yup.string().email().required("Email is Required."),
  password: Yup.string()
    .required("No password provided.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Must contain at least 8 characters, a combination of upper, lower case, number and at least one special character",
    ),
  confirmPassword: Yup.string().test(
    "passwordMatchValidation",
    "Unmatch password",
    function (confirmPassword) {
      const { password } = this.parent
      return password === confirmPassword
    },
  ),
  phone: Yup.string()
    .required("Phone is required,")
    .test("phoneNumberValidation", "Invalid phone number", function (phone) {
      try {
        return parsePhoneNumber(phone).isValid()
      } catch (error) {
        return false
      }
    }),
})
