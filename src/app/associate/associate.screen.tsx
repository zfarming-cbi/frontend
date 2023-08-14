import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { AssociateFilters, FormFilter } from "./components/formFilter"
import { AssociateList, AssociateListRow } from "./components/associateList"

export const AssociateScreen = () => {
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action(params) {},
    },
    {
      icon: <FilterIcon />,
      action(params) {},
    },
  ]

  const associateTypes = [
    {
      content: "Todos",
      value: -1,
    },
    {
      content: "Cliente",
      value: 0,
    },
    {
      content: "Empleado",
      value: 1,
    },
    {
      content: "Proveedor",
      value: 2,
    },
  ]

  const recordStatuses = [
    {
      content: "Todos",
      value: -1,
    },
    {
      content: "Activo",
      value: 1,
    },
    {
      content: "Inactivo",
      value: 0,
    },
  ]

  const associates: AssociateListRow[] = [
    {
      id: 1,
      name: "Snow",
      address: "Direccion",
      active: true,
      celularPhone: "000000",
      documentId: "1234567890",
      email: "jonDoe@email.com",
      phone: "00000",
      type: "Empleado",
    },
  ]

  const onSearchAssociate = (filters?: AssociateFilters) => {
    console.log(">>> Associate filters: ", filters)
  }

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Asociados" buttons={toolbarButtons} />
      <Grid
        sx={{ padding: 2, alignSelf: "center", justifyContent: "center" }}
        item
        container
        m={3}
      >
        <FormFilter
          associateActive={recordStatuses}
          associateTypes={associateTypes}
          onSearchAssociate={onSearchAssociate}
        />
      </Grid>
      <AssociateList rows={associates} />
    </Grid>
  )
}
