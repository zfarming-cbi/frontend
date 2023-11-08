import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useCopyPlantMutation,
  useGetPlantQuery,
} from "../../settings/api/endpoints/plant"
import { ArrowBack } from "@mui/icons-material"
import { Comments } from "./components/comments"
import { DateTime } from "luxon"
import { LikesComments } from "./components/likesComments"
import { AppEnvVars } from "../../settings/env/environment"
import MDEditor from "@uiw/react-md-editor"
import { ROUTE_PATH } from "../../settings/routes/routes"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import { selectorSession } from "../../settings/redux/session.slice"
import {
  MesageSnackbar,
  closeSnackbar,
  selectorSnackbar,
  showSnackbar,
} from "../../settings/redux/snackbar.slice"
import { Rol } from "../../share/models/appSession"

export const PlantFromGalery: React.FC = () => {
  const { plantId } = useParams()
  const { data } = useGetPlantQuery({ plantId })
  const [title, setTitle] = React.useState<string>()
  const [updatedAt, setUpdatedAt] = React.useState<string>()
  const [content, setContent] = React.useState<string>("")
  const [likes, setLikes] = React.useState<number>()
  const [comments, setComments] = React.useState<number>()
  const [image, setImage] = React.useState<string>()
  const [open, setOpen] = React.useState(false)
  const [isPublic, setIsPublic] = React.useState<boolean>(false)
  const [growingTime, setGrowingTime] = React.useState<string>("")
  const [name, setName] = React.useState<string>("")
  const { isLogged, rol } = useAppSelector(selectorSession)
  const isRolAdmin = rol === Rol.Administrator
  const [doCreatePlant, { isLoading, error, reset, isSuccess }] =
    useCopyPlantMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { visible, severity, message } = useAppSelector(selectorSnackbar)

  const onCloseSnackbar = () => {
    dispatch(closeSnackbar())
  }

  const openFormCopyPlant = () => {
    setContent(data?.content ?? "")
    setGrowingTime(data?.growing_time ?? "")
    setImage(data?.image)
    setIsPublic(data?.public ?? false)
    setOpen(true)
  }
  const copyPlant = () => {
    const plantCopy = {
      name,
      content,
      growing_time: growingTime,
      public: isPublic,
      image,
    }
    doCreatePlant(plantCopy)
    setOpen(false)
    setName("")
  }

  const closeFormCopyPlant = () => {
    setOpen(false)
    setName("")
  }

  React.useEffect(() => {
    setTitle(data?.name)
    setContent(data?.content ?? "")
    setUpdatedAt(data?.updatedAt ?? "")
    setLikes(data?.likes?.length ?? 0)
    setComments(data?.comments?.length ?? 0)
    setImage(data?.image ?? "")
  }, [data])

  React.useEffect(() => {
    if (!isLoading && !isSuccess) {
      return
    }
    dispatch(
      showSnackbar({
        visible: true,
        message: MesageSnackbar.Success,
        severity: "success",
      })
    )
    reset()
  }, [isLoading, isSuccess])

  React.useEffect(() => {
    if (!error) {
      return
    }
    dispatch(
      showSnackbar({
        visible: true,
        message: MesageSnackbar.Error,
        severity: "error",
      })
    )
  }, [error])

  return (
    <Grid
      padding={4}
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Grid container item xs={12} justifyContent="space-between">
          <Button variant="text" onClick={() => navigate(ROUTE_PATH.Galery)}>
            <ArrowBack />
            <Typography paddingLeft={1}>Volver</Typography>
          </Button>
        </Grid>
        <Grid container item xs={12} flexDirection={"column"}>
          <Box
            sx={{
              display: "flex",
              maxWidth: "800px",
              flexDirection: "column",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography
              variant="h2"
              noWrap
              textAlign={"center"}
              fontWeight={"bold"}
              paddingBottom={2}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                height: "100%",
              }}
            >
              <Typography fontWeight="medium" fontSize={15}>
                Ultima actualización: {""}
                {DateTime.fromISO(updatedAt ?? "").toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <LikesComments likes={likes} comments={comments} />
                <Box
                  sx={{
                    flex: 1,
                    padding: 2,
                  }}
                >
                  {isLogged && isRolAdmin && (
                    <Button size="small" onClick={openFormCopyPlant}>
                      Copiar formula
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            <img
              style={{
                width: 300,
                margin: "20px auto",
              }}
              src={`${AppEnvVars.IMAGE_URL}${image}`}
            />
            <Box data-color-mode="light" marginY={3} paddingY={2}>
              <MDEditor.Markdown data-color-mode="light" source={content} />
            </Box>
            <Comments plantId={plantId} />
          </Box>
        </Grid>
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
      <Snackbar
        open={visible}
        autoHideDuration={4000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
