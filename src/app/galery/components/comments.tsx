import { Comment, PersonPin, ThumbUp } from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import * as React from "react"
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../../../settings/api/endpoints/plantComments"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../../settings/routes/routes"
import { DateTime } from "luxon"
import {
  useCreateLikeMutation,
  useLazyGetLikeQuery,
} from "../../../settings/api/endpoints/plantLikes"
import { useAppSelector } from "../../../settings/redux/hooks"
import { selectorSession } from "../../../settings/redux/session.slice"

interface Props {
  plantId?: string
  isLogged?: boolean
}

export interface CommentsListRow {
  id?: string | number
  message?: string
  date?: string
  createdAt?: string
  user?: any
}

export const Comments: React.FC<Props> = (props) => {
  const { plantId, isLogged } = props
  const { userId = "" } = useAppSelector(selectorSession)
  const [liked, setLiked] = React.useState<boolean>()
  const [message, setMessage] = React.useState<string>()
  const { data } = useGetCommentsQuery({ plantId: plantId ?? "" })

  const [doGetLike, { data: like }] = useLazyGetLikeQuery()
  React.useEffect(() => {
    setLiked(Boolean(like?.like))
  }, [like])
  React.useEffect(() => {
    if (!isLogged) {
      return
    }
    doGetLike({
      plantId: plantId ?? "",
      userId,
    })
  }, [])
  const [doCreateComment, { isLoading, error }] = useCreateCommentMutation()
  const [doCreateLike] = useCreateLikeMutation()
  const navigate = useNavigate()
  const comments = React.useMemo(() => {
    return (
      data?.map<CommentsListRow>(({ id, message, date, createdAt, user }) => ({
        id,
        message,
        date,
        createdAt,
        user,
      })) ?? []
    )
  }, [data])

  const handleCreateComment = () => {
    doCreateComment({
      message: message,
      userId,
      plantId: plantId,
    })
    setMessage("")
  }

  const handleCreateLike = () => {
    setLiked(!liked)
    doCreateLike({
      like: Number(!liked),
      userId,
      plantId: plantId,
    })
  }

  return (
    <Grid container spacing={1} flexDirection="column">
      <Grid item xs>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            fontWeight="ligth"
            fontSize={20}
            textAlign={"left"}
            color={"grey"}
          >
            {comments?.length} Comentarios
          </Typography>
          {!!isLogged && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight="ligth"
                fontSize={15}
                color={liked ? "primary" : "disabled"}
                paddingTop={0.5}
              >
                {liked ? "Te gusta" : "Me gusta"}
              </Typography>
              <IconButton onClick={handleCreateLike} disabled={!isLogged}>
                <ThumbUp color={liked ? "primary" : "disabled"} />
              </IconButton>
            </Box>
          )}
        </Box>
        <Divider sx={{ marginBottom: 5 }} />
        {comments?.map((comment, index) => (
          <Card key={index} sx={{ margin: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <PersonPin sx={{ marginRight: "5px" }} />
                  <Typography
                    fontWeight="ligth"
                    fontSize={15}
                    textAlign={"left"}
                  >
                    {comment.user?.firstname ?? "no llega el usuario"}
                  </Typography>
                </Box>
                <Typography
                  fontWeight="ligth"
                  fontSize={10}
                  textAlign={"left"}
                  color={"grey"}
                >
                  {DateTime.fromISO(comment.createdAt ?? "").toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </Typography>
              </Box>
              <Typography
                fontWeight="ligth"
                fontSize={15}
                textAlign={"left"}
                color={"grey"}
                marginTop={2}
              >
                {comment.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid item xs>
        <TextField
          disabled={!isLogged || isLoading}
          fullWidth
          multiline
          label="Agrega un comentario"
          variant="outlined"
          name="comment"
          id="comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          InputProps={{
            endAdornment: (
              <Comment fontSize="large" sx={{ mr: 1 }} color="disabled" />
            ),
          }}
        />
      </Grid>
      {!!error && (
        <Alert
          sx={{
            marginTop: 1,
            textAlign: "left",
            fontSize: 10,
            alignItems: "center",
          }}
          severity="error"
          variant="filled"
        >
          lo sentimos en este momento no podemos validar la información
          {/* {JSON.stringify(error)} */}
        </Alert>
      )}
      <Grid container item xs={12} justifyContent="end" marginTop={1}>
        {!isLogged && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTE_PATH.Login)}
          >
            Iniciar sesión
          </Button>
        )}
        {isLogged && (
          <Button sx={{ marginInline: 1 }} onClick={handleCreateComment}>
            Enviar
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
