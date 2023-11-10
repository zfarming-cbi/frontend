import { FC, useEffect, useState } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { SelectField } from "../../../share/components/selectField"
import { useUpdateDeviceMutation } from "../../../settings/api/endpoints/device"
import { useAppDispatch } from "../../../settings/redux/hooks"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"

interface Props {
  dataDevice: any
  onClose(): void
}

export const FormUpdateDevice: FC<Props> = (props) => {
  const { dataDevice, onClose } = props
  const [name, setName] = useState<string>(dataDevice.name)
  const [description, setDescription] = useState<string>(dataDevice.description)
  const [code, setCode] = useState<string>(dataDevice.code)
  const [doUpdateDevice, { isLoading, error, isSuccess }] =
    useUpdateDeviceMutation()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    doUpdateDevice({ id: dataDevice.id, name, description, code })
    onClose()
  }

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
    <Grid container spacing={1} flexDirection="column">
      <Grid item xs>
        <Grid item xs>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
          />
        </Grid>
        <TextField
          fullWidth
          required
          label="Código"
          variant="outlined"
          name="code"
          id="code"
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
          value={code}
        />
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          required
          multiline
          rows={4}
          label="Descripción"
          variant="outlined"
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          disabled={isLoading}
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
          <Button sx={{ marginInline: 1 }} onClick={handleClick}>
            Guardar
          </Button>
        </Grid>
      </DialogActions>
    </Grid>
  )
}
