import { FC, useEffect, useState } from "react"
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { BusinessRounded, CloudUpload } from "@mui/icons-material"
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../settings/api/endpoints/company"

export const FormCompany: FC = () => {
  const { data } = useGetCompanyQuery() //@toDo: usar los lazy query y utilizar el useEffect
  useEffect(() => {
    setFieldValue("name", data?.name)
    setFieldValue("nit", data?.nit)
  }, [data])
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
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton>
              <CloudUpload />
            </IconButton>
          }
        >
          <Avatar sx={{ display: "flex", width: 100, height: 100 }}>
            <BusinessRounded />
          </Avatar>
        </Badge>
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
