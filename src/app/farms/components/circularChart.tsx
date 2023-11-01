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
    const series = measurings?.data.map((value) => ({
      type: "bar",
      data: value,
      coordinateSystem: "polar",
      itemStyle: {
        color: function (params: any) {
          var colors = ["red", "blue", "green", "orange", "purple", "grey"]
          return colors[params.dataIndex]
        },
      },
      showBackground: false,
    }))
    const chart = init(chartNodeRef.current)
    const option: EChartsCoreOption = {
      title: [
        {
          text: title,
        },
      ],
      polar: {
        radius: [30, "80%"],
      },
      angleAxis: {
        max: measurings?.maxRange,
        startAngle: 225,
      },
      radiusAxis: {
        type: "category",
        data: measurings?.namesSensor,
      },
      tooltip: {},
      series: [
        {
          type: "bar",
          data: measurings?.data,
          coordinateSystem: "polar",
          itemStyle: {
            color: function (params: any) {
              var colors = ["red", "blue", "green", "orange", "purple", "grey"]
              return colors[params.dataIndex]
            },
          },
          showBackground: false,
        },
      ],
      legend: {
        show: true,
        data: measurings?.namesSensor,
      },
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
