import { FC, useEffect } from "react"
import UnLockIcon from "@mui/icons-material/LockOpen"
import { Alert, Grid, Paper, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import { APP_THEME } from "../../settings/theme/theme"
import * as Yup from "yup"
import LOGO_FULL from "../../assets/placeholder.png"
import { LOG_IN } from "../../settings/grahpql/queries/login.query"
import { useLazyQuery } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { AuthenticationSaveHandler } from "../../settings/routes/authentication.loader"
import { ROUTE_PATH } from "../../settings/routes/routes"
import { blue, grey } from "@mui/material/colors"

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
    initialValues: {
      username: "jhondoe@mail.com",
      password: "jhon.doe",
    },
    // initialValues: { username: "", password: "" },
    validationSchema: SignInSchema,
    onSubmit(values) {
      const { username, password } = values
      // doLogin({
      //   variables: {
      //     credential: {
      //       username,
      //       password,
      //     },
      //   },
      // })
      const saveIsSuccess = AuthenticationSaveHandler(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      )
      if (!saveIsSuccess) return

      navigate(ROUTE_PATH.Dashboard, { replace: true })
    },
  })

  const [doLogin, { loading, data }] = useLazyQuery<{
    login: { token: string; success: boolean; msg: string; code: string }
  }>(LOG_IN)

  useEffect(() => {
    const { login } = data ?? {}
    if (!login ?? !login?.success) return

    const saveIsSuccess = AuthenticationSaveHandler(login.token)
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
            <img src={LOGO_FULL} width="90%" />
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
              disabled={loading}
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
              disabled={loading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password}
            />
            {data?.login.success === false && (
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
                {data.login.msg} ({data.login.code})
              </Alert>
            )}
            <Box sx={{ height: 8, width: 1 }} />
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<UnLockIcon />}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Iniciar sesión
            </LoadingButton>
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
