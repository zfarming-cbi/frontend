import * as React from "react"
import Grid from "@mui/material/Grid"
import { Box } from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"

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
        style={{ width: 600, height: 600 }}
      />
    </Box>
  )
}

export const DeviceMeasuringScreen: React.FC = () => {
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
    <Grid container>
      <Grid item>
        <BarChart />
      </Grid>
    </Grid>
  )
}
