import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { UserDTO } from "../../share/models/user"
import { PlantDTO } from "../../share/models/plant"
import { DeviceDTO } from "../../share/models/device"

interface DataFilterState {
  dataUserFilter?: UserDTO[]
  dataPlantFilter?: PlantDTO[]
  dataDeviceFilter?: DeviceDTO[]
}

const initialState: DataFilterState = {
  dataUserFilter: [],
  dataPlantFilter: [],
  dataDeviceFilter: [],
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
    setDataPlant: (
      state,
      action: PayloadAction<DataFilterState["dataPlantFilter"]>
    ) => {
      state.dataPlantFilter = action.payload
    },
    setDataDevice: (
      state,
      action: PayloadAction<DataFilterState["dataDeviceFilter"]>
    ) => {
      state.dataDeviceFilter = action.payload
    },
  },
})

export const { setDataUser } = dataFilterSlice.actions
export const { setDataPlant } = dataFilterSlice.actions
export const { setDataDevice } = dataFilterSlice.actions
export const selectorDataFilter = (state: RootState) => state.dataFilter
