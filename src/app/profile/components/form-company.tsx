import { FC, useEffect } from "react"
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  DialogActions,
  Divider,
  Grid,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Edit } from "@mui/icons-material"
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../settings/api/endpoints/company"

const image = {
  url: "src/assets/aguacate.jpg",
  title: "Breakfast",
  width: 300,
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 150,
  width: 150,
  borderRadius: "50%",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
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
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
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

export const FormCompany: FC = () => {
  const { data } = useGetCompanyQuery()
  useEffect(() => {
    setFieldValue("name", data?.name)
    setFieldValue("nit", data?.nit)
  }, [data])
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values: { name: nameInputValue, nit: nitInputValue },
  } = useFormik<{
    name: string
    nit: string
  }>({
    initialValues: {
      name: "",
      nit: "",
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormEditCompanySchema,
    async onSubmit(credentials) {
      doUpdateCompany(credentials)
    },
  })
  const [doUpdateCompany, { isLoading, error }] = useUpdateCompanyMutation()

  return (
    <Grid
      container
      spacing={1}
      component="form"
      flexDirection="column"
      onSubmit={handleSubmit}
      padding={2}
    >
      <Grid item marginBottom={1}>
        <Typography variant="subtitle1" color="gray">
          Compañia
        </Typography>
        <Divider />
      </Grid>
      <Box
        textAlign={"center"}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ImageButton focusRipple key={image.title}>
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Edit />
          </Image>
        </ImageButton>
      </Box>
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
        />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          label="NIT"
          variant="outlined"
          name="nit"
          id="nit"
          value={nitInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.nit}
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
      <DialogActions>
        <Grid container item xs={12} justifyContent="end" marginTop={1}>
          <Button sx={{ marginInline: 1 }} type="submit">
            Guardar
          </Button>
        </Grid>
      </DialogActions>
    </Grid>
  )
}

const FormEditCompanySchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required("El nombre no es valido."),
  nit: Yup.string().min(3).max(50).required("El apellido no es valido."),
})
