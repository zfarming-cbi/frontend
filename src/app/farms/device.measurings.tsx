import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material"
import { ECharts, EChartsCoreOption, init } from "echarts"
import { useGetDeviceQuery } from "../../settings/api/endpoints/device"
import { useParams } from "react-router-dom"
import { Toolbar } from "../../share/components/toolbar"
import { CircularChart } from "../home/components/circularChart"
import { AppEnvVars } from "../../settings/env/environment"
import MDEditor from "@uiw/react-md-editor"
import { useCopyPlantMutation } from "../../settings/api/endpoints/plant"
import { useGetMeasuringsQuery } from "../../settings/api/endpoints/measuringHistory"

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
          type: "line",
          stack: "x",
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
  const { data: measurings } = useGetMeasuringsQuery({ deviceId })
  const [title, setTitle] = React.useState<string>()
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState<string>("")
  const [content, setContent] = React.useState<string>("")
  const [growing_time, setGrowing_time] = React.useState<string>("")
  const [image, setImage] = React.useState<string>("")
  const [isPublic, setIsPublic] = React.useState<boolean>(false)
  const [doCreatePlant, { isLoading, error }] = useCopyPlantMutation()

  React.useEffect(() => {
    setTitle(data?.name)
  }, [data])
  console.log("measurings", measurings)
  const openFormCopyPlant = () => {
    setContent(data?.plant.content)
    setGrowing_time(data?.plant.growing_time)
    setImage(data?.plant.image)
    setIsPublic(data?.plant.public)
    setOpen(true)
  }
  const copyPlant = () => {
    const data = {
      name,
      content,
      growing_time,
      public: isPublic,
      image,
    }
    doCreatePlant(data)
    setOpen(false)
  }
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
              image={`${AppEnvVars.IMAGE_URL}${data?.plant.image}`}
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
              <Typography data-color-mode="light" paddingY={2} marginY={3}>
                <MDEditor.Markdown
                  data-color-mode="light"
                  source={data?.plant.content}
                />
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={openFormCopyPlant}>Copiar formula</Button>
            </CardActions>
          </Card>
          <Dialog open={open} onClose={copyPlant}>
            <DialogTitle>Copiar formula</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                required
                label="Nombre"
                variant="outlined"
                name="name"
                id="name"
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
              />
              {!!error && (
                <Alert
                  sx={{
                    marginTop: 1,
                    textAlign: "left",
                    fontSize: 10,
                    alignItems: "center",
                  }}
                  severity="error"
                  variant="filled"
                >
                  lo sentimos en este momento no podemos validar la información
                  {/* {JSON.stringify(error)} */}
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={copyPlant}>Copiar</Button>
            </DialogActions>
          </Dialog>
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
