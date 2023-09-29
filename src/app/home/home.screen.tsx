import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { useGetFarmsQuery } from "../../settings/api/endpoints/farm"
import { useAppDispatch } from "../../settings/redux/hooks"
import { showFormCreateFarm } from "../../settings/redux/dialogs.slice"
import { DateTime } from "luxon"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"

export interface FarmListRow {
  id?: string | number
  name: string
  description: string
  start_crop_dt: string
  end_crop_dt: string
  devices: number
}

export const HomeScreen: React.FC = () => {
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showFormCreateFarm({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data } = useGetFarmsQuery()

  const farms = React.useMemo(() => {
    return (
      data?.map<FarmListRow>(
        ({ id, name, description, start_crop_dt, end_crop_dt, devices }) => ({
          id,
          name,
          description,
          start_crop_dt,
          end_crop_dt,
          devices: devices?.length ?? 0,
        })
      ) ?? []
    )
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de granjas" buttons={toolbarButtons} />
      <Grid item container gap={2} padding={2}>
        {farms.map((farm, index) => (
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
                  ROUTE_PATH.DeviceByFarm.replace(
                    ":farmId",
                    farm.id?.toString() ?? ""
                  )
                )
              }
            >
              <CardContent
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  paddingTop: 0,
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <Typography
                    fontWeight="ligth"
                    fontSize={20}
                    color={"black"}
                    paddingTop={1}
                  >
                    {farm.name}
                  </Typography>
                  <Typography
                    fontWeight="ligth"
                    fontSize={12}
                    color={"grey"}
                    paddingY={1}
                  >
                    {farm.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <Divider sx={{ mb: 1 }} />
                  <Typography fontWeight="medium" fontSize={10} color={"grey"}>
                    Dispositivos vinculados : {farm.devices}
                  </Typography>
                  <Typography fontWeight="medium" fontSize={10} color={"grey"}>
                    Siembra :{" "}
                    {DateTime.fromISO(farm.start_crop_dt).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </Typography>
                  <Typography fontWeight="medium" fontSize={10} color={"grey"}>
                    Cosecha :{" "}
                    {DateTime.fromISO(farm.end_crop_dt).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}
