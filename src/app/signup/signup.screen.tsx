import { FC, useEffect } from "react"
import UnLockIcon from "@mui/icons-material/LockOpen"
import { Alert, Grid, Paper, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import * as Yup from "yup"
import LOGO_FULL from "../../assets/placeholder.png"
import { Link, useNavigate } from "react-router-dom"
import { AuthenticationSaveHandler } from "../../settings/routes/authentication.loader"
import { ROUTE_PATH } from "../../settings/routes/routes"
import { useSignupMutation } from "../../settings/api/endpoints/authentication"

export const SignupScreen: FC = () => {
  const navigate = useNavigate()
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      password: passwordInputValue,
      email: emailInputValue,
      company: companyInputValue,
      nit: nitInputValue,
      firstname: firstnameInputValue,
      lastname: lastnameInputValue,
    },
  } = useFormik<{
    email: string
    password: string
    firstname: string
    lastname: string
    company: string
    nit: string
  }>({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      company: "",
      nit: "",
    },
    validationSchema: SignUpSchema,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    async onSubmit(credentials) {
      doSignup(credentials)
    },
  })

  const [doSignup, { data, isLoading, error }] = useSignupMutation()

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
      <Grid item xs={8} sm={5} lg={3}>
        <Paper
          sx={{ paddingX: 3, textAlign: "center", backgroundColor: "white" }}
          elevation={3}
        >
          <Box>
            <img src={LOGO_FULL} width="90%" alt="Agricultura Cero" />
            <Typography
              fontWeight="ligth"
              fontSize={20}
              textAlign={"center"}
              color={"grey"}
            >
              Crear cuenta
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Empresa"
              variant="outlined"
              name="company"
              id="company"
              value={companyInputValue}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.company}
              helperText={errors.company}
            />
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
              helperText={errors.nit}
            />
            <TextField
              fullWidth
              required
              label="Email"
              variant="outlined"
              name="email"
              id="email"
              value={emailInputValue}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              required
              label="Nombre"
              variant="outlined"
              name="firstname"
              id="firstname"
              value={firstnameInputValue}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.firstname}
              helperText={errors.firstname}
            />
            <TextField
              fullWidth
              required
              label="Apellido"
              variant="outlined"
              name="lastname"
              id="lastname"
              value={lastnameInputValue}
              disabled={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.lastname}
              helperText={errors.lastname}
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
              helperText={errors.password}
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
              Guardar
            </LoadingButton>
            <Typography fontSize={12} textAlign={"center"} padding={1}>
              ¿Ya tienes una cuenta?
              <Link to={ROUTE_PATH.Login}> Inicar sesión</Link>
            </Typography>
          </Box>
          <Box paddingTop={1} paddingBottom={2}>
            <Typography fontSize={8} textAlign={"center"} padding={1}>
              Todos los derechos reservados
              <br />
              Desarrollado por:
              <Link to="mailto:krisskira@gmail.com">krisskira@gmail.com</Link>
              <br />
              <Link to="https://kriverdevice.com">www.kriverdevice.com</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El nombre de usuario no es valido."),
  password: Yup.string()
    .min(8, "Minimo 8 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("La contraseña ingresada no es valido"),
  firstname: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El nombre no es valido."),
  lastname: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El apellido no es valido."),
  company: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El nombre de la compañia no es valido."),
  nit: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(50, "Maximo 50 caracteres")
    .required("El NIT no es valido."),
})
