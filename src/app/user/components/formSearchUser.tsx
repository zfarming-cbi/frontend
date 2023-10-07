import { FC, useState } from "react"
import { Alert, Button, DialogActions, Grid, TextField } from "@mui/material"
import {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from "../../../settings/api/endpoints/user"
import { useAppDispatch } from "../../../settings/redux/hooks"
import { JWTContent } from "../../../share/models/appSession"
import jwt_decode from "jwt-decode"
import { closeFormSearchUser } from "../../../settings/redux/dialogs.slice"

interface Props {
  onSave(): void
  onCancel(): void
}

export const FormSearchUser: FC<Props> = (props) => {
  const [search, setSearch] = useState<string>()
  const token: JWTContent = jwt_decode(localStorage.getItem("token") ?? "")
  const [doGetUsers, { isLoading, error }] = useLazyGetUsersQuery()

  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    doGetUsers({
      companyId: token.companyId,
      perPage: "10",
      page: "1",
      search: search,
    })
    dispatch(closeFormSearchUser())
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
