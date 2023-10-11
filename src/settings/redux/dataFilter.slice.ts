import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { UserDTO } from "../../share/models/user"

interface DataFilterState {
  dataUserFilter?: UserDTO[]
}

const initialState: DataFilterState = {
  dataUserFilter: [],
}

export const dataFilterSlice = createSlice({
  name: "dataFilter",
  initialState,
  reducers: {
    setDataUser: (
      state,
      action: PayloadAction<DataFilterState["dataUserFilter"]>
    ) => {
      state.dataUserFilter = action.payload
    },
  },
})

export const { setDataUser } = dataFilterSlice.actions
export const selectorDataFilter = (state: RootState) => state.dataFilter
