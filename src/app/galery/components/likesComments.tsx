import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import { Comment, ContentCopy, ThumbUp } from "@mui/icons-material"
import { Typography } from "@mui/material"

interface Props extends React.PropsWithChildren {
  likes: number
  comments: number
  disabled: boolean
}

export const LikesComments: React.FC<Props> = (props) => {
  const { likes, comments, disabled } = props
  return (
    <Stack direction="row" spacing={1} sx={{ display: "flex", pl: 1 }}>
      <IconButton disabled={disabled}>
        <ThumbUp />
      </IconButton>
      <Typography
        fontWeight="ligth"
        fontSize={15}
        color={"black"}
        alignSelf={"center"}
      >
        {" "}
        {likes}
      </Typography>
      <IconButton disabled>
        <Comment />
      </IconButton>
      <Typography
        fontWeight="ligth"
        fontSize={15}
        color={"black"}
        alignSelf={"center"}
      >
        {" "}
        {comments}
      </Typography>
    </Stack>
  )
}
