import { FC, FormEvent, useEffect, useState } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { JWTContent } from "../../../share/models/appSession"
import {
  closeFormSearchDevice,
  closeFormSearchUser,
} from "../../../settings/redux/dialogs.slice"
import { setDataDevice } from "../../../settings/redux/dataFilter.slice"
import { useLazyGetDevicesQuery } from "../../../settings/api/endpoints/device"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormSearchDevice: FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>("")
  const [doGetDevices, { data, isLoading, error }] = useLazyGetDevicesQuery()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    doGetDevices({
      perPage: "10",
      page: "1",
      search: search,
    })
  }

  useEffect(() => {
    if (data) {
      dispatch(setDataDevice(data))
      dispatch(closeFormSearchDevice())
    }
  }, [data, dispatch])

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
          label="Search"
          variant="outlined"
          name="search"
          id="search"
          value={search}
          disabled={isLoading}
          onChange={(e) => setSearch(e.target.value)}
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
            Enviar
          </Button>
        </Grid>
      </DialogActions>
    </Grid>
  )
}
