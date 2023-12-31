import * as React from "react"
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { UserList, UserListRow } from "./components/userList"
import { useGetUsersQuery } from "../../settings/api/endpoints/user"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  showFormCreateUser,
  showFormSearchUser,
} from "../../settings/redux/dialogs.slice"
import {
  selectorDataFilter,
  setDataUser,
} from "../../settings/redux/dataFilter.slice"
import { selectorSession } from "../../settings/redux/session.slice"

export const UserScreen = () => {
  const dispatch = useAppDispatch()

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <AddIcon />,
      action() {
        dispatch(
          showFormCreateUser({
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
          showFormSearchUser({
            visible: true,
            data: {},
          })
        )
      },
    },
  ]

  const { companyId = "" } = useAppSelector(selectorSession)

  const { data } = useGetUsersQuery({
    companyId,
    page: "1",
    perPage: "10",
    search: "",
  })
  React.useEffect(() => {
    dispatch(setDataUser(data))
  }, [data])

  const filteredData = useAppSelector(selectorDataFilter)

  const users = React.useMemo(() => {
    return (
      filteredData.dataUserFilter?.map<UserListRow>(
        ({ id, firstname, lastname, email, rol, farms }) => ({
          id,
          firstname,
          lastname,
          email,
          rol: rol == "ADMIN" ? "Administrador" : "Colaborador",
          farms,
        })
      ) ?? []
    )
  }, [filteredData])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de usuarios" buttons={toolbarButtons} />
      <UserList rows={users} />
    </Grid>
  )
}
