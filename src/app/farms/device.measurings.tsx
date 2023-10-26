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
import { useGetDeviceQuery } from "../../settings/api/endpoints/device"
import { useParams } from "react-router-dom"
import { Toolbar } from "../../share/components/toolbar"
import { CircularChart } from "./components/circularChart"
import { AppEnvVars } from "../../settings/env/environment"
import MDEditor from "@uiw/react-md-editor"
import { useCopyPlantMutation } from "../../settings/api/endpoints/plant"
import {
  useGetMeasuringsAverageQuery,
  useGetMeasuringsQuery,
} from "../../settings/api/endpoints/measuringHistory"
import { BarChart } from "./components/barChart"

export const DeviceMeasuringScreen: React.FC = () => {
  const { deviceId } = useParams()
  const { data } = useGetDeviceQuery({ deviceId })
  const { data: measurings } = useGetMeasuringsQuery({ deviceId })
  const { data: measuringsAverage } = useGetMeasuringsAverageQuery({ deviceId })
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

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title={title} showButtonReturn={true} />
      <Grid container flex={1} flexDirection={"row"}>
        <Grid container item xs={4} md={5} flexDirection={"column"}>
          <Card
            sx={{
              display: "flex",
              maxWidth: "800px",
              marginLeft: 2,
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
              <div data-color-mode="light">
                <MDEditor.Markdown
                  data-color-mode="light"
                  source={data?.plant.content}
                />
              </div>
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
            <CircularChart
              title={data?.plant.name}
              measurings={measuringsAverage}
            />
            <BarChart measurings={measurings} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
