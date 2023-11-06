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
import { ArrowBack, FirstPage, LastPage, Search } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"
import LOGO_FULL from "../../assets/placeholder.png"
import { useLazyGetPlantsForGaleryQuery } from "../../settings/api/endpoints/plant"
import { LikesComments } from "./components/likesComments"
import { DateTime } from "luxon"
import { AppEnvVars } from "../../settings/env/environment"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  selectorDataFilter,
  setDataPlant,
} from "../../settings/redux/dataFilter.slice"
import { selectorSession } from "../../settings/redux/session.slice"

export interface PlantListRow {
  id?: string | number
  name: string
  likes: number
  comments: number
  growing_time: string
  content: string
  image: string | Blob
}

export const GaleryScreen: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [filter, setFilter] = React.useState<string>("")
  const filteredData = useAppSelector(selectorDataFilter)
  const [doGetPlants, { data: searchPlants, isLoading, error }] =
    useLazyGetPlantsForGaleryQuery()
  const { isLogged } = useAppSelector(selectorSession)

  React.useEffect(() => {
    doGetPlants({
      perPage: "10",
      page: "1",
      search: filter,
    })
  }, [filter])

  React.useEffect(() => {
    dispatch(setDataPlant(searchPlants))
  }, [searchPlants])

  const plants = React.useMemo(() => {
    return (
      filteredData.dataPlantFilter?.map<PlantListRow>(
        ({ id, name, likes, comments, growing_time, content, image }) => ({
          id,
          name,
          likes: likes?.length ?? 0,
          comments: comments?.length ?? 0,
          growing_time,
          content: content,
          image: image ?? "",
        })
      ) ?? []
    )
  }, [filteredData])

  const truncateContent = (content: string) => {
    const textWithoutHtml = content.replace(/<[^>]*>/g, "")
    const textWithoutMd = textWithoutHtml.replace(/(\\|_|\*||~~|`)(.*?)\1/g, "")
    const textPlane = textWithoutMd.replace(/[*#\\]/g, "")
    if (textPlane.length > 100) {
      return textPlane.substring(0, 100) + "..."
    } else {
      return textPlane
    }
  }

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
        <Grid
          container
          item
          xs={12}
          justifyContent={!isLogged ? "start" : "space-between"}
        >
          {isLogged && (
            <Button
              variant="text"
              onClick={() => navigate(ROUTE_PATH.Dashboard)}
            >
              <ArrowBack />
              <Typography paddingLeft={1}>Volver</Typography>
            </Button>
          )}
          {!isLogged && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(ROUTE_PATH.Login)}
            >
              Iniciar sesión
            </Button>
          )}
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
            onChange={(e) => setFilter(e.target.value)}
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
                <CardActionArea
                  sx={{ display: "flex", flex: 1 }}
                  onClick={() =>
                    navigate(
                      ROUTE_PATH.PlantFromGalery.replace(
                        ":plantId",
                        plant.id?.toString() ?? ""
                      )
                    )
                  }
                >
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
                        variant={"h5"}
                        textAlign={"left"}
                        color={"black"}
                      >
                        {plant.name}
                      </Typography>
                      <Typography fontWeight="ligth" fontSize={20} paddingY={1}>
                        {truncateContent(plant.content)}
                      </Typography>
                      {/* <Box data-color-mode="light">
                        <MDEditor.Markdown
                          data-color-mode="light"
                          source={truncateContent(plant.content)}
                        />
                      </Box> */}
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
                    image={`${AppEnvVars.IMAGE_URL}${plant.image}`}
                    alt="plant"
                    sx={{
                      width: 175,
                      height: 200,
                      flex: 1,
                      objectFit: "contain",
                    }}
                  />
                </CardActionArea>
                <LikesComments likes={plant.likes} comments={plant.comments} />
              </Box>
            </Card>
          )
        })}
      </Box>
    </Grid>
  )
}
