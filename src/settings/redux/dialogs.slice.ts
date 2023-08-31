import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface DialogsState {
  formCreateUser: {
    visible: boolean
    data?: any
  }
  formPQRS: {
    visible: boolean
    data?: any
  }
  formCreateFarm: {
    visible: boolean
    data?: any
  }
}

const initialState: DialogsState = {
  formCreateUser: {
    visible: false,
    data: undefined,
  },
  formPQRS: {
    visible: false,
    data: undefined,
  },
  formCreateFarm: {
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
    showFormCreateUser: (
      state,
      action: PayloadAction<DialogsState["formCreateUser"]>
    ) => {
      state.formCreateUser.visible = action.payload.visible
      state.formCreateUser.data = action.payload.data
    },
    closeFormCreateUser: (state) => {
      state.formCreateUser.visible = false
      state.formCreateUser.data = undefined
    },
    showFormCreateFarm: (
      state,
      action: PayloadAction<DialogsState["formCreateFarm"]>
    ) => {
      state.formCreateFarm.visible = action.payload.visible
      state.formCreateFarm.data = action.payload.data
    },
    closeFormCreateFarm: (state) => {
      state.formCreateFarm.visible = false
      state.formCreateFarm.data = undefined
    },
  },
})

export const {
  showFormToAddPQRS,
  closeFormPQRS,
  showFormCreateUser,
  closeFormCreateUser,
  showFormCreateFarm,
  closeFormCreateFarm,
} = dialogsSlice.actions
export const selectorDialogs = (state: RootState) => state.dialogs
