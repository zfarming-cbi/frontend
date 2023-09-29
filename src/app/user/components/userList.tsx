import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Box, Grid, IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"

export interface UserListRow {
  id?: string | number
  firstname: string
  lastname: string
  email: string
}

const COLUMNS_DEF: GridColDef[] = [
  { field: "id", headerName: "#", width: 70 },
  {
    field: "firstname",
    headerName: "Nombre",
    flex: 1,
  },
  {
    field: "lastname",
    headerName: "Apellido",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Acciones",
    flex: 1,
    renderCell: (params) => (
      <IconButton
        aria-label="Delete"
        onClick={() => {
          console.log(params.row)
        }}
      >
        <Delete />
      </IconButton>
    ),
  },
]

export const UserList: React.FC<{ rows: UserListRow[] }> = (props) => {
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
        disableSelectionOnClick
      />
    </Grid>
  )
}
