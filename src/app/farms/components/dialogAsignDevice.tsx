import React, { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { PlantListRow } from "../../plant/components/plantList"
import { useGetPlantsQuery } from "../../../settings/api/endpoints/plant"
import {
  useGetDevicesQuery,
  useUpdateDeviceMutation,
} from "../../../settings/api/endpoints/device"
import { DeviceListRow } from "../../device/components/deviceList"
import { DataGrid, GridColDef, GridEventListener, esES } from "@mui/x-data-grid"
import LOGO_FULL from "../../../assets/logo-2.png"
import { useParams } from "react-router-dom"

interface Props {
  onSave(): void
  onCancel(): void
}

const COLUMNS_DEF_PLANTS: GridColDef[] = [
  { field: "name", headerName: "Nombre planta", width: 150 },
  { field: "content", headerName: "Contenido", flex: 1 },
]

const COLUMNS_DEF_DEVICES: GridColDef[] = [
  { field: "code", headerName: "Código", width: 150 },
  { field: "name", headerName: "Nombre del dispositivo", flex: 1 },
]

export const AsigmentDevice: React.FC<Props> = (props) => {
  const [plantName, setPlantName] = useState<string>()
  const [deviceName, setDeviceName] = useState<string>()
  const [deviceCode, setDeviceCode] = useState<string>()
  const [deviceId, setDeviceId] = useState<string>("")
  const { farmId = "" } = useParams()
  const [plantId, setPlantId] = useState<string>("")
  const { data } = useGetPlantsQuery()
  const [doUpdateDevice, { isLoading, error }] = useUpdateDeviceMutation()

  const plants = React.useMemo(() => {
    return (
      data?.map<PlantListRow>(({ id, name, content, growing_time }) => ({
        id,
        name,
        content,
        growing_time,
      })) ?? []
    )
  }, [data])

  const response = useGetDevicesQuery({ farmId: "" })

  const onClickRowDevice: GridEventListener<"rowClick"> = ({ row }) => {
    setDeviceName(row.name)
    setDeviceCode(row.code)
    setDeviceId(row.id)
  }
  const onClickRowPlant: GridEventListener<"rowClick"> = ({ row }) => {
    setPlantName(row.name)
    setPlantId(row.id)
  }
  const onClickAssignDevice = () => {
    doUpdateDevice({ farmId, plantId, id: deviceId })
  }

  const devices = React.useMemo(() => {
    return (
      response.data?.map<DeviceListRow>(({ id, name, description, code }) => ({
        id,
        name,
        description,
        code,
      })) ?? []
    )
  }, [data])

  return (
    <Grid container gap={1} flexDirection={"row"}>
      <Grid item xs>
        <Grid item xs>
          <TextField
            fullWidth
            required
            label="Buscar dispositivo"
            variant="outlined"
            name="searchDevice"
            id="searchDevice"
          />
        </Grid>
        <Grid item xs>
          <DataGrid
            rows={devices}
            columns={COLUMNS_DEF_DEVICES}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            density="compact"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            autoPageSize
            onRowClick={onClickRowDevice}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            required
            label="Buscar planta"
            variant="outlined"
            name="searchPlant"
            id="searchPlant"
          />
        </Grid>
        <Grid item xs>
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
      </Grid>

      <Grid item xs={3}>
        <Card sx={{ width: 250 }}>
          <CardMedia
            component="img"
            image={LOGO_FULL}
            alt="plant"
            height={131}
            width={132}
            sx={{ objectFit: "contain", alignSelf: "center" }}
          />
          <CardContent>
            <Typography fontWeight="ligth" fontSize={15} color={"grey"}>
              {plantName}
            </Typography>
            <Typography fontWeight="ligth" fontSize={15} color={"grey"}>
              {deviceName}
            </Typography>
            <Typography fontWeight="ligth" fontSize={15} color={"grey"}>
              {deviceCode}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={onClickAssignDevice}>Asignar</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
