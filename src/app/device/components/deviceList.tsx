import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material"
import { Close, Delete, Edit } from "@mui/icons-material"
import { FormUpdateDevice } from "./formUpdateDevice"
import { useDeleteDeviceMutation } from "../../../settings/api/endpoints/device"

export interface DeviceListRow {
  id?: string | number
  name: string
  description: string
  code: string
}

export const DeviceList: React.FC<{ rows: DeviceListRow[] }> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [openDialogDelete, setOpenDialogDelete] = React.useState<boolean>(false)
  const [idDevice, setIdDevice] = React.useState<string>()
  const [dataDevice, setDataDevice] = React.useState<any>()
  const [doDelete, { error }] = useDeleteDeviceMutation()

  const COLUMNS_DEF: GridColDef[] = [
    { field: "id", headerName: "#", width: 50 },
    {
      field: "code",
      headerName: "Código",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre del dispositivo",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="Edit"
            onClick={() => {
              setDataDevice(params.row)
              setOpen(true)
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              setIdDevice(params.row.id)
              setOpenDialogDelete(true)
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleClose = () => {
    setOpen(false)
  }
  const onCloseDialogDelete = () => {
    setOpenDialogDelete(false)
  }
  const doDeleteDevice = () => {
    doDelete({ id: idDevice })
    onCloseDialogDelete()
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
          Actualizar dispositivo
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
          <FormUpdateDevice dataDevice={dataDevice} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={openDialogDelete}>
        <DialogTitle>
          Eliminar dispositivo
          <IconButton
            aria-label="close"
            onClick={onCloseDialogDelete}
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
          <DialogContentText id="alert-dialog-description">
            ¿Desea borrar el dispositivo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialogDelete} color={"inherit"}>
            Cancelar
          </Button>
          <Button onClick={doDeleteDevice}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
