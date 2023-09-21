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
import LOGO_FULL from "../../assets/logo-2.png"
import { useNavigate, useParams } from "react-router-dom"
import { useGetDevicesQuery } from "../../settings/api/endpoints/device"
import { Add as AddIcon } from "@mui/icons-material"
import { showAsignDevice } from "../../settings/redux/dialogs.slice"
import { useAppDispatch } from "../../settings/redux/hooks"
import { useGetMeasuringsQuery } from "../../settings/api/endpoints/measuringHistory"
import { ROUTE_PATH } from "../../settings/routes/routes"

export interface DeviceByFarmListRow {
  id?: string | number
  name: string
  description: string
  code: string
}

export const DeviceByFarmScreen: React.FC = () => {
  const navigate = useNavigate()
  const { farmId } = useParams()
  const { data, isLoading, error } = useGetDevicesQuery({ farmId })

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
      data?.map<DeviceByFarmListRow>(({ id, name, description, code }) => ({
        id,
        name,
        description,
        code,
      })) ?? []
    )
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Dispositivos por granja" buttons={toolbarButtons} />
      <Grid item container gap={2} padding={2}>
        {devices.map((device, index) => (
          <Card sx={{ width: 250 }}>
            <CardActionArea
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
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
                image={LOGO_FULL}
                alt="plant"
                height={131}
                width={132}
                sx={{ objectFit: "contain", alignSelf: "center" }}
              />
              <CardContent sx={{ display: "flex", flex: 1, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    height: "125px",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    fontWeight="ligth"
                    fontSize={20}
                    textAlign={"center"}
                    color={"black"}
                  >
                    {device.name}
                  </Typography>
                  <Box marginY={2} width={"100%"}>
                    <Typography
                      fontWeight="ligth"
                      fontSize={15}
                      textAlign={"left"}
                      color={"grey"}
                    >
                      {device.code}
                    </Typography>
                  </Box>
                  <Box marginY={2} width={"100%"}>
                    <Typography
                      fontWeight="ligth"
                      fontSize={15}
                      textAlign={"left"}
                      color={"grey"}
                    >
                      {device.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}
