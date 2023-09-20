import { FC } from "react"
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

export const FormChangePassword: FC = () => {
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
      doChangePassword(credentials)
    },
  })

  const [doChangePassword, { isLoading, error }] = useChangePassowrdMutation()

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
  email: Yup.string().min(3).max(50).required("El email no es valido."),
})
