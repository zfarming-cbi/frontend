import * as React from 'react';
import { Grid } from "@mui/material"
import { Add as AddIcon, Search as FilterIcon } from "@mui/icons-material"
import { Toolbar, ToolbarButton } from "../../share/components/toolbar"
import { UserList, UserListRow } from "./components/userList"
import { useGetUsersQuery } from '../../settings/api/endpoints/user';
import { useAppDispatch } from '../../settings/redux/hooks';
import { showFormCreateUser } from '../../settings/redux/dialogs.slice';

export const UserScreen = () => {
  var open = false;
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
      action() { },
    },
  ]

  const dispatch = useAppDispatch()


  const { data, isLoading, error } = useGetUsersQuery()

  const users = React.useMemo(() => {
    return data?.map<UserListRow>(({ id, firstname, lastname, username }) => ({ id, firstname, lastname, username })) ?? []
  }, [data])

  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Gestión de usuarios" buttons={toolbarButtons} />
      <UserList rows={users} />
    </Grid>
  )
}
