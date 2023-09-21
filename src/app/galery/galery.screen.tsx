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
import {
  Comment,
  FirstPage,
  LastPage,
  Search,
  ThumbUp,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"
import LOGO_FULL from "../../assets/placeholder.png"
import { useGetPlantsForGaleryQuery } from "../../settings/api/endpoints/plant"

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
    perPage: "2",
  })

  const plants2 = React.useMemo(() => {
    return (
      data?.map<PlantListRow>(
        ({ id, name, likes, comments, growing_time, content, image }) => ({
          id,
          name,
          likes: likes?.length ?? 0,
          comments: comments?.length ?? 0,
          growing_time,
          content,
          image: image ?? "",
        })
      ) ?? []
    )
  }, [data])
  const plants = [
    {
      name: "Tomate",
      likes: 2,
      comments: 5,
      growing_time: "2023/10/04",
      content:
        "Los tomates son una planta popular en la huerta debido a su versatilidad en la cocina. Pueden ser cultivados en macetas o en el suelo y requieren un sustrato bien drenado. Asegúrate de proporcionar suficiente luz solar y riego constante para obtener una cosecha saludable. Los tomates suelen tardar alrededor de 70-90 días en madurar después de la siembra.",
      image: "src/assets/tomates.jpg",
    },
    {
      name: "Cilantro",
      image: "src/assets/cilantro.jpg",
      likes: 4,
      comments: 3,
      growing_time: "2023/10/04",
      content:
        "El cilantro es una hierba aromática ampliamente utilizada en diversas cocinas. Se puede cultivar en macetas o en el suelo, y prefiere la sombra parcial y un sustrato rico en nutrientes. Sus hojas son comestibles y se pueden cosechar cuando la planta alcanza una altura suficiente. El cilantro es conocido por su sabor único y fresco.",
    },
    {
      name: "Repollo",
      image: "src/assets/repollo.jpg",
      likes: 5,
      comments: 2,
      growing_time: "2023/10/04",
      content:
        "El repollo es una verdura de hoja que crece en cabezas compactas. Es una planta resistente y puede tolerar condiciones de frío. Se debe plantar en sustrato bien drenado y enriquecido con materia orgánica. La madurez del repollo se alcanza generalmente en 70-100 días después de la siembra, dependiendo de la variedad.",
    },
    {
      name: "Perejil",
      image: "src/assets/perejil.jpg",
      likes: 1,
      comments: 7,
      growing_time: "2023/10/04",
      content:
        "El perejil es una hierba aromática ampliamente utilizada en la cocina. Se puede cultivar en macetas o en el suelo y prefiere la luz solar parcial. Sus hojas son ricas en sabor y se pueden cosechar a medida que crece. El perejil es una planta anual que se renueva cada año.",
    },
    {
      name: "Limoncillo",
      image: "src/assets/limoncillo.jpg",
      likes: 3,
      comments: 2,
      growing_time: "2023/10/04",
      content:
        "El limoncillo es una hierba aromática conocida por su sabor cítrico. Se puede cultivar en macetas o en el suelo y prefiere pleno sol. Sus tallos se utilizan en la cocina y para hacer té. El limoncillo es fácil de cultivar y puede crecer durante todo el año en climas cálidos.",
    },
    {
      name: "Algodón",
      image: "src/assets/algodon.jpg",
      likes: 2,
      comments: 8,
      growing_time: "2023/10/04",
      content:
        "El algodón es una planta que produce fibras utilizadas en la fabricación de textiles. Requiere un clima cálido y suelos bien drenados. El proceso de cultivo del algodón es largo y requiere cuidado constante, desde la siembra hasta la cosecha. Las fibras de algodón se obtienen de las cápsulas de las semillas maduras.",
    },
    {
      name: "Aguacate",
      image: "src/assets/aguacate.jpg",
      likes: 3,
      comments: 12,
      growing_time: "2023/10/04",
      content:
        "El aguacate es un árbol frutal que produce una fruta rica en grasas saludables. Se debe plantar en un lugar soleado y en suelos bien drenados. El aguacate es conocido por su largo tiempo de maduración, que puede llevar varios años. Las flores del aguacate son hermafroditas y requieren polinización para la producción de frutas.",
    },
    {
      name: "Pan de árbol",
      image: "src/assets/pan-de-arbol.jpg",
      likes: 2,
      comments: 1,
      growing_time: "2023/10/04",
      content:
        "El pan de árbol es una planta tropical conocida por sus frutos de sabor dulce. Se debe plantar en climas cálidos y húmedos. Los frutos maduran en 8-10 meses después de la floración. El pan de árbol es una fuente importante de carbohidratos en muchas regiones tropicales.",
    },
  ]

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
        {plants2.map((plant, index) => {
          const style = !index
            ? { gridRowEnd: "span 1fr", gridColumnEnd: "span 2" }
            : {}
          return (
            // <Grid paddingTop={2} item sx={{ maxWidth: 400 }}>
            <Card
              sx={{ display: "flex", flexDirection: "row", ...style }}
              key={index}
            >
              <CardActionArea sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent
                    sx={{ display: "flex", flex: 1, flexDirection: "column" }}
                  >
                    <Typography
                      fontWeight="ligth"
                      fontSize={20}
                      textAlign={"left"}
                      color={"black"}
                    >
                      {plant.name}
                    </Typography>
                    <Typography
                      fontWeight="ligth"
                      fontSize={10}
                      textAlign={"left"}
                      color={"black"}
                    >
                      {plant.content}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Box
                      paddingRight={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <IconButton>
                        <ThumbUp />
                      </IconButton>
                      <Typography
                        fontWeight="ligth"
                        fontSize={10}
                        textAlign={"center"}
                        color={"black"}
                      >
                        {" "}
                        {plant.likes}
                      </Typography>
                    </Box>
                    <Box
                      paddingRight={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <IconButton>
                        <Comment />
                      </IconButton>
                      <Typography
                        fontWeight="ligth"
                        fontSize={10}
                        textAlign={"center"}
                        color={"black"}
                      >
                        {" "}
                        {plant.comments}
                      </Typography>
                    </Box>
                    <Box
                      paddingRight={2}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography
                        fontWeight="ligth"
                        fontSize={10}
                        textAlign={"center"}
                        color={"grey"}
                      >
                        Publicado: {plant.growing_time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  image={plant.image}
                  alt="plant"
                  sx={{ width: 150 }}
                />
              </CardActionArea>
            </Card>
          )
        })}
      </Box>
    </Grid>
  )
}
