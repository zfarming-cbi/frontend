import { Grid } from "@mui/material"
import React, { FC } from "react"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { useAppDispatch } from "../../settings/redux/hooks"
import { showFormToAddPQRS } from "../../settings/redux/dialogs.slice"
import { PqrsList, PqrsListRow } from "./components/pqrsList"
import { useGetTicketsQuery } from "../../settings/api/endpoints/pqrs"

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
      action(params) {},
    },
  ]

  const dispatch = useAppDispatch()
  const { data } = useGetTicketsQuery({
    page: "1",
    perPage: "10",
  })

  const tickets = React.useMemo(() => {
    return (
      data?.map<PqrsListRow>(
        ({ id, type, description, document, phone, createdAt, user }) => ({
          id,
          type,
          description,
          document,
          phone,
          createdAt,
          user,
        })
      ) ?? []
    )
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="PQRS / OTE" buttons={toolbarButtons} />
      <PqrsList rows={tickets} />
    </Grid>
  )
}
