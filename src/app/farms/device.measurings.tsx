import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
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
import { Rol } from "../../share/models/appSession"
import { useAppSelector } from "../../settings/redux/hooks"
import { selectorSession } from "../../settings/redux/session.slice"
import { ExpandMore } from "@mui/icons-material"

export const DeviceMeasuringScreen: React.FC = () => {
  const { deviceId } = useParams()
  const { data } = useGetDeviceQuery({ deviceId })
  const { data: measurings, refetch: recallGetMeasuring } =
    useGetMeasuringsQuery({ deviceId })
  const { data: measuringsAverage, refetch: recallGetAverageMeasuring } =
    useGetMeasuringsAverageQuery({ deviceId })
  const [title, setTitle] = React.useState<string>()
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState<string>("")
  const [content, setContent] = React.useState<string>("")
  const [growingTime, setGrowingTime] = React.useState<number>(0)
  const [image, setImage] = React.useState<string>("")
  const [doCreatePlant, { isLoading, error }] = useCopyPlantMutation()
  const { rol } = useAppSelector(selectorSession)
  const isRolAdmin = rol === Rol.Administrator
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  React.useEffect(() => {
    const query = setInterval(() => {
      recallGetMeasuring()
      recallGetAverageMeasuring()
    }, 120000)
    return () => {
      clearInterval(query)
    }
  }, [])

  React.useEffect(() => {
    setTitle(data?.name)
  }, [data])
  const openFormCopyPlant = () => {
    setContent(data?.plant.content)
    setGrowingTime(data?.plant.growing_time)
    setImage(data?.plant.image)
    setOpen(true)
  }
  const closeFormCopyPlant = () => {
    setOpen(false)
    setName("")
  }
  const copyPlant = () => {
    const data = {
      name,
      content,
      growing_time: growingTime,
      public: false,
      image,
    }
    doCreatePlant(data)
    setOpen(false)
    setName("")
  }

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title={title} showButtonReturn={true} />
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ width: "30%", flexShrink: 0 }}>
            Descripción de la planta
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box sx={{ display: "flex", flex: 1 }} justifyContent={"center"}>
              <img
                height={400}
                src={`${AppEnvVars.IMAGE_URL}${data?.plant.image}`}
                alt={data?.plant.name}
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
            <Box
              sx={{ display: "flex", flex: 1 }}
              flexDirection={"column"}
              padding={2}
            >
              <Typography
                variant="h4"
                noWrap
                textAlign={"center"}
                fontWeight={"bold"}
                paddingBottom={1}
              >
                {data?.plant.name}
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"column"}
                flex={1}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  flex={1}
                  data-color-mode="light"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <MDEditor.Markdown
                    data-color-mode="light"
                    source={data?.plant.content}
                  />
                </Box>
                {isRolAdmin && (
                  <Box display={"flex"} justifyContent={"end"}>
                    <Button onClick={openFormCopyPlant}>Copiar formula</Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Dialog open={open} onClose={closeFormCopyPlant}>
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
        </AccordionDetails>
      </Accordion>

      <Grid container>
        {measurings?.data.map((measuring, index) => {
          return (
            <Grid item flex={1} xs={12} md={12} lg={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  flexDirection: "column",
                }}
              >
                <BarChart measurings={measuring} dates={measurings?.dates} />
              </Box>
            </Grid>
          )
        })}
        <Box display={"flex"} paddingTop={2}>
          <CircularChart
            title={data?.plant.name}
            measurings={measuringsAverage}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
