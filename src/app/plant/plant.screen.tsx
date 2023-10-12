import * as React from "react"
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  showFormCreatePlant,
  showFormSearchPlant,
} from "../../settings/redux/dialogs.slice"
import { useGetPlantsQuery } from "../../settings/api/endpoints/plant"
import { PlantListRow, PlantsList } from "./components/plantList"
import {
  selectorDataFilter,
  setDataPlant,
} from "../../settings/redux/dataFilter.slice"

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
      action() {
        dispatch(
          showFormSearchPlant({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]

  const dispatch = useAppDispatch()

  const { data } = useGetPlantsQuery({
    page: "1",
    perPage: "10",
    search: "",
  })

  React.useEffect(() => {
    dispatch(setDataPlant(data))
  }, [data])

  const filteredData = useAppSelector(selectorDataFilter)

  const plants = React.useMemo(() => {
    return (
      filteredData.dataPlantFilter?.map<PlantListRow>(
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
  }, [filteredData])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de plantas" buttons={toolbarButtons} />
      <PlantsList rows={plants} />
    </Grid>
  )
}
