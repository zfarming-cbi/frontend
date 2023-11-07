import { Grid } from "@mui/material"
import React, { FC } from "react"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  showFormSearchPQRS,
  showFormToAddPQRS,
} from "../../settings/redux/dialogs.slice"
import { PqrsList, PqrsListRow } from "./components/pqrsList"
import { useGetTicketsQuery } from "../../settings/api/endpoints/pqrs"
import {
  selectorDataFilter,
  setDataPqrs,
} from "../../settings/redux/dataFilter.slice"

export const PQRSScreen: FC = () => {
  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showFormToAddPQRS({
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
          showFormSearchPQRS({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const filteredData = useAppSelector(selectorDataFilter)

  const { data } = useGetTicketsQuery({
    page: "1",
    perPage: "10",
    search: "",
  })

  React.useEffect(() => {
    dispatch(setDataPqrs(data))
  }, [data])

  const tickets = React.useMemo(() => {
    return (
      filteredData.dataPqrsFilter?.map<PqrsListRow>(
        ({ id, type, description, createdAt, user }) => ({
          id,
          type,
          description,
          createdAt,
          firstname: user.firstname,
          email: user.email,
        })
      ) ?? []
    )
  }, [filteredData.dataPqrsFilter])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="PQRS / OTE" buttons={toolbarButtons} />
      <PqrsList rows={tickets} />
    </Grid>
  )
}
