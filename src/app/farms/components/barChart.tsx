import { Box } from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import React, { useEffect, useState } from "react"

interface Props {
  measurings: any
}

export const BarChart: React.FC<Props> = (props) => {
  const { measurings } = props
  const chartNodeRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<ECharts>()
  React.useEffect(() => {
    const processedMeasurings = measurings?.map((measuring: any) => ({
      data: measuring.values,
      type: "line",
      stack: "x",
    }))
    const chart = init(chartNodeRef.current)
    const option: EChartsCoreOption = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: processedMeasurings,
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
