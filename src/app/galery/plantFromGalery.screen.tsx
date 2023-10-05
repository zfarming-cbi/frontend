import { Box, Grid, IconButton, Typography } from "@mui/material"
import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetPlantQuery } from "../../settings/api/endpoints/plant"
import { ArrowBack } from "@mui/icons-material"
import { Comments } from "./components/comments"
import { DateTime } from "luxon"
import { LikesComments } from "./components/likesComments"
import { AppEnvVars } from "../../settings/env/environment"
import MDEditor from "@uiw/react-md-editor"

export const PlantFromGalery: React.FC = () => {
  const { plantId } = useParams()

  const { data } = useGetPlantQuery({ plantId })
  const [title, setTitle] = React.useState<string>()
  const [updatedAt, setUpdatedAt] = React.useState<string>()
  const [content, setContent] = React.useState<string>()
  const [likes, setLikes] = React.useState<number>()
  const [comments, setComments] = React.useState<number>()
  const [image, setImage] = React.useState<string>()
  const navigate = useNavigate()

  React.useEffect(() => {
    setTitle(data?.name)
    setContent(data?.content)
    setUpdatedAt(data?.updatedAt ?? "")
    setLikes(data?.likes?.length ?? 0)
    setComments(data?.comments?.length ?? 0)
    setImage(data?.image ?? "")
  }, [data])
  return (
    <Grid
      padding={4}
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Grid container item xs={12} justifyContent="space-between">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
            <Typography paddingLeft={1}>Volver</Typography>
          </IconButton>
        </Grid>
        <Grid container item xs={12} flexDirection={"column"}>
          <Box
            sx={{
              display: "flex",
              maxWidth: "800px",
              flexDirection: "column",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography
              variant="h2"
              noWrap
              textAlign={"center"}
              fontWeight={"bold"}
              paddingBottom={2}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                height: "100%",
              }}
            >
              <Typography fontWeight="medium" fontSize={15}>
                Ultima actualización: {""}
                {DateTime.fromISO(updatedAt ?? "").toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <LikesComments likes={likes} comments={comments} />
              </Box>
            </Box>
            <img
              style={{
                width: 300,
                margin: "20px auto",
              }}
              src={`${AppEnvVars.IMAGE_URL}${image}`}
            />
            <Typography data-color-mode="light" paddingY={2} marginY={3}>
              <MDEditor.Markdown data-color-mode="light" source={content} />
            </Typography>
            <Comments plantId={plantId} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
