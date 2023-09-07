import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

export interface DeviceListRow {
    id?: string | number
    name: string
    description: string
    code: string
}

const COLUMNS_DEF: GridColDef[] = [
    { field: "id", headerName: "#", width: 70 },
    { field: "name", headerName: "Nombre del dispositivo", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "code", headerName: "Código", flex: 1 },
]

export const DeviceList: React.FC<{ rows: DeviceListRow[] }> = (
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
