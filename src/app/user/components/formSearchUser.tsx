import { FC, FormEvent, useEffect, useState } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import { useLazyGetUsersQuery } from "../../../settings/api/endpoints/user"
import { useAppDispatch, useAppSelector } from "../../../settings/redux/hooks"
import { closeFormSearchUser } from "../../../settings/redux/dialogs.slice"
import { setDataUser } from "../../../settings/redux/dataFilter.slice"
import { selectorSession } from "../../../settings/redux/session.slice"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormSearchUser: FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { companyId = "" } = useAppSelector(selectorSession)
  const [search, setSearch] = useState<string>("")
  const [doGetUsers, { data, isLoading, error }] = useLazyGetUsersQuery()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    doGetUsers({
      companyId,
      perPage: "10",
      page: "1",
      search: search,
    })
  }

  useEffect(() => {
    if (data) {
      dispatch(setDataUser(data))
      dispatch(closeFormSearchUser())
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
