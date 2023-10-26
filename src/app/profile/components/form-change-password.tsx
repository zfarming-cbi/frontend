import { FC, useEffect } from "react"
import {
  Alert,
  Button,
  DialogActions,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useChangePassowrdMutation } from "../../../settings/api/endpoints/authentication"
import { useAppDispatch, useAppSelector } from "../../../settings/redux/hooks"
import { selectorSession } from "../../../settings/redux/session.slice"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"

export const FormChangePassword: FC = () => {
  const { userId = "" } = useAppSelector(selectorSession)
  const dispatch = useAppDispatch()

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      currentPassword: currentPasswordInputValue,
      newPassword: newPasswordInputValue,
    },
  } = useFormik<{
    currentPassword: string
    newPassword: string
  }>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormChangePasswordSchema,
    async onSubmit(credentials) {
      doChangePassword({ ...credentials, id: userId })
    },
  })

  const [doChangePassword, { isLoading, error, isSuccess, reset }] =
    useChangePassowrdMutation()

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
      padding={2}
    >
      <Grid item marginBottom={1}>
        <Typography variant="subtitle1" color="gray">
          Cambio de contraseña
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          type="password"
          label="Contraseña actual"
          variant="outlined"
          name="currentPassword"
          id="currentPassword"
          value={currentPasswordInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.currentPassword}
        />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          type="password"
          label="Nueva contraseña"
          variant="outlined"
          name="newPassword"
          id="newPassword"
          value={newPasswordInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.newPassword}
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

const FormChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8)
    .max(20)
    .required("La contraseña no es valida."),
  newPassword: Yup.string()
    .min(8)
    .max(20)
    .required("La contraseña no es valida."),
})
