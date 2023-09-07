import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

export interface PlantListRow {
  id?: string | number
  name: string
  content: string
  growing_time: string
}

const COLUMNS_DEF: GridColDef[] = [
  { field: "id", headerName: "#", width: 70 },
  { field: "name", headerName: "Nombre planta", flex: 1 },
  { field: "content", headerName: "Contenido", flex: 1 },
  { field: "growing_time", headerName: "Fecha de siembra", flex: 1 },
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
      />
    </Grid>
  )
}
