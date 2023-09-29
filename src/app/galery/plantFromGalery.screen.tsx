import { Card, Grid, IconButton, Typography } from "@mui/material"
import * as React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetPlantQuery } from "../../settings/api/endpoints/plant"
import { ArrowBack } from "@mui/icons-material"
import LOGO_FULL from "../../assets/placeholder.png"
import { Comments } from "./components/comments"

export const PlantFromGalery: React.FC = () => {
  const { plantId } = useParams()

  const { data } = useGetPlantQuery({ plantId })
  const [title, setTitle] = React.useState<string>()
  const [content, setContent] = React.useState<string>()
  const navigate = useNavigate()

  React.useEffect(() => {
    setTitle(data?.name)
    setContent(data?.content)
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
        <Grid
          container
          item
          xs={12}
          justifyContent={"center"}
          sx={{ border: "2px solid" }}
        >
          <Typography
            variant="h2"
            noWrap
            textAlign={"center"}
            fontWeight={"bold"}
          >
            {title}
          </Typography>
          <Typography
            fontWeight="ligth"
            fontSize={20}
            textAlign={"left"}
            color={"black"}
          >
            {content}
          </Typography>
          {/* <Comments comments={data?.comments} /> */}
        </Grid>
      </Grid>
    </Grid>
  )
}
