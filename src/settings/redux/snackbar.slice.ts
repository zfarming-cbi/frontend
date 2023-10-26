import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { AlertColor } from "@mui/material"

export enum MesageSnackbar {
  Success = "Guardado con exito",
  Error = "Ocurrio un error",
}

interface SnackbarState {
  visible: boolean
  severity: AlertColor | undefined
  message: string
}

const initialState: SnackbarState = {
  visible: false,
  severity: undefined,
  message: "",
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.message = action.payload.message
      state.visible = action.payload.visible
      state.severity = action.payload.severity
    },
    closeSnackbar: (state) => {
      state.message = ""
      state.visible = false
      state.severity = undefined
    },
  },
})

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions
export const selectorSnackbar = (state: RootState) => state.snackbar
