import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

export interface UserListRow {
  id?: string | number
  firstname: string
  lastname: string
  username: string
}

const COLUMNS_DEF: GridColDef[] = [
  { field: "id", headerName: "#", width: 70 },
  { field: "firstname", headerName: "Nombre", flex: 1 },
  { field: "lastname", headerName: "Apellido", flex: 1 },
  { field: "username", headerName: "Email", flex: 1 },
]

export const UserList: React.FC<{ rows: UserListRow[] }> = (
  props
) => {
  return (
    <Grid container p={1}>
      <DataGrid
        rows={props.rows}
        columns={COLUMNS_DEF}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        density="compact"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        autoPageSize
      />
    </Grid>
  )
}
