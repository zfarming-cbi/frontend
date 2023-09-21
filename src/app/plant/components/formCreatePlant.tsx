import React, { FC } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { useCreatePlantMutation } from "../../../settings/api/endpoints/plant"
import { CheckBox } from "@mui/icons-material"
import { closeFormCreatePlant } from "../../../settings/redux/dialogs.slice"
import MDEditor, { commands } from "@uiw/react-md-editor"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormCreatePlant: FC<Props> = (props) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values: {
      name: nameInputValue,
      content: contentInputValue,
      growing_time: growing_timeInputValue,
      public: publicInputValue,
    },
  } = useFormik<{
    name: string
    content: string
    growing_time: string
    public: boolean
  }>({
    initialValues: {
      name: "",
      content: "",
      growing_time: new Date().toString(),
      public: false,
    },
    validationSchema: FormCreatePlantSchema,
    async onSubmit(credentials) {
      if (!value) {
        setContentEmpty(true)
        return
      }
      doCreatePlant({ ...credentials, content: value ?? "" })
      dispatch(closeFormCreatePlant())
    },
  })

  const dispatch = useAppDispatch()
  const [doCreatePlant, { isLoading, error }] = useCreatePlantMutation()
  const [value, setValue] = React.useState<string>()
  const [contentEmpty, setContentEmpty] = React.useState<boolean>(false)

  const codePreview = {
    name: "preview",
    keyCommand: "preview",
    value: "preview",
    icon: <Button />,
  }

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
        />
      </Grid>
      <Grid item xs>
        <MDEditor
          data-color-mode="light"
          value={value}
          onChange={setValue}
          extraCommands={[codePreview, commands.fullscreen]}
        />
      </Grid>
      {contentEmpty && (
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
          Es necesario agregar una descripción o contenido.
        </Alert>
      )}
      <Grid item xs>
        <TextField
          fullWidth
          label="Fecha de siembra"
          type="date"
          required
          variant="outlined"
          name="growing_time"
          id="growing_time"
          value={growing_timeInputValue}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.growing_time}
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

const FormCreatePlantSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required("El nombre no es valido."),
})
