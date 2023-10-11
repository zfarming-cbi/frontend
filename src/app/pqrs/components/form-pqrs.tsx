import {
  Alert,
  Button,
  DialogActions,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { BadgeOutlined as DocumentIdIcon } from "@mui/icons-material"
import {
  SelectField,
  SelectFieldValue,
} from "../../../share/components/selectField"
import React, { useState } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useCreatePqrsMutation } from "../../../settings/api/endpoints/pqrs"

interface Props {
  onSave(): void
  onCancel(): void
  dataUser: any
}

export const FormPQRS: React.FC<Props> = (props) => {
  const { dataUser } = props
  const [doCreatePqrs, { isLoading, error }] = useCreatePqrsMutation()

  const KindOfPQRS: SelectFieldValue<string>[] = [
    {
      value: "peticion",
      content: "Petición",
    },
    {
      value: "queja",
      content: "Queja",
    },
    {
      value: "reclamo",
      content: "Reclamo",
    },
    {
      value: "solicitud",
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
      document: documentInputValue,
      phone: phoneInputValue,
      description: descriptionInputValue,
      type: typeInputValue,
    },
  } = useFormik<{
    document: string
    phone: string
    description: string
    type: string | number
  }>({
    initialValues: {
      document: "",
      phone: "",
      description: "",
      type: KindOfPQRS[0].value,
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormPqrsSchema,
    async onSubmit(data) {
      doCreatePqrs(data)
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
            value={dataUser.firstname}
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
            value={dataUser.lastname}
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
            value={dataUser.email}
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
          defaultValue={KindOfPQRS[0].value}
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
  phone: Yup.string().min(3).max(20).required("El teléfono no es valido."),
  document: Yup.string()
    .min(3)
    .max(50)
    .required("El numero de documento no es valido."),
  description: Yup.string()
    .min(3)
    .max(250)
    .required("La descripción no es valida."),
})
