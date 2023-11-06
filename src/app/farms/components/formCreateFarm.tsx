import { FC } from "react"
import {
  Alert,
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { closeFormCreateFarm } from "../../../settings/redux/dialogs.slice"
import { useCreateFarmMutation } from "../../../settings/api/endpoints/farm"
import { Search } from "@mui/icons-material"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormCreateFarm: FC<Props> = (props) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      name: nameInputValue,
      description: descriptionInputValue,
      start_crop_dt: start_crop_dtInputValue,
      end_crop_dt: end_crop_dtInputValue,
    },
  } = useFormik<{
    name: string
    description: string
    start_crop_dt: string
    end_crop_dt: string
  }>({
    initialValues: {
      name: "",
      description: "",
      start_crop_dt: new Date().toString(),
      end_crop_dt: new Date().toString(),
    },
    validationSchema: FormCreateFarmSchema,
    async onSubmit(credentials) {
      doCreateFarm(credentials)
      dispatch(closeFormCreateFarm())
    },
  })

  const dispatch = useAppDispatch()

  const [doCreateFarm, { isLoading, error }] = useCreateFarmMutation()

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
          label="Nombre"
          variant="outlined"
          name="name"
          id="name"
          value={nameInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.name}
          helperText={errors.name}
        />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          multiline
          label="Descripción"
          variant="outlined"
          name="description"
          id="description"
          rows={4}
          value={descriptionInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.description}
          inputProps={{ maxLength: 255 }}
          helperText={errors.description}
        />
        <Typography color={"grey"}>
          {descriptionInputValue.length}/255
        </Typography>
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          label="Siembra"
          type="date"
          required
          variant="outlined"
          name="start_crop_dt"
          id="start_crop_dt"
          value={start_crop_dtInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.start_crop_dt}
        />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          label="Cosecha"
          type="date"
          variant="outlined"
          name="end_crop_dt"
          id="end_crop_dt"
          value={end_crop_dtInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.end_crop_dt}
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

const FormCreateFarmSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required("El nombre no es valido."),
  description: Yup.string()
    .min(3, "Minimo 3 caracteres")
    .max(250, "Maximo 250 caracteres")
    .required("la descripción no es valida."),
})
