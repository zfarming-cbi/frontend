import { FC, useEffect } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { useCreateDevicesMutation } from "../../../settings/api/endpoints/device"
import { closeFormCreateDevice } from "../../../settings/redux/dialogs.slice"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormCreateDevice: FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      name: nameInputValue,
      description: descriptionInputValue,
      code: codeInputValue,
    },
  } = useFormik<{
    name: string
    description: string
    code: string
  }>({
    initialValues: {
      name: "",
      description: "",
      code: "",
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormCreateDeviceSchema,
    async onSubmit(credentials) {
      doCreateDevices(credentials)
      dispatch(closeFormCreateDevice())
    },
  })

  const [doCreateDevices, { isLoading, error, isSuccess, reset }] =
    useCreateDevicesMutation()

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
    <Grid
      container
      spacing={1}
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
      <Grid item xs>
        <TextField
          fullWidth
          required
          label="Código"
          variant="outlined"
          name="code"
          id="code"
          value={codeInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.code}
          helperText={errors.code}
        />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          multiline
          label="Descripción"
          variant="outlined"
          name="description"
          id="description"
          rows={4}
          value={descriptionInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.description}
          helperText={errors.description}
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

const FormCreateDeviceSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El nombre del dispositivo no es valido."),
  description: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(250, "Maximo 250 caracteres")
    .required("La descripción no es valida."),
  code: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(20, "Maximo 20 caracteres")
    .required("El código no es válido."),
})
