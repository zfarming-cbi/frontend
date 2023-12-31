import { FC, useEffect } from "react"
import UnLockIcon from "@mui/icons-material/LockOpen"
import { Alert, Grid, Paper, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import * as Yup from "yup"
import LOGO_FULL from "../../assets/placeholder.png"
import {
  useResetPasswordMutation,
  useVerifyUuidQuery,
} from "../../settings/api/endpoints/authentication"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthenticationSaveHandler } from "../../settings/routes/authentication.loader"
import { ROUTE_PATH } from "../../settings/routes/routes"

export const RecoverPasswordScreen: FC = () => {
  const navigate = useNavigate()
  const { uuid } = useParams()
  const response = useVerifyUuidQuery({
    uuid,
  })
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      password: passwordInputValue,
      confirmPassword: confirmPasswordInputValue,
    },
  } = useFormik<{
    password: string
    confirmPassword: string
  }>({
    initialValues: { password: "", confirmPassword: "" },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: ResetPasswordSchema,
    async onSubmit(credentials) {
      doResetPassword({ password: credentials.password, uuid })
    },
  })

  const [doResetPassword, { data, isLoading, error }] =
    useResetPasswordMutation()

  useEffect(() => {
    const { access_token } = data ?? {}
    if (!access_token) return
    const saveIsSuccess = AuthenticationSaveHandler(access_token)
    if (!saveIsSuccess) return
    navigate(ROUTE_PATH.Dashboard, { replace: true })
  }, [data])

  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      container
      sx={{
        backgroundColor: "#D0D0D1", //blue[100],
      }}
    >
      <Grid item xs={10} sm={6} lg={4}>
        <Paper
          sx={{ paddingX: 4, textAlign: "center", backgroundColor: "white" }}
          elevation={3}
        >
          <Box paddingY={2}>
            <img src={LOGO_FULL} width="90%" alt="Agricultura Cero" />
            <Typography
              fontWeight="ligth"
              fontSize={20}
              textAlign={"center"}
              color={"grey"}
            >
              Reestablece tu contraseña
            </Typography>
          </Box>
          {response.error && (
            <Box>
              <Typography>
                {JSON.stringify(response.error)} //data.message
              </Typography>
            </Box>
          )}
          {!response.error && (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Nueva contraseña"
                variant="outlined"
                name="password"
                id="password"
                value={passwordInputValue}
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password}
              />
              <TextField
                fullWidth
                required
                label="Confirma la contraseña"
                variant="outlined"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPasswordInputValue}
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.confirmPassword}
              />
              <Box sx={{ height: 8, width: 1 }} />
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
              <Box sx={{ height: 8, width: 1 }} />
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                startIcon={<UnLockIcon />}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Enviar
              </LoadingButton>
              <Typography fontSize={12} textAlign={"center"} padding={1}>
                <Link to={ROUTE_PATH.Login}>Iniciar sesión </Link>
              </Typography>
            </Box>
          )}
          <Box paddingTop={4} paddingBottom={2}>
            <Typography fontSize={8} textAlign={"center"} padding={1}>
              Todos los derechos reservados
              <br />
              Desarrollado por:
              <a href="mailto:krisskira@gmail.com">krisskira@gmail.com</a>
              <br />
              <a href="https://kriverdevice.com">www.kriverdevice.com</a>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Minimo 8 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("Contraseña no valida"),
  confirmPassword: Yup.string()
    .min(8, "Minimo 8 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("Contraseña no valida")
    .oneOf([Yup.ref("password"), ""], "La contraseña no coincide"),
})
