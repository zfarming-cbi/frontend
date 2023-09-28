import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Box, Grid, IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"

export interface DeviceListRow {
  id?: string | number
  name: string
  description: string
  code: string
}

const COLUMNS_DEF: GridColDef[] = [
  { field: "id", headerName: "#", width: 50 },
  {
    field: "code",
    headerName: "Código",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Nombre del dispositivo",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Descripción",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Box>
        <IconButton
          aria-label="Edit"
          onClick={() => {
            console.log(params.row)
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => {
            console.log(params.row)
          }}
        >
          <Delete />
        </IconButton>
      </Box>
    ),
  },
]

export const DeviceList: React.FC<{ rows: DeviceListRow[] }> = (props) => {
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
