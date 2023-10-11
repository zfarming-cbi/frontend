import * as React from "react"
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { useAppDispatch } from "../../settings/redux/hooks"
import { showFormCreatePlant } from "../../settings/redux/dialogs.slice"
import { useGetPlantsQuery } from "../../settings/api/endpoints/plant"
import { PlantListRow, PlantsList } from "./components/plantList"

export const PlantScreen = () => {
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showFormCreatePlant({
            visible: true,
            data: {},
          })
        )
      },
    },
    {
      icon: <FilterIcon />,
      action() {},
    },
  ]

  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useGetPlantsQuery({
    page: "1",
    perPage: "10",
  })

  const plants = React.useMemo(() => {
    return (
      data?.map<PlantListRow>(
        ({ id, name, content, growing_time, public: isPublic, image }) => ({
          id,
          name,
          content,
          growing_time,
          public: isPublic,
          image,
        })
      ) ?? []
    )
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de plantas" buttons={toolbarButtons} />
      <PlantsList rows={plants} />
    </Grid>
  )
}
