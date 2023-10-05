import { FC } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCreateUserMutation } from "../../../settings/api/endpoints/user"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { closeFormCreateUser } from "../../../settings/redux/dialogs.slice"
import {
  SelectField,
  SelectFieldValue,
} from "../../../share/components/selectField"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormCreateUser: FC<Props> = (props) => {
  const KindOfRol: SelectFieldValue<string>[] = [
    {
      value: "ADMIN",
      content: "Administrador",
    },
    {
      value: "BASIC",
      content: "Colaborador",
    },
  ]

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values: {
      password: passwordInputValue,
      email: emailInputValue,
      firstname: firstnameInputValue,
      lastname: lastnameInputValue,
      rol: rolInputValue,
    },
  } = useFormik<{
    email: string
    password: string
    firstname: string
    lastname: string
    rol: string | number
  }>({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      rol: KindOfRol[1].value,
    },
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: FormCreateUserSchema,
    async onSubmit(data) {
      doCreateUsers(data)
      dispatch(closeFormCreateUser())
    },
  })

  const dispatch = useAppDispatch()

  const [doCreateUsers, { isLoading, error }] = useCreateUserMutation()

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
      <Grid item>
        <SelectField
          label="Rol"
          name="rol"
          id="rol"
          defaultValue={KindOfRol[0].value}
          value={rolInputValue}
          values={KindOfRol}
          onSelect={(selectedValue) => {
            setFieldValue("rol", selectedValue)
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs>
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

const FormCreateUserSchema = Yup.object().shape({
  email: Yup.string()
    .min(3)
    .max(50)
    .required("El nombre de usuario no es valido."),
  password: Yup.string()
    .min(2)
    .max(50)
    .required("El password ingresado no es valido"),
  firstname: Yup.string().min(3).max(50).required("El nombre no es valido."),
  lastname: Yup.string().min(3).max(50).required("El apellido no es valido."),
})
