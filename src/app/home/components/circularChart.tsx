import { Box } from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import { FC, useEffect, useRef } from "react"
import { useGetMeasuringsQuery } from "../../../settings/api/endpoints/measuringHistory"

export const CircularChart: FC = () => {
  const chartNodeRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ECharts>()
  useEffect(() => {
    const chart = init(chartNodeRef.current)

    const option: EChartsCoreOption = {
      title: [
        {
          text: "Cultivo Tomate 1, Granja Ref: 0023",
        },
      ],
      polar: {
        radius: [30, "80%"],
      },
      angleAxis: {
        max: 4,
        startAngle: 225,
      },
      radiusAxis: {
        type: "category",
        data: ["Electroconductividad", "Ph", "Temperatura", "Humedad"],
      },
      tooltip: {},
      series: [
        {
          type: "bar",
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: "polar",
          itemStyle: {
            // Estilo para todos los elementos (barras) en la serie
            color: function (params) {
              var colors = ["red", "blue", "green", "orange", "purple"]
              return colors[params.dataIndex]
            },
          },
          showBackground: false, // Desactivar la visualización del nombre en el fondo
          label: {
            show: false,
            formatter: function (params) {
              return ""
            },
            //   position: "middle",
            //   formatter: "{b}: {c}",
          },
        },
      ],
      legend: {
        show: true,
        data: ["Electroconductividad", "Ph", "Temperatura", "Humedad"],
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
