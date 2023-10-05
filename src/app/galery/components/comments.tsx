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
import jwt_decode from "jwt-decode"
import { JWTContent } from "../../../share/models/appSession"
import { DateTime } from "luxon"
import {
  useCreateLikeMutation,
  useGetLikeQuery,
} from "../../../settings/api/endpoints/plantLikes"

interface Props {
  plantId?: string
}

export interface CommentsListRow {
  id?: string | number
  message?: string
  date?: string
  createdAt?: string
  user?: any
}

export const Comments: React.FC<Props> = (props) => {
  const { plantId } = props
  const isLogged = localStorage.getItem("token") ?? undefined
  const [liked, setLiked] = React.useState<boolean>()
  const [message, setMessage] = React.useState<string>()
  const { data } = useGetCommentsQuery({ plantId: plantId ?? "" })
  let token: JWTContent
  if (isLogged) {
    const decodeToken: JWTContent = jwt_decode(isLogged ?? "")
    token = decodeToken
    const isLike = useGetLikeQuery({
      plantId: plantId ?? "",
      userId: token.sub,
    })
    React.useEffect(() => {
      setLiked(!!isLike?.data?.like)
    }, [isLike])
  }
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
      userId: token.sub,
      plantId: plantId,
    })
    setMessage("")
  }

  const handleCreateLike = () => {
    setLiked(!liked)
    console.log({
      like: 1,
      userId: token.sub,
      plantId: plantId,
    })
    doCreateLike({
      like: 1,
      userId: token.sub,
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
              <IconButton
                onClick={handleCreateLike}
                disabled={liked || !isLogged}
              >
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(ROUTE_PATH.Login)}
          sx={{ display: !!isLogged ? "none" : "flex" }}
        >
          Iniciar sesión
        </Button>
        <Button
          sx={{ marginInline: 1, display: !isLogged ? "none" : "flex" }}
          onClick={handleCreateComment}
        >
          Enviar
        </Button>
      </Grid>
    </Grid>
  )
}
