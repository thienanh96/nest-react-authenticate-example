import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const backendURL = import.meta.env.VITE_BACKEND_URL

export interface IAuthUser {
  id: string
  username: string
  token: string
  email: string
}

export const registerUser = createAsyncThunk<
  any,
  {
    password: string
    firstname: string
    lastname: string
    username: string
    email: string
    phone: string
  }
>(
  "users/sign-up",
  async (
    { firstname, lastname, email, phone, username, password },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post<IAuthUser>(
        `${backendURL}/users/sign-up`,
        { firstname, lastname, email, phone, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      return data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const loginUser = createAsyncThunk<
  any,
  { userIdentifier: string; password: string }
>("users/login", async ({ userIdentifier, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<IAuthUser>(
      `${backendURL}/users/login`,
      { userIdentifier, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    return data
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

export const getCurrentUser = createAsyncThunk(
  "users/current",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IAuthUser>(
        `${backendURL}/users/current`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        },
      )

      return data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
