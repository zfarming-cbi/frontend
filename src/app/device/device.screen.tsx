import * as React from "react"
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  showFormCreateDevice,
  showFormSearchDevice,
} from "../../settings/redux/dialogs.slice"
import { useGetDevicesQuery } from "../../settings/api/endpoints/device"
import { DeviceList, DeviceListRow } from "./components/deviceList"
import {
  selectorDataFilter,
  setDataDevice,
} from "../../settings/redux/dataFilter.slice"

export const DeviceScreen = () => {
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showFormCreateDevice({
            visible: true,
            data: {},
          })
        )
      },
    },
    {
      icon: <FilterIcon />,
      action() {
        dispatch(
          showFormSearchDevice({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]

  const dispatch = useAppDispatch()

  const { data } = useGetDevicesQuery({ page: "1", perPage: "10", search: "" })

  React.useEffect(() => {
    dispatch(setDataDevice(data))
  }, [data])

  const filteredData = useAppSelector(selectorDataFilter)

  const devices = React.useMemo(() => {
    return (
      filteredData.dataDeviceFilter?.map<DeviceListRow>(
        ({ id, name, description, code }) => ({
          id,
          name,
          description,
          code,
        })
      ) ?? []
    )
  }, [filteredData])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de dispositivos" buttons={toolbarButtons} />
      <DeviceList rows={devices} />
    </Grid>
  )
}
