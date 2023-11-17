import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Grid, useMediaQuery } from "@mui/material"
import { DateTime } from "luxon"

export interface PqrsListRow {
  id?: string | number
  type?: string | number
  description?: string
  document?: string
  phone?: string
  createdAt?: string
  user?: any
}

export const PqrsList: React.FC<{ rows: PqrsListRow[] }> = (props) => {
  const isXsScreen = useMediaQuery("(max-width:600px)")
  const isSmScreen = useMediaQuery("(min-width:601px) and (max-width:960px)")
  const COLUMNS_DEF: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 70,
      hide: isXsScreen || isSmScreen,
    },
    {
      field: "firstname",
      headerName: "Usuario",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      hide: isXsScreen || isSmScreen,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
      hide: isXsScreen || isSmScreen,
    },
    {
      field: "createdAt",
      headerName: "Fecha creación",
      flex: 1,
      valueFormatter: (params) => {
        {
          return DateTime.fromISO(params.value).toLocaleString(
            DateTime.DATETIME_MED
          )
        }
      },
    },
  ]
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
