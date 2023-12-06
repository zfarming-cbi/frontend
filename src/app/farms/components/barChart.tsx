import { Box } from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import React, { useEffect, useState } from "react"
import { MeasuringHistorySensorDTO } from "../../../share/models/measuringHistory"

interface Props {
  measurings?: MeasuringHistorySensorDTO
  dates?: string[]
}

export const BarChart: React.FC<Props> = (props) => {
  const { measurings, dates } = props
  const chartNodeRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<ECharts>()
  useEffect(() => {
    const processedMeasurings = {
      name: measurings?.name,
      data: measurings?.values,
      type: "line",
      stack: "x",
      smooth: true,
      emphasis: {
        focus: "series",
      },
      endLabel: {
        show: true,
        formatter: "{a}",
        distance: 20,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
        },
      },
    }
    const chart = init(chartNodeRef.current)
    const option: EChartsCoreOption = {
      grid: {
        left: "4%",
        right: "4%",
        bottom: "8%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
      },
      dataZoom: {
        show: true,
      },
      xAxis: {
        data: dates,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: `{value} ${measurings?.graphical_unit}`,
        },
      },
      series: processedMeasurings,
      legend: {
        show: true,
        data: [measurings?.name],
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
