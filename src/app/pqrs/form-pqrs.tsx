import {
  Alert,
  Button,
  DialogActions,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { BadgeOutlined as DocumentIdIcon } from "@mui/icons-material"
import {
  SelectField,
  SelectFieldValue,
} from "../../share/components/selectField"
import React, { useEffect, useState } from "react"
import { useGetUserQuery } from "../../settings/api/endpoints/user"
import { JWTContent } from "../../share/models/appSession"
import jwt_decode from "jwt-decode"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useCreatePqrsMutation } from "../../settings/api/endpoints/pqrs"

export const FormPQRS: React.FC = () => {
  const token: JWTContent = jwt_decode(localStorage.getItem("token") ?? "")
  const { data } = useGetUserQuery({
    id: token.sub,
  })

  useEffect(() => {
    setFieldValue("firstname", data?.firstname)
    setFieldValue("lastname", data?.lastname)
    setFieldValue("email", data?.email)
  }, [data])

  const [doCreatePqrs, { isLoading, error }] = useCreatePqrsMutation()

  const KindOfPQRS: SelectFieldValue<string>[] = [
    {
      value: 0,
      content: "Petición",
    },
    {
      value: 1,
      content: "Queja",
    },
    {
      value: 2,
      content: "Reclamo",
    },
    {
      value: 3,
      content: "Solicitúd",
    },
  ]

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values: {
      firstname: firstnameInputValue,
      lastname: lastnameInputValue,
      document: documentInputValue,
      phone: phoneInputValue,
      email: emailInputValue,
      description: descriptionInputValue,
      type: typeInputValue,
    },
  } = useFormik<{
    firstname: string
    lastname: string
    document: string
    phone: string
    email: string
    description: string
    type: string
  }>({
    initialValues: {
      firstname: "",
      lastname: "",
      document: "",
      phone: "",
      email: "",
      description: "",
      type: "",
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormPqrsSchema,
    async onSubmit(credentials) {
      console.log(credentials)
      // doCreatePqrs(credentials)
    },
  })

  return (
    <Grid
      container
      spacing={1}
      component="form"
      flexDirection="column"
      onSubmit={handleSubmit}
    >
      <Grid item marginTop={2} marginBottom={1}>
        <Typography variant="subtitle1" color="gray">
          Información Personal
        </Typography>
        <Divider />
      </Grid>

      <Grid item container spacing={2} flexDirection="column">
        <Grid item xs>
          <TextField
            fullWidth
            label="Nombres"
            name="firstname"
            id="firstname"
            value={firstnameInputValue}
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label="Apellidos"
            name="lastname"
            id="lastname"
            value={lastnameInputValue}
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="email"
            id="email"
            value={emailInputValue}
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs>
          <TextField
            fullWidth
            label="Número de documento"
            name="document"
            id="document"
            disabled={isLoading}
            value={documentInputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Télefono celular"
            name="phone"
            id="phone"
            value={phoneInputValue}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <DocumentIdIcon sx={{ mr: 1 }} color="disabled" />
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid item marginBottom={1} marginTop={2}>
        <Typography variant="subtitle1" color="gray">
          Información PQRS
        </Typography>
        <Divider />
      </Grid>

      <Grid item>
        <SelectField
          label="Tipo Solicitud"
          name="type"
          id="type"
          value={typeInputValue}
          values={KindOfPQRS}
          onSelect={(selectedValue) => {
            setFieldValue("type", selectedValue)
          }}
          fullWidth
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Descripción del reporte"
          name="description"
          id="description"
          value={descriptionInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          minRows={4}
          maxRows={10}
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
            Generar PQRS
          </Button>
        </Grid>
      </DialogActions>
    </Grid>
  )
}

const FormPqrsSchema = Yup.object().shape({
  firstname: Yup.string().min(3).max(50).required("El nombre no es valido."),
  lastname: Yup.string().min(3).max(50).required("El apellido no es valido."),
  email: Yup.string().min(3).max(50).required("El email no es valido."),
  phone: Yup.string().min(3).max(20).required("El teléfono no es valido."),
  document: Yup.string()
    .min(3)
    .max(50)
    .required("El numero de documento no es valido."),
  description: Yup.string()
    .min(3)
    .max(250)
    .required("La descripción no es valida."),
  type: Yup.string()
    .min(3)
    .max(50)
    .required("El tipo de petición no es valido."),
})
