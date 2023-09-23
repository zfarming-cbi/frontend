import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { FirstPage, LastPage, Search } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"
import LOGO_FULL from "../../assets/placeholder.png"
import { useGetPlantsForGaleryQuery } from "../../settings/api/endpoints/plant"
import { LikesComments } from "./components/likesComments"
import { DateTime } from "luxon"
import { Remarkable } from "remarkable"

export interface PlantListRow {
  id?: string | number
  name: string
  likes: number
  comments: number
  growing_time: string
  content: string
  image: string
}

export const GaleryScreen: React.FC = () => {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetPlantsForGaleryQuery({
    page: "1",
    perPage: "10",
  })
  const isLogged = localStorage.getItem("token") ?? undefined

  const remarkable = new Remarkable()

  const plants = React.useMemo(() => {
    return (
      data?.map<PlantListRow>(
        ({ id, name, likes, comments, growing_time, content, image }) => ({
          id,
          name,
          likes: likes?.length ?? 0,
          comments: comments?.length ?? 0,
          growing_time,
          content: remarkable.render(content),
          image: image ?? "",
        })
      ) ?? []
    )
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
        <Grid container item xs={12} justifyContent={"end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTE_PATH.Login)}
            sx={{ display: !!isLogged ? "none" : "flex" }}
          >
            Iniciar sesión
          </Button>
        </Grid>
        <Grid container item xs={12} justifyContent={"center"}>
          <img src={LOGO_FULL} width="30%" alt="Agricultura Cero" />
        </Grid>
        <Grid container item xs={12} justifyContent={"center"}>
          <Typography variant="h4" noWrap component="div" align="center">
            Galeria de plantas
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent={"start"} marginBottom={2}>
          <TextField
            variant="outlined"
            label="Buscar planta"
            name="searchPlant"
            id="searchPlant"
            InputProps={{
              endAdornment: <Search sx={{ mr: 1 }} color="disabled" />,
            }}
          />
          <IconButton>
            <FirstPage />
          </IconButton>
          <IconButton>
            <LastPage />
          </IconButton>
        </Grid>
      </Grid>
      <Box
        alignSelf="center"
        sx={{
          flex: 1,
          display: "grid",
          gridGap: 16,
          gridTemplateColumns: `repeat(3, auto)`,
          width: "100%",
        }}
      >
        {plants.map((plant, index) => {
          const style = !index
            ? { gridRowEnd: "span 1fr", gridColumnEnd: "span 2" }
            : {}
          return (
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                ...style,
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <CardActionArea sx={{ display: "flex", flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                      height: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        paddingTop: 0,
                        justifyContent: "space-between",
                        "&:last-child": {
                          paddingBottom: 0,
                        },
                      }}
                    >
                      <Typography
                        fontWeight="ligth"
                        fontSize={20}
                        textAlign={"left"}
                        color={"black"}
                      >
                        {plant.name}
                      </Typography>
                      <div
                        dangerouslySetInnerHTML={{ __html: plant.content }}
                      />
                      {/* <Typography
                        fontWeight="ligth"
                        fontSize={10}
                        textAlign={"left"}
                        color={"black"}
                        paddingRight={1}
                      >
                        {plant.content}
                      </Typography> */}
                      <Typography
                        fontWeight="ligth"
                        fontSize={10}
                        textAlign={"left"}
                        color={"grey"}
                        paddingY={1}
                      >
                        Publicado:{" "}
                        {DateTime.fromISO(plant.growing_time).toLocaleString(
                          DateTime.DATETIME_MED
                        )}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    image={plant.image}
                    alt="plant"
                    sx={{ width: 175, height: 200, flex: 1 }}
                  />
                </CardActionArea>
                <LikesComments
                  likes={plant.likes}
                  comments={plant.comments}
                  disabled={!isLogged}
                />
              </Box>
            </Card>
          )
        })}
      </Box>
    </Grid>
  )
}
