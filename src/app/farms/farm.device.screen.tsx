import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { useNavigate, useParams } from "react-router-dom"
import { useGetDevicesQuery } from "../../settings/api/endpoints/device"
import { Add as AddIcon } from "@mui/icons-material"
import { showAsignDevice } from "../../settings/redux/dialogs.slice"
import { useAppDispatch } from "../../settings/redux/hooks"
import { ROUTE_PATH } from "../../settings/routes/routes"
import { useGetFarmQuery } from "../../settings/api/endpoints/farm"
import { DateTime } from "luxon"
import { AppEnvVars } from "../../settings/env/environment"

export interface DeviceByFarmListRow {
  id?: string | number
  name: string
  description: string
  code: string
  plant?: any
  measurings?: any
}

export const DeviceByFarmScreen: React.FC = () => {
  const [title, setTitle] = React.useState<string>()
  const navigate = useNavigate()
  const { farmId } = useParams()

  const farm = useGetFarmQuery({ farmId })
  const devicesData = useGetDevicesQuery({ farmId })

  React.useEffect(() => {
    setTitle(farm?.data?.name)
  }, [farm])

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showAsignDevice({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]
  const dispatch = useAppDispatch()
  const devices = React.useMemo(() => {
    return (
      devicesData?.data?.map<DeviceByFarmListRow>(
        ({ id, name, description, code, plant, measurings }) => ({
          id,
          name,
          description,
          code,
          plant,
          measurings,
        })
      ) ?? []
    )
  }, [devicesData])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title={title} buttons={toolbarButtons} showButtonReturn={true} />
      <Grid item container gap={2} padding={2}>
        {devices.map((device, index) => (
          <Card sx={{ width: 250 }} key={index}>
            <CardActionArea
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                height: "100%",
              }}
              onClick={() =>
                navigate(
                  ROUTE_PATH.DeviceMeasuring.replace(
                    ":deviceId",
                    device.id?.toString() ?? ""
                  )
                )
              }
            >
              <CardMedia
                component="img"
                image={`${AppEnvVars.IMAGE_URL}${device.plant.image}`}
                alt="plant"
                height={131}
                width={132}
                sx={{ objectFit: "contain", alignSelf: "center" }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  paddingX: 1,
                  paddingY: 0,
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", py: 2, flexDirection: "column" }}>
                  <Typography variant={"h6"} fontWeight="bold" color={"grey"}>
                    {device.plant.name}
                  </Typography>
                  <Typography fontWeight="ligth" fontSize={12} color={"grey"}>
                    {device.name}
                  </Typography>
                </Box>
                {/* <Typography fontWeight="ligth" fontSize={12} color={"grey"}>
                  {device.code}
                </Typography> */}
                {!device.measurings && (
                  <Typography
                    fontWeight="ligth"
                    fontSize={15}
                    textAlign={"left"}
                    color={"grey"}
                  >
                    Ultima transmision: {""}
                    {DateTime.fromISO(
                      device.measurings.createdAt
                    ).toLocaleString(DateTime.DATETIME_MED)}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}
