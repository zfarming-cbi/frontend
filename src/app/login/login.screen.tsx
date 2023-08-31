import { FC, useEffect } from "react"
import UnLockIcon from "@mui/icons-material/LockOpen"
import { Alert, Grid, Paper, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import * as Yup from "yup"
import LOGO_FULL from "../../assets/placeholder.png"
import { useNavigate } from "react-router-dom"
import { AuthenticationSaveHandler } from "../../settings/routes/authentication.loader"
import { ROUTE_PATH } from "../../settings/routes/routes"
import { useLoginMutation } from "../../settings/api/endpoints/authentication"

export const LoginScreen: FC = () => {
  const navigate = useNavigate()
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: { password: passwordInputValue, username: usernameInputValue },
  } = useFormik<{
    username: string
    password: string
  }>({
    initialValues: { username: "", password: "" },
    validationSchema: SignInSchema,
    async onSubmit(credentials) {
      doLogin(credentials)
    },
  })

  const [doLogin, { data, isLoading, error }] = useLoginMutation()

  useEffect(() => {
    const { access_token } = data ?? {}
    if (!access_token) return
    const saveIsSuccess = AuthenticationSaveHandler(access_token)
    console.log({ saveIsSuccess })
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
          <Box paddingY={4}>
            <img src={LOGO_FULL} width="90%" alt="Agricultura Cero" />
            <Box sx={{ paddingTop: 1, display: "none" }}>
              <Typography fontWeight="bold" fontSize={12} textAlign={"center"}>
                AGRICULTURA CERO
              </Typography>
              <Typography fontWeight="bold" fontSize={12} textAlign={"center"}>
                Z-FARMING
              </Typography>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Nombre de usuario"
              variant="outlined"
              name="username"
              id="username"
              value={usernameInputValue}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.username}
            />
            <Box sx={{ height: 8, width: 1 }} />
            <TextField
              fullWidth
              required
              type="password"
              label="Contraseña"
              variant="outlined"
              name="password"
              id="password"
              value={passwordInputValue}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password}
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
              Iniciar sesión
            </LoadingButton>
            <Typography fontSize={12} textAlign={"center"} padding={1}>
              ¿No tienes una cuenta?
              <a href="/signup"> Registrate aqui</a>
            </Typography>
          </Box>
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

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(50)
    .required("El nombre de usuario no es valido."),
  password: Yup.string()
    .min(2)
    .max(50)
    .required("El password ingresado no es valido"),
})
