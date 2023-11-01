import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { UserDTO } from "../../share/models/user"
import { PlantDTO } from "../../share/models/plant"
import { DeviceDTO } from "../../share/models/device"
import { FarmDTO } from "../../share/models/farm"

interface DataFilterState {
  dataUserFilter?: UserDTO[]
  dataPlantFilter?: PlantDTO[]
  dataDeviceFilter?: DeviceDTO[]
  dataFarmFilter?: FarmDTO[]
}

const initialState: DataFilterState = {
  dataUserFilter: [],
  dataPlantFilter: [],
  dataDeviceFilter: [],
  dataFarmFilter: [],
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
    setDataFarm: (
      state,
      action: PayloadAction<DataFilterState["dataFarmFilter"]>
    ) => {
      state.dataFarmFilter = action.payload
    },
  },
})

export const { setDataUser, setDataPlant, setDataDevice, setDataFarm } =
  dataFilterSlice.actions

export const selectorDataFilter = (state: RootState) => state.dataFilter
