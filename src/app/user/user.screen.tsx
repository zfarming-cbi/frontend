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
import jwt_decode from "jwt-decode"
import { JWTContent } from "../../share/models/appSession"
import {
  selectorDataFilter,
  setDataUser,
} from "../../settings/redux/dataFilter.slice"

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

  const token: JWTContent = jwt_decode(localStorage.getItem("token") ?? "")
  const { data } = useGetUsersQuery({
    companyId: token.companyId,
    page: "1",
    perPage: "10",
    search: "",
  })
  React.useEffect(() => {
    dispatch(setDataUser(data))
  }, [data])

  const filteredData = useAppSelector(selectorDataFilter)
  console.log("Filtered Data", filteredData)

  const users = React.useMemo(() => {
    return (
      data?.map<UserListRow>(({ id, firstname, lastname, email, rol }) => ({
        id,
        firstname,
        lastname,
        email,
        rol: rol == "ADMIN" ? "Administrador" : "Colaborador",
      })) ?? []
    )
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de usuarios" buttons={toolbarButtons} />
      <UserList rows={users} />
    </Grid>
  )
}
