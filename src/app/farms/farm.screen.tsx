import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { useGetFarmsQuery } from "../../settings/api/endpoints/farm"
import { useAppDispatch } from "../../settings/redux/hooks"
import { showFormCreateFarm } from "../../settings/redux/dialogs.slice"
import { DateTime } from "luxon"
import LOGO_FULL from "../../assets/logo-2.png"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"

export interface FarmListRow {
  id?: string | number
  name: string
  description: string
  start_crop_dt: string
  end_crop_dt: string
}

export const FarmScreen: React.FC = () => {
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
  const { data, isLoading, error } = useGetFarmsQuery()

  const farms = React.useMemo(() => {
    return (
      data?.map<FarmListRow>(
        ({ id, name, description, start_crop_dt, end_crop_dt }) => ({
          id,
          name,
          description,
          start_crop_dt,
          end_crop_dt,
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
                justifyContent: "center",
                flexDirection: "column",
              }}
              onClick={() =>
                navigate(
                  ROUTE_PATH.DeviceByFarm.replace(
                    ":id",
                    farm.id?.toString() ?? ""
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
                    {farm.name}
                  </Typography>
                  <Box marginY={2} width={"100%"}>
                    <Typography
                      fontWeight="ligth"
                      fontSize={15}
                      textAlign={"left"}
                      color={"grey"}
                    >
                      {farm.description}
                    </Typography>
                  </Box>
                  <Box
                    marginBottom={1}
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Typography fontWeight="ligth" fontSize={10} color={"grey"}>
                      Siembra :{" "}
                      {DateTime.fromISO(farm.start_crop_dt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </Typography>
                    <Typography fontWeight="ligth" fontSize={10} color={"grey"}>
                      Cosecha :{" "}
                      {DateTime.fromISO(farm.end_crop_dt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
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
