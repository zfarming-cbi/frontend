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
} from "@mui/material"
import { PlantListRow } from "../../plant/components/plantList"
import { useGetPlantsQuery } from "../../../settings/api/endpoints/plant"
import {
  useGetDevicesUnasignedQuery,
  useUpdateDeviceMutation,
} from "../../../settings/api/endpoints/device"
import { DeviceListRow } from "../../device/components/deviceList"
import { DataGrid, GridColDef, GridEventListener, esES } from "@mui/x-data-grid"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { closeAsignDevice } from "../../../settings/redux/dialogs.slice"

interface Props {
  onSave(): void
  onCancel(): void
}

const COLUMNS_DEF_PLANTS: GridColDef[] = [
  {
    field: "name",
    headerName: "Planta",
    width: 125,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "content",
    headerName: "Contenido",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
]

const COLUMNS_DEF_DEVICES: GridColDef[] = [
  { field: "code", headerName: "Código", width: 150 },
  { field: "name", headerName: "Nombre del dispositivo", flex: 1 },
]

export const AsigmentDevice: React.FC<Props> = (props) => {
  const { farmId = "" } = useParams()
  const [plantName, setPlantName] = useState<string>()
  const [plantContent, setPlantContent] = useState<string>()
  const [deviceName, setDeviceName] = useState<string>()
  const [deviceCode, setDeviceCode] = useState<string>()
  const [deviceId, setDeviceId] = useState<string>("")
  const [plantId, setPlantId] = useState<string>("")

  const [page, setPage] = useState(1)

  const { data: dataDevices, refetch: refetchDevices } =
    useGetDevicesUnasignedQuery()
  const { data, refetch } = useGetPlantsQuery({
    page: String(page),
    perPage: "10",
  })

  useEffect(() => {
    refetchDevices()
    refetch()
  }, [page])

  // const { data } = useGetPlantsQuery({
  //   page: "1",
  //   perPage: "10",
  // })
  console.log("DISPOSITIVOS SIN ASIGNAR", dataDevices)

  const [doUpdateDevice, { isLoading, error }] = useUpdateDeviceMutation()
  const dispatch = useAppDispatch()

  const plants = React.useMemo(() => {
    return (
      data?.map<PlantListRow>(
        ({ id, name, content, growing_time, devices }) => ({
          id,
          name,
          content,
          growing_time,
          devices: devices?.length,
        })
      ) ?? []
    )
  }, [data])

  const devices = React.useMemo(() => {
    return (
      dataDevices?.map<DeviceListRow>(({ id, name, description, code }) => ({
        id,
        name,
        description,
        code,
      })) ?? []
    )
  }, [data])

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
          page={page}
          onPageChange={(newPage) => {
            console.log(newPage)
            setPage(newPage)
          }}
        />
        <TextField
          fullWidth
          required
          label="Buscar planta"
          variant="outlined"
          name="searchPlant"
          id="searchPlant"
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
                disabled={isLoading}
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
                value={plantContent}
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
          {!!error && (
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
