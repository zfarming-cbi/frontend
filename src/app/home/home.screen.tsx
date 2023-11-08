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
import {
  useGetFarmsQuery,
  useLazyGetFarmsQuery,
} from "../../settings/api/endpoints/farm"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import { showFormCreateFarm } from "../../settings/redux/dialogs.slice"
import { DateTime } from "luxon"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"
import {
  SelectField,
  SelectFieldValue,
} from "../../share/components/selectField"
import {
  selectorDataFilter,
  setDataFarm,
} from "../../settings/redux/dataFilter.slice"

export interface FarmListRow {
  id?: string | number
  name: string
  description: string
  start_crop_dt: string
  end_crop_dt: string
  devices: number
}
const KindOfShowFarms: SelectFieldValue<string>[] = [
  { value: "all", content: "Todas" },
  { value: "active", content: "Activas" },
  { value: "inactive", content: "Inactivas" },
]

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [doGetFarms, { data: dataFilter }] = useLazyGetFarmsQuery()

  const [showFarms, setShowFarms] = React.useState<string | number>(
    KindOfShowFarms[0].value
  )
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

  React.useEffect(() => {
    doGetFarms({ search: "" })
  }, [])

  React.useEffect(() => {
    if (!dataFilter) return
    dispatch(setDataFarm(dataFilter))
  }, [dataFilter])

  const filteredData = useAppSelector(selectorDataFilter)

  const removeMd = (content: string) => {
    const textPlane = content.replace(/[*#\\]/g, "")
    return textPlane
  }

  const farms = React.useMemo(() => {
    return (
      filteredData.dataFarmFilter?.map<FarmListRow>(
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
  }, [dataFilter, filteredData])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar
        title="Gestión de granjas"
        buttons={toolbarButtons}
        select={
          <SelectField
            dense
            label="Vista"
            name="show"
            id="show"
            defaultValue={KindOfShowFarms[0].value}
            values={KindOfShowFarms}
            value={showFarms}
            onSelect={(selectedValue) => {
              doGetFarms({ search: selectedValue })
              setShowFarms(selectedValue)
            }}
          ></SelectField>
        }
      />
      <Grid container>
        {farms.map((farm, index) => (
          <Grid
            item
            xs="auto"
            sm="auto"
            md={4}
            lg={3}
            gap={2}
            padding={2}
            key={index}
            // sx={{ display: "flex", flex: 1 }}
          >
            <Card sx={{ display: "flex", flex: 1 }} key={index}>
              <CardActionArea
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  height: "100%",
                  padding: 0,
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
                      {removeMd(farm.description)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexDirection: "column",
                      display: "flex",
                    }}
                  >
                    <Divider sx={{ mb: 1 }} />
                    <Typography
                      fontWeight="medium"
                      fontSize={10}
                      color={"grey"}
                    >
                      Dispositivos vinculados : {farm.devices}
                    </Typography>
                    <Typography
                      fontWeight="medium"
                      fontSize={10}
                      color={"grey"}
                    >
                      Siembra :{" "}
                      {DateTime.fromISO(farm.start_crop_dt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </Typography>
                    <Typography
                      fontWeight="medium"
                      fontSize={10}
                      color={"grey"}
                    >
                      Cosecha :{" "}
                      {DateTime.fromISO(farm.end_crop_dt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  style={{
                    backgroundColor:
                      DateTime.now() < DateTime.fromISO(farm.end_crop_dt)
                        ? "green"
                        : "grey",
                    width: "100%",
                    padding: 7,
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
