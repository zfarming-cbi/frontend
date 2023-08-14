import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import React, { FC } from "react"
import { User } from "../models/user"

interface UserListProps {
  users: User[]
}

export const UserList: FC<UserListProps> = (props) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {props.users.map((user, key) => {
        return (
          <React.Fragment key={key}>
            <ListItem alignItems="flex-start" role="contentinfo">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.email}
                    </Typography>
                    {`\n@${user.username}`}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )
      })}
    </List>
  )
}
