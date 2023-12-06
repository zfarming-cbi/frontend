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
  console.log("namesSensor", measurings)
  useEffect(() => {
    const series = measurings?.data.map((measuring) => ({
      type: "bar",
      data: [measuring.value],
      name: measuring["sensor.name"],
      coordinateSystem: "polar",
      // itemStyle: {
      //   color: function (params: any) {
      //     var colors = ["red", "blue", "green", "orange", "purple", "grey"]
      //     return colors[params.dataIndex]
      //   },
      // },
      showBackground: false,
    }))
    const series2 = undefined
    console.log("namesSensor", series)

    const chart = init(chartNodeRef.current)
    const option: EChartsCoreOption = {
      grid: {
        left: "4%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
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
        style={{ width: 500, height: 500 }}
      />
    </Box>
  )
}
