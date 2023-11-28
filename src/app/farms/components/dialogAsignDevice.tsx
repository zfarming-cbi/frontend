import React, { useEffect, useState } from "react"
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { PlantListRow } from "../../plant/components/plantList"
import { useLazyGetPlantsQuery } from "../../../settings/api/endpoints/plant"
import {
  useGetDevicesUnasignedQuery,
  useLazyGetDevicesUnasignedQuery,
  useUpdateDeviceMutation,
} from "../../../settings/api/endpoints/device"
import { DeviceListRow } from "../../device/components/deviceList"
import { DataGrid, GridColDef, GridEventListener, esES } from "@mui/x-data-grid"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../settings/redux/hooks"
import { closeAsignDevice } from "../../../settings/redux/dialogs.slice"
import {
  selectorDataFilter,
  setDataDevice,
  setDataPlant,
} from "../../../settings/redux/dataFilter.slice"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"

interface Props {
  onSave(): void
  onCancel(): void
}

export const AsigmentDevice: React.FC<Props> = (props) => {
  const { farmId = "" } = useParams()
  const filteredData = useAppSelector(selectorDataFilter)
  const [plantName, setPlantName] = useState<string>()
  const [plantContent, setPlantContent] = useState<string>()
  const [deviceName, setDeviceName] = useState<string>()
  const [deviceCode, setDeviceCode] = useState<string>()
  const [deviceId, setDeviceId] = useState<string>("")
  const [plantId, setPlantId] = useState<string>("")
  const [filterPlant, setFilterPlant] = React.useState<string>("")
  const [filterDevice, setFilterDevice] = React.useState<string>("")
  const isXsScreen = useMediaQuery("(max-width:600px)")
  const isSmScreen = useMediaQuery("(min-width:601px) and (max-width:960px)")
  const COLUMNS_DEF_PLANTS: GridColDef[] = [
    {
      field: "name",
      headerName: "Planta",
      width: 125,
    },
    {
      field: "content",
      headerName: "Contenido",
      flex: 1,
      hide: isXsScreen || isSmScreen,
      renderCell: (params) => truncateContent(params.row.content),
    },
  ]

  const COLUMNS_DEF_DEVICES: GridColDef[] = [
    { field: "code", headerName: "Código", width: 150 },
    {
      field: "name",
      headerName: "Nombre del dispositivo",
      flex: 1,
      hide: isXsScreen || isSmScreen,
    },
  ]

  const [doGetPlants, { data: searchPlants, isLoading, error }] =
    useLazyGetPlantsQuery()
  const [doGetDevices, { data: dataDevices }] =
    useLazyGetDevicesUnasignedQuery()

  React.useEffect(() => {
    doGetPlants({
      perPage: "10",
      page: "1",
      search: filterPlant,
    })
  }, [filterPlant])

  React.useEffect(() => {
    doGetDevices({
      perPage: "10",
      page: "1",
      search: filterDevice,
    })
  }, [filterDevice])

  React.useEffect(() => {
    dispatch(setDataPlant(searchPlants))
  }, [searchPlants])

  React.useEffect(() => {
    dispatch(setDataDevice(dataDevices))
  }, [dataDevices])

  const [
    doUpdateDevice,
    { isLoading: loadDevice, error: errorDevice, isSuccess, reset },
  ] = useUpdateDeviceMutation()
  const dispatch = useAppDispatch()
  const truncateContent = (content: string) => {
    const textWithoutHtml = content.replace(/<[^>]*>/g, "")
    const textWithoutMd = textWithoutHtml.replace(/(\\|_|\*||~~|`)(.*?)\1/g, "")
    const textPlane = textWithoutMd.replace(/[*#\\]/g, "")
    if (textPlane.length > 100) {
      return textPlane.substring(0, 100) + "..."
    } else {
      return textPlane
    }
  }

  useEffect(() => {
    if (!loadDevice && !isSuccess) {
      return
    }
    dispatch(
      showSnackbar({
        visible: true,
        message: MesageSnackbar.Success,
        severity: "success",
      })
    )
    reset()
  }, [loadDevice, isSuccess])

  useEffect(() => {
    if (!errorDevice) {
      return
    }
    dispatch(
      showSnackbar({
        visible: true,
        message: MesageSnackbar.Error,
        severity: "error",
      })
    )
  }, [errorDevice])

  const plants = React.useMemo(() => {
    return (
      filteredData.dataPlantFilter?.map<PlantListRow>(
        ({ id, name, content, growing_time, devices }) => ({
          id,
          name,
          content,
          growing_time,
          devices: devices?.length,
        })
      ) ?? []
    )
  }, [filteredData.dataPlantFilter])

  const devices = React.useMemo(() => {
    return (
      dataDevices?.map<DeviceListRow>(({ id, name, description, code }) => ({
        id,
        name,
        description,
        code,
      })) ?? []
    )
  }, [filteredData.dataDeviceFilter])

  const onClickRowDevice: GridEventListener<"rowClick"> = ({ row }) => {
    setDeviceName(row.name)
    setDeviceCode(row.code)
    setDeviceId(row.id)
  }
  const onClickRowPlant: GridEventListener<"rowClick"> = ({ row }) => {
    setPlantContent(row.content)
    setPlantName(row.name)
    setPlantId(row.id)
  }
  const onClickAssignDevice = () => {
    doUpdateDevice({ farmId, plantId, id: deviceId })
    dispatch(closeAsignDevice())
  }

  return (
    <Grid container gap={1} flexDirection={"row"}>
      <Grid item xs={5}>
        <TextField
          fullWidth
          required
          label="Buscar dispositivo"
          variant="outlined"
          name="searchDevice"
          id="searchDevice"
          onChange={(e) => setFilterDevice(e.target.value)}
        />
        <DataGrid
          rows={devices}
          columns={COLUMNS_DEF_DEVICES}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          density="compact"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          onRowClick={onClickRowDevice}
          autoPageSize
        />
        <TextField
          fullWidth
          required
          label="Buscar planta"
          variant="outlined"
          name="searchPlant"
          id="searchPlant"
          onChange={(e) => setFilterPlant(e.target.value)}
        />
        <DataGrid
          rows={plants}
          columns={COLUMNS_DEF_PLANTS}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          density="compact"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          autoPageSize
          onRowClick={onClickRowPlant}
        />
      </Grid>

      <Grid item xs={6}>
        <Card sx={{ flex: 1, mt: 1 }}>
          <CardContent>
            <Typography
              paddingBottom={1}
              variant="h6"
              noWrap
              textAlign={"center"}
              color={"grey"}
            >
              Dispositivo y planta
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {!!deviceName && (
              <TextField
                fullWidth
                required
                label="Nombre del dispositivo"
                variant="outlined"
                name="nameDevice"
                id="nameDevice"
                value={deviceName}
                disabled={loadDevice}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
            {!!deviceName && (
              <TextField
                fullWidth
                required
                label="Código del dispositivo"
                variant="outlined"
                name="codeDevice"
                id="codeDevice"
                value={deviceCode}
                disabled={isLoading}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
            {!!plantName && (
              <TextField
                fullWidth
                required
                label="Nombre de la planta"
                variant="outlined"
                name="namePlant"
                id="namePlant"
                value={plantName}
                disabled={isLoading}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
            {!!plantContent && (
              <TextField
                fullWidth
                multiline
                required
                label="Contenido de la planta"
                variant="outlined"
                name="contentPlant"
                id="contentPlant"
                maxRows={7}
                value={truncateContent(plantContent)}
                disabled={isLoading}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          </CardContent>
          {!!plantName && !!deviceName && (
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button disabled={isLoading} onClick={onClickAssignDevice}>
                Asignar
              </Button>
            </CardActions>
          )}
          {!!errorDevice && (
            <Alert
              sx={{
                marginTop: 1,
                textAlign: "left",
                fontSize: 10,
                alignItems: "center",
              }}
              severity="error"
              variant="filled"
            >
              lo sentimos en este momento no podemos validar la información
            </Alert>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}
