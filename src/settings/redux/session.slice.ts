import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppSession } from "../../share/models/appSession"
import { RootState } from "./store"

export const SessionInitialState: AppSession = {
  isLogged: false,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState: SessionInitialState,
  reducers: {
    logout: (state) => {
      state = SessionInitialState
    },
    logIn: (state, action: PayloadAction<AppSession>) => {
      state = action.payload
      return state
    },
  },
})

export const { logIn, logout } = sessionSlice.actions
export const selectorSession = (state: RootState) => state.session
