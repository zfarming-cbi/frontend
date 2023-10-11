import { FC, useEffect, useState } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { useUpdateUserMutation } from "../../../settings/api/endpoints/user"
import {
  SelectField,
  SelectFieldValue,
} from "../../../share/components/selectField"

interface Props {
  dataUser: any
  onClose(): void
}

export const FormUpdateUser: FC<Props> = (props) => {
  const { dataUser, onClose } = props
  const [rol, setRol] = useState<string | number>()
  const [doUpdateUser, { isLoading, error }] = useUpdateUserMutation()
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
  const indexRol: number = KindOfRol.findIndex(
    (role) => role.content === dataUser.rol
  )

  useEffect(() => {
    setRol(dataUser.rol)
  }, [dataUser])

  const handleClick = () => {
    doUpdateUser({ id: dataUser.id, rol })
    onClose()
  }

  return (
    <Grid container spacing={1} flexDirection="column">
      <Grid item xs>
        <TextField
          fullWidth
          required
          label="Email"
          variant="outlined"
          name="email"
          id="email"
          value={dataUser.email}
          InputProps={{
            readOnly: true,
          }}
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
          value={dataUser.firstname}
          disabled={isLoading}
          InputProps={{
            readOnly: true,
          }}
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
          value={dataUser.lastname}
          disabled={isLoading}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item>
        <SelectField
          label="Rol"
          name="rol"
          id="rol"
          defaultValue={KindOfRol[indexRol].value}
          values={KindOfRol}
          onSelect={(selectedValue) => {
            setRol(selectedValue)
          }}
          fullWidth
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
