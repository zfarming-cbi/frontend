import * as React from "react"
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { useAppDispatch } from "../../settings/redux/hooks"
import { showFormCreateDevice } from "../../settings/redux/dialogs.slice"
import { useGetDevicesQuery } from "../../settings/api/endpoints/device"
import { DeviceList, DeviceListRow } from "./components/deviceList"

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
      action() {},
    },
  ]

  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useGetDevicesQuery({ farmId: "" })

  const devices = React.useMemo(() => {
    return (
      data?.map<DeviceListRow>(({ id, name, description, code }) => ({
        id,
        name,
        description,
        code,
      })) ?? []
    )
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de dispositivos" buttons={toolbarButtons} />
      <DeviceList rows={devices} />
    </Grid>
  )
}
