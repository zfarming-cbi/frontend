import { FC } from "react"
import {
  Alert,
  Box,
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../settings/api/endpoints/user"

export const ProfileScreen: FC = () => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      firstname: firstnameInputValue,
      lastname: lastnameInputValue,
      email: emailInputValue,
    },
  } = useFormik<{
    firstname: string
    lastname: string
    email: string
  }>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormEditProfileSchema,
    async onSubmit(credentials) {
      doUpdateUser(credentials)
    },
  })

  const { data } = useGetUserQuery()
  const [doUpdateUser, { isLoading, error }] = useUpdateUserMutation()

  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      container
    >
      <Grid
        container
        spacing={1}
        component="form"
        flexDirection="column"
        onSubmit={handleSubmit}
        item
        xs={8}
        sm={5}
        lg={4}
      >
        <Box>
          <Typography
            fontWeight="ligth"
            fontSize={20}
            textAlign={"center"}
            color={"grey"}
          >
            Perfil de usuario
          </Typography>
        </Box>
        <Grid item xs>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            name="firstname"
            id="firstname"
            defaultValue={data?.firstname}
            value={firstnameInputValue}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.firstname}
          />
        </Grid>
        <Grid item xs>
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
          />
        </Grid>
        <Grid item xs>
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
    </Grid>
  )
}

const FormEditProfileSchema = Yup.object().shape({
  firstname: Yup.string().min(3).max(50).required("El nombre no es valido."),
  lastname: Yup.string().min(3).max(50).required("El apellido no es valido."),
  email: Yup.string()
    .min(3)
    .max(50)
    .required("El nombre de usuario no es valido."),
})
