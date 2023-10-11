import * as React from "react"
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid"
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Popper,
  Typography,
} from "@mui/material"
import { Close, Delete, Edit } from "@mui/icons-material"
import { useDeleteUserMutation } from "../../../settings/api/endpoints/user"
import { FormUpdateUser } from "./formUpdateUser"

export interface UserListRow {
  id?: string | number
  firstname?: string
  lastname?: string
  email?: string
  rol?: string | number
}

export const UserList: React.FC<{ rows: UserListRow[] }> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [openDialogDelete, setOpenDialogDelete] = React.useState<boolean>(false)
  const [idUser, setIdUser] = React.useState<string>()
  const [dataUser, setDataUser] = React.useState<any>()
  const [doDelete, { error }] = useDeleteUserMutation()

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
      field: "rol",
      headerName: "Rol",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="Edit"
            onClick={() => {
              setDataUser(params.row)
              setOpen(true)
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              setIdUser(params.row.id)
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
  const doDeleteUser = () => {
    doDelete({ id: idUser })
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
          Actualizar usuario
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
          <FormUpdateUser dataUser={dataUser} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={openDialogDelete}>
        <DialogTitle>
          Eliminar usuario
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
            ¿Desea borrar el usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialogDelete} color={"inherit"}>
            Cancelar
          </Button>
          <Button onClick={doDeleteUser}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
