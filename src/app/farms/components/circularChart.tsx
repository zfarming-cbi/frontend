import { Box } from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import { FC, useEffect, useRef } from "react"
import { MeasuringHistoryAverageDTO } from "../../../share/models/measuringHistory"

interface Props {
  measurings?: MeasuringHistoryAverageDTO
  title?: string
}

export const CircularChart: FC<Props> = (props) => {
  const { measurings, title } = props
  const chartNodeRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ECharts>()
  useEffect(() => {
    const series = measurings?.data.map((measuring) => ({
      type: "bar",
      data: [measuring.value],
      name: measuring["sensor.name"],
      coordinateSystem: "polar",
      showBackground: false,
    }))

    const chart = init(chartNodeRef.current)
    const option: EChartsCoreOption = {
      // grid: {
      //   left: "3%",
      //   right: "3%",
      //   bottom: "3%",
      //   containLabel: true,
      // },
      grid: {
        right: 100,
      },
      polar: {
        radius: [30, "80%"],
      },
      angleAxis: {
        max: measurings?.maxRange,
        startAngle: 225,
      },
      radiusAxis: {
        type: "category",
      },
      tooltip: {},
      series: series,
      legend: {
        show: true,
        data: measurings?.namesSensor,
        orient: "vertical",
        right: 10,
        top: "middle",
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
        style={{ width: 900, height: 500 }}
      />
    </Box>
  )
}
