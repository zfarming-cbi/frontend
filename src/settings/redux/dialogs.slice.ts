import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface DialogsState {
  formAssociate: {
    visible: boolean
    data?: any
  }
  formPQRS: {
    visible: boolean
    data?: any
  }
  formAssigment: {
    visible: boolean
    data?: any
  }
}

const initialState: DialogsState = {
  formAssociate: {
    visible: false,
    data: undefined,
  },
  formPQRS: {
    visible: false,
    data: undefined,
  },
  formAssigment: {
    visible: false,
    data: undefined,
  },
}

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    showFormToAddPQRS: (
      state,
      action: PayloadAction<DialogsState["formPQRS"]>
    ) => {
      state.formPQRS.visible = action.payload.visible
      state.formPQRS.data = action.payload.data
    },
    closeFormPQRS: (state) => {
      state.formPQRS.visible = false
      state.formPQRS.data = undefined
    },
  },
})

export const { showFormToAddPQRS, closeFormPQRS } = dialogsSlice.actions
export const selectorDialogs = (state: RootState) => state.dialogs
