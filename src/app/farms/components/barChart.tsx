import { Box } from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import React, { useEffect } from "react"
import { MeasuringHistoryDTO } from "../../../share/models/measuringHistory"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTE_PATH } from "../../../settings/routes/routes"

interface Props {
  measurings?: MeasuringHistoryDTO
}

export const BarChart: React.FC<Props> = (props) => {
  const { measurings } = props
  const { deviceId } = useParams()
  const chartNodeRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<ECharts>()

  useEffect(() => {
    const processedMeasurings = measurings?.data.map((measuring: any) => ({
      name: measuring.name,
      data: measuring.values,
      type: "line",
      stack: "x",
    }))
    const chart = init(chartNodeRef.current)
    const option: EChartsCoreOption = {
      grid: {
        right: 250,
      },
      xAxis: {
        data: measurings?.dates,
      },
      yAxis: {},
      series: processedMeasurings,
      legend: {
        show: true,
        data: measurings?.names,
        right: 10,
        orient: "vertical",
        top: "center",
      },
    }
    chart.setOption(option)
    chartRef.current = chart
  }, [measurings])
  return (
    <Box>
      <div
        id="myChart"
        ref={chartNodeRef}
        style={{ width: 750, height: 600 }}
      />
    </Box>
  )
}
