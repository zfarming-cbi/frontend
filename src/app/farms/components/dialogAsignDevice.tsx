import React from "react"
import { Card, CardContent, Grid } from "@mui/material"
import { PlantListRow, PlantsList } from "../../plant/components/plantList"
import { useGetPlantsQuery } from "../../../settings/api/endpoints/plant"
import { useGetDevicesQuery } from "../../../settings/api/endpoints/device"
import { DeviceList, DeviceListRow } from "../../device/components/deviceList"

interface Props {
  onSave(): void
  onCancel(): void
}

export const AsigmentDevice: React.FC<Props> = (props) => {
  const { data } = useGetPlantsQuery()
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

  const response = useGetDevicesQuery({ farmid: "" })

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
    <Grid>
      <PlantsList rows={plants} />
      <DeviceList rows={devices} />
      <Card sx={{ width: 250 }}>
        <CardContent>
          AQUI VAN LOS DATOS DEL ELEMENTO SELECCIONADO DE LA TABLA
        </CardContent>
      </Card>
    </Grid>
  )
}
