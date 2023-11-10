import { FC, useEffect, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Chip,
  DialogActions,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material"
import { useUpdateUserMutation } from "../../../settings/api/endpoints/user"
import {
  SelectField,
  SelectFieldValue,
} from "../../../share/components/selectField"
import { useAppDispatch } from "../../../settings/redux/hooks"
import {
  MesageSnackbar,
  showSnackbar,
} from "../../../settings/redux/snackbar.slice"
import { useGetFarmsQuery } from "../../../settings/api/endpoints/farm"

interface Props {
  dataUser: any
  onClose(): void
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const FormUpdateUser: FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { dataUser, onClose } = props
  const [farmsSelect, setFarmsSelect] = useState<any[]>([])
  const [rol, setRol] = useState<string | number>()
  const { data } = useGetFarmsQuery({ search: "" })
  const [doUpdateUser, { isLoading, error, isSuccess, reset }] =
    useUpdateUserMutation()
  const farms =
    data?.map(({ id, name }) => ({
      id,
      name,
    })) ?? []
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
    const farmsAsigned = dataUser.farms?.map(({ id }: { id: string }) => id)
    setRol(dataUser.rol)
    setFarmsSelect(farmsAsigned)
  }, [dataUser])

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

  const handleClick = () => {
    doUpdateUser({ id: dataUser.id, rol, farms: farmsSelect })
    onClose()
  }

  const getStyles = (
    farmsSelect: readonly any[],
    theme: Theme,
    id?: string
  ) => {
    const indice = farmsSelect.findIndex((farm) => {
      return farm.id === id
    })
    return {
      fontWeight:
        indice === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof farmsSelect>) => {
    const {
      target: { value },
    } = event

    setFarmsSelect(typeof value === "string" ? value.split(",") : value)
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
      <Grid item>
        <InputLabel id="asing-farm" sx={{ paddingBottom: 1 }}>
          Asignar granjas
        </InputLabel>
        <Select
          labelId="asing-farm"
          id="asign-farm-chip"
          multiple
          value={farmsSelect}
          onChange={handleChange}
          input={<OutlinedInput id="asign-farm-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((id) => (
                <Chip
                  key={id}
                  label={farms.find((farm) => farm.id === id)?.name}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {farms?.map(({ id, name }) => (
            <MenuItem
              key={id}
              value={id}
              style={getStyles(farmsSelect, theme, id)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
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
