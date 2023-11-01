import { FC, useEffect } from "react"
import {
  Alert,
  Box,
  Button,
  Card,
  DialogActions,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../settings/api/endpoints/user"
import { useAppDispatch, useAppSelector } from "../../../settings/redux/hooks"
import { selectorSession } from "../../../settings/redux/session.slice"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"

export const FormProfile: FC = () => {
  const { userId = "" } = useAppSelector(selectorSession)
  const dispatch = useAppDispatch()

  const { data } = useGetUserQuery({ id: userId })
  useEffect(() => {
    setFieldValue("firstname", data?.firstname ?? "")
    setFieldValue("lastname", data?.lastname ?? "")
    setFieldValue("email", data?.email ?? "")
  }, [data])
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
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

  const [doUpdateUser, { isLoading, error, isSuccess, reset }] =
    useUpdateUserMutation()

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
          Usuario
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs>
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
  )
}

const FormEditProfileSchema = Yup.object().shape({
  firstname: Yup.string().min(3).max(50).required("El nombre no es valido."),
  lastname: Yup.string().min(3).max(50).required("El apellido no es valido."),
  email: Yup.string().min(3).max(50).required("El email no es valido."),
})
