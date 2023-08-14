import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

export interface AssociateListRow {
  id: string | number
  name: string
  documentId: string
  celularPhone: string
  phone: string
  address: string
  email: string
  type: string | number
  active: boolean
}

const COLUMNS_DEF: GridColDef[] = [
  { field: "id", headerName: "#", width: 70 },
  { field: "name", headerName: "Nombre", flex: 1 },
  { field: "documentId", headerName: "No. Documento", width: 130 },
  { field: "celularPhone", headerName: "Celular", width: 160 },
  { field: "phone", headerName: "Teléfono", width: 160 },
  { field: "address", headerName: "Dirección", flex: 1, sortable: false },
  { field: "email", headerName: "Email", flex: 1, sortable: false },
  { field: "type", headerName: "Tipo Asociado", width: 160, sortable: false },
  {
    field: "active",
    headerName: "Estado",
    width: 160,
    sortable: false,
    valueGetter(p) {
      return p.value ? "Activo" : "Inactivo"
    },
  },
]

export const AssociateList: React.FC<{ rows: AssociateListRow[] }> = (
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
