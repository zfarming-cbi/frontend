import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import { useGetDeviceQuery } from "../../settings/api/endpoints/device"
import { useParams } from "react-router-dom"
import { Toolbar } from "../../share/components/toolbar"
import { CircularChart } from "../home/components/circularChart"

export const BarChart: React.FC = () => {
  const chartNodeRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<ECharts>()
  React.useEffect(() => {
    const chart = init(chartNodeRef.current)

    const option: EChartsCoreOption = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: [23, 24, 18, 25, 27, 28, 25],
        },
      ],
    }
    chart.setOption(option)
    chartRef.current = chart
  }, [])
  return (
    <Box>
      <div
        id="myChart"
        ref={chartNodeRef}
        style={{ width: 500, height: 500 }}
      />
    </Box>
  )
}

export const DeviceMeasuringScreen: React.FC = () => {
  const { deviceId } = useParams()
  const { data } = useGetDeviceQuery({ deviceId })
  const [title, setTitle] = React.useState<string>()
  React.useEffect(() => {
    setTitle(data?.name)
  }, [data])
  console.log(data)
  //   const { deviceId } = useParams()
  //   const measurings = useGetMeasuringsQuery({ farmId })
  //   const devices = React.useMemo(() => {
  //     return (
  //       data?.map<DeviceByFarmListRow>(({ id, name, description, code }) => ({
  //         id,
  //         name,
  //         description,
  //         code,
  //       })) ?? []
  //     )
  //   }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title={title} showButtonReturn={true} />
      <Grid container flex={1} flexDirection={"row"}>
        <Grid container xs={6} flexDirection={"column"}>
          <Card
            sx={{
              display: "flex",
              maxWidth: "800px",
              margin: "10px auto",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              height={300}
              image={`http://localhost:3000/${data?.plant.image}`}
              alt={data?.plant.name}
              sx={{
                objectFit: "contain",
              }}
            />
            <CardContent sx={{ paddingX: 5 }}>
              <Typography
                variant="h5"
                noWrap
                textAlign={"center"}
                fontWeight={"bold"}
                paddingBottom={1}
              >
                {data?.plant.name}
              </Typography>
              <Typography
                fontWeight="ligth"
                fontSize={20}
                textAlign={"justify"}
                color={"black"}
                paddingY={2}
              >
                {data?.plant.content}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button>Copiar formula</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item container flex={1}>
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              flexDirection: "column",
            }}
          >
            <CircularChart />
            <BarChart />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
