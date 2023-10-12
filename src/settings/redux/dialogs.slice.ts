import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface DialogsState {
  formCreateUser: {
    visible: boolean
    data?: any
  }
  formSearchUser: {
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
  formCreateDevice: {
    visible: boolean
    data?: any
  }
  formSearchDevice: {
    visible: boolean
    data?: any
  }
  assignDevice: {
    visible: boolean
    data?: any
  }
  formCreatePlant: {
    visible: boolean
    data?: any
  }
  formSearchPlant: {
    visible: boolean
    data?: any
  }

  formCopyPlant: {
    visible: boolean
    data?: any
  }
}

const initialState: DialogsState = {
  formCreateUser: {
    visible: false,
    data: undefined,
  },
  formSearchUser: {
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
  formCreateDevice: {
    visible: false,
    data: undefined,
  },
  formSearchDevice: {
    visible: false,
    data: undefined,
  },
  assignDevice: {
    visible: false,
    data: undefined,
  },
  formCreatePlant: {
    visible: false,
    data: undefined,
  },
  formSearchPlant: {
    visible: false,
    data: undefined,
  },
  formCopyPlant: {
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
    showFormSearchUser: (
      state,
      action: PayloadAction<DialogsState["formSearchUser"]>
    ) => {
      state.formSearchUser.visible = action.payload.visible
      state.formSearchUser.data = action.payload.data
    },
    closeFormSearchUser: (state) => {
      state.formSearchUser.visible = false
      state.formSearchUser.data = undefined
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
    showFormCreateDevice: (
      state,
      action: PayloadAction<DialogsState["formCreateDevice"]>
    ) => {
      state.formCreateDevice.visible = action.payload.visible
      state.formCreateDevice.data = action.payload.data
    },
    closeFormCreateDevice: (state) => {
      state.formCreateDevice.visible = false
      state.formCreateDevice.data = undefined
    },
    showFormSearchDevice: (
      state,
      action: PayloadAction<DialogsState["formSearchDevice"]>
    ) => {
      state.formSearchDevice.visible = action.payload.visible
      state.formSearchDevice.data = action.payload.data
    },
    closeFormSearchDevice: (state) => {
      state.formSearchDevice.visible = false
      state.formSearchDevice.data = undefined
    },
    showAsignDevice: (
      state,
      action: PayloadAction<DialogsState["assignDevice"]>
    ) => {
      state.assignDevice.visible = action.payload.visible
      state.assignDevice.data = action.payload.data
    },
    closeAsignDevice: (state) => {
      state.assignDevice.visible = false
      state.assignDevice.data = undefined
    },
    showFormCreatePlant: (
      state,
      action: PayloadAction<DialogsState["formCreatePlant"]>
    ) => {
      state.formCreatePlant.visible = action.payload.visible
      state.formCreatePlant.data = action.payload.data
    },
    closeFormCreatePlant: (state) => {
      state.formCreatePlant.visible = false
      state.formCreatePlant.data = undefined
    },
    showFormSearchPlant: (
      state,
      action: PayloadAction<DialogsState["formSearchPlant"]>
    ) => {
      state.formSearchPlant.visible = action.payload.visible
      state.formSearchPlant.data = action.payload.data
    },
    closeFormSearchPlant: (state) => {
      state.formSearchPlant.visible = false
      state.formSearchPlant.data = undefined
    },

    showFormCopyPlant: (
      state,
      action: PayloadAction<DialogsState["formCopyPlant"]>
    ) => {
      state.formCopyPlant.visible = action.payload.visible
      state.formCopyPlant.data = action.payload.data
    },
    closeFormCopyPlant: (state) => {
      state.formCopyPlant.visible = false
      state.formCopyPlant.data = undefined
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
  showFormCreateDevice,
  closeFormCreateDevice,
  showFormCreatePlant,
  closeFormCreatePlant,
  closeAsignDevice,
  showAsignDevice,
  closeFormSearchUser,
  showFormSearchUser,
  showFormCopyPlant,
  closeFormCopyPlant,
  showFormSearchDevice,
  closeFormSearchDevice,
  showFormSearchPlant,
  closeFormSearchPlant,
} = dialogsSlice.actions
export const selectorDialogs = (state: RootState) => state.dialogs
