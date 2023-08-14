import { Grid } from "@mui/material"
import { FC } from "react"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"

import { useAppDispatch } from "../../settings/redux/hooks"
import { showFormToAddPQRS } from "../../settings/redux/dialogs.slice"
import { FormPQRS } from "./form-pqrs"

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

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="PQRS / OTE" buttons={toolbarButtons} />
      <Grid
        padding={2}
        alignSelf="center"
        justifyContent="center"
        container
        item
      >
        {/* <>PQRS Screen</> */}
        <FormPQRS onCancel={() => {}} onSave={() => {}} />
      </Grid>
    </Grid>
  )
}
