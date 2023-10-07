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
import { Remarkable } from "remarkable"
import { DateTime } from "luxon"
import Editor from "@uiw/react-md-editor/lib/Editor"
import { FormCreatePlant } from "./formCreatePlant"
import { FormUpdatePlant } from "./formUpdatePlant"

export interface PlantListRow {
  id?: string | number
  name: string
  content: string
  growing_time: string
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
        <Box>
          <IconButton
            aria-label="Edit"
            onClick={() => {
              setDataPlant(params.row)
              setOpen(true)
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

  const updatePlant = () => {
    setOpen(false)
    //   name,
    //   content,
    //   growing_time,
    //   public: isPublic,
    //   image,
    // }
    // doCreatePlant(data)
  }

  const onSaveFormUpdatePlant = () => {}
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
      <Dialog
        closeAfterTransition
        fullWidth
        maxWidth="lg"
        title={"Actualizar Planta"}
        onClose={updatePlant}
        open={open}
      >
        <DialogTitle>
          <Typography variant="h5">{"Actualizar planta"}</Typography>
          {!!updatePlant && (
            <IconButton
              aria-label="close"
              onClick={updatePlant}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <FormUpdatePlant dataPlant={dataPlant} />
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

{
  /* <DialogTitle>Actualizar planta</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            name="name"
            id="name"
            value={name}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
          />
          {!!error && (
            <Alert
              sx={{
                marginTop: 1,
                textAlign: "left",
                fontSize: 10,
                alignItems: "center",
              }}
              severity="error"
              variant="filled"
            >
              lo sentimos en este momento no podemos validar la información
              {/* {JSON.stringify(error)} */
}
//     </Alert>
//   )}
// </DialogContent>
// <DialogActions>
//   <Button onClick={copyPlant}>Copiar</Button>
// </DialogActions> */}
