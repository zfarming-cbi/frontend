import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Box, Grid, IconButton } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { DateTime } from "luxon"

export interface PlantListRow {
  id?: string | number
  name: string
  content: string
  growing_time: string
}

const COLUMNS_DEF: GridColDef[] = [
  {
    field: "id",
    headerName: "#",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Nombre planta",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "content",
    headerName: "Contenido",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "growing_time",
    headerName: "Fecha de siembra",
    flex: 1,
    align: "center",
    headerAlign: "center",
    valueFormatter: (params) => {
      {
        return DateTime.fromISO(params.value).toLocaleString(
          DateTime.DATETIME_MED
        )
      }
    },
  },
  {
    field: "actions",
    headerName: "Acciones",
    flex: 1,
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

export const PlantsList: React.FC<{ rows: PlantListRow[] }> = (props) => {
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
