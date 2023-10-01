import * as React from "react"
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { UserList, UserListRow } from "./components/userList"
import { useGetUsersQuery } from "../../settings/api/endpoints/user"
import { useAppDispatch } from "../../settings/redux/hooks"
import {
  showFormCreateUser,
  showFormSearchUser,
} from "../../settings/redux/dialogs.slice"
import jwt_decode from "jwt-decode"
import { JWTContent } from "../../share/models/appSession"

export const UserScreen = () => {
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

  const dispatch = useAppDispatch()
  const token: JWTContent = jwt_decode(localStorage.getItem("token") ?? "")
  const { data, isLoading, error } = useGetUsersQuery({
    companyId: token.companyId,
    page: "1",
    perPage: "10",
    search: "",
  })

  const users = React.useMemo(() => {
    return (
      data?.map<UserListRow>(({ id, firstname, lastname, email }) => ({
        id,
        firstname,
        lastname,
        email,
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
