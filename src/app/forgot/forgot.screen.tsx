import { FC, useState } from "react"
import UnLockIcon from "@mui/icons-material/LockOpen"
import {
  Alert,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import * as Yup from "yup"
import LOGO_FULL from "../../assets/placeholder.png"
import { useNavigate } from "react-router-dom"
import { useForgotMutation } from "../../settings/api/endpoints/authentication"

export const ForgotPasswordScreen: FC = () => {
  const navigate = useNavigate()
  const [resend, setResend] = useState<boolean>()
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: { email: emailInputValue },
  } = useFormik<{
    email: string
  }>({
    initialValues: { email: "" },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: ForgotSchema,
    async onSubmit(credentials) {
      doForgot(credentials)
      setResend(true)
    },
  })

  const [doForgot, { data, isLoading, error }] = useForgotMutation()

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
          <Box component="form" onSubmit={handleSubmit}>
            <Typography fontSize={12} textAlign={"center"} padding={1}>
              Ingresa tu email y enviaremos un enlace para reestablecer la
              contraseña.
            </Typography>
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
            {!!data && resend && (
              <Box>
                <Alert
                  sx={{
                    marginTop: 1,
                    textAlign: "left",
                    fontSize: 10,
                    alignItems: "center",
                  }}
                  variant="filled"
                >
                  {JSON.stringify(data.message)}
                  {/* {JSON.stringify(error)} */}
                </Alert>
                <Typography fontSize={12} textAlign={"center"} padding={1}>
                  ¿no te llego ningun enlace?{" "}
                  <Button variant={"text"} onClick={() => setResend(false)}>
                    Intentar de nuevo
                  </Button>
                </Typography>
              </Box>
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
              disabled={!!data && resend}
            >
              Enviar
            </LoadingButton>
            <Typography fontSize={12} textAlign={"center"} padding={1}>
              <a href="/login">Iniciar sesión </a>
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

const ForgotSchema = Yup.object().shape({
  email: Yup.string().min(3).max(50).required("El email no es valido."),
})
