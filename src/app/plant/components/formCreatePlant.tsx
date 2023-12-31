import React, { FC, useEffect } from "react"
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Checkbox,
  DialogActions,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { useCreatePlantMutation } from "../../../settings/api/endpoints/plant"
import { closeFormCreatePlant } from "../../../settings/redux/dialogs.slice"
import MDEditor, { commands } from "@uiw/react-md-editor"
import { Edit } from "@mui/icons-material"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"
import { SelectField } from "../../../share/components/selectField"

interface Props {
  onSave(): void
  onCancel(): void
}

const ImageButton = styled(ButtonBase)(() => ({
  position: "relative",
  height: 200,
  width: 180,
  cursor: "pointer",
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiSvgIcon-root": {
      opacity: 1,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  "& .MuiSvgIcon-root": {
    position: "absolute",
    top: 10,
    right: 10,
    opacity: 0,
  },
}))

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
})

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}))

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.2,
}))

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export const FormCreatePlant: FC<Props> = (props) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
  const [image, setImage] = React.useState<Blob>()
  const dispatch = useAppDispatch()
  const [doCreatePlant, { isLoading, error, isSuccess, reset }] =
    useCreatePlantMutation()
  const [value, setValue] = React.useState<string>()
  const [contentEmpty, setContentEmpty] = React.useState<boolean>(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      name: nameInputValue,
      content: contentInputValue,
      growing_time: growing_timeInputValue,
      public: publicInputValue,
    },
  } = useFormik<{
    name: string
    content: string
    growing_time: number
    public: boolean
  }>({
    initialValues: {
      name: "",
      content: "",
      growing_time: 8,
      public: false,
    },
    validationSchema: FormCreatePlantSchema,
    async onSubmit(data) {
      if (!value) {
        setContentEmpty(true)
        return
      }
      doCreatePlant({ ...data, content: value ?? "", image })
      dispatch(closeFormCreatePlant())
    },
  })

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const imageUrl = URL.createObjectURL(file)
    setImage(file)
    setSelectedImage(imageUrl)
  }

  const codePreview = {
    name: "preview",
    keyCommand: "preview",
    value: "preview",
    icon: <Button />,
  }

  useEffect(() => {
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

  useEffect(() => {
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
    <Grid container gap={1} flexDirection={"row"}>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        component="form"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        <Grid item xs>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            name="name"
            id="name"
            value={nameInputValue}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs marginY={1}>
          <MDEditor
            data-color-mode="light"
            value={value}
            onChange={setValue}
            extraCommands={[codePreview, commands.fullscreen]}
          />
        </Grid>
        {contentEmpty && (
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
            Es necesario agregar una descripción o contenido.
          </Alert>
        )}
        <Grid item xs>
          <TextField
            id="number"
            label="Tiempo de cosecha/semanas"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 4,
              max: 16,
            }}
            value={growing_timeInputValue}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <FormControlLabel
            disabled={isLoading}
            control={
              <Checkbox
                value={publicInputValue}
                onChange={handleChange}
                name="public"
              />
            }
            label="Pública"
          />
        </Grid>
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
        <DialogActions sx={{ padding: "0" }}>
          <Grid container item justifyContent="end" marginTop={1}>
            <Button type="submit">Guardar</Button>
          </Grid>
        </DialogActions>
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        marginX={5}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography paddingTop={2} textAlign={"center"} fontWeight={"medium"}>
          Subir imagen
        </Typography>
        <Box
          marginTop={3}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ImageButton focusRipple onClick={handleClick}>
            <ImageSrc
              style={{
                backgroundImage: `url(${selectedImage})`,
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <VisuallyHiddenInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <Image>
              <Edit />
            </Image>
          </ImageButton>
        </Box>
      </Grid>
    </Grid>
  )
}

const FormCreatePlantSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El nombre no es valido."),
})
