import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { Close, Delete, Edit } from "@mui/icons-material"
import { FormUpdatePlant } from "./formUpdatePlant"

export interface PlantListRow {
  id?: string | number
  name: string
  content: string
  growing_time: string
  public?: boolean
  image?: string | Blob
}

const truncateContent = (content: string) => {
  const textPlane = content.replace(/[*#\\]/g, "")
  if (textPlane.length > 100) {
    return textPlane.substring(0, 100) + "..."
  } else {
    return textPlane
  }
}

export const PlantsList: React.FC<{ rows: PlantListRow[] }> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [dataPlant, setDataPlant] = React.useState<any>()
  const COLUMNS_DEF: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 70,
    },
    {
      field: "name",
      headerName: "Nombre planta",
      flex: 1,
    },
    {
      field: "content",
      headerName: "Contenido",
      flex: 1,
      renderCell: (params) => truncateContent(params.row.content),
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          aria-label="Edit"
          onClick={() => {
            setDataPlant(params.row)
            setOpen(true)
          }}
        >
          <Edit />
        </IconButton>
      ),
    },
  ]

  const handleClose = () => {
    setOpen(false)
  }

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
      <Dialog closeAfterTransition fullWidth maxWidth="lg" open={open}>
        <DialogTitle>
          Actualizar planta
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormUpdatePlant dataPlant={dataPlant} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}
