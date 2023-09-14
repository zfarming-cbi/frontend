import * as React from "react"
import Grid from "@mui/material/Grid"
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import LOGO_FULL from "../../assets/logo-2.png"
import { AppBar } from "../dashboard/components/AppBar"
import { Comment, Login, ThumbUp } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"

export const GaleryScreen: React.FC = () => {
  const navigate = useNavigate()
  const plants = [
    {
      name: "Tomate",
      likes: 2,
      comments: 5,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
      image: "src/assets/tomates.jpg",
    },
    {
      name: "Cilantro",
      image: "src/assets/cilantro.jpg",
      likes: 4,
      comments: 3,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
    {
      name: "Repollo",
      image: "src/assets/repollo.jpg",
      likes: 5,
      comments: 2,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
    {
      name: "Perejil",
      image: "src/assets/perejil.jpg",
      likes: 1,
      comments: 7,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
    {
      name: "Limoncillo",
      image: "src/assets/limoncillo.jpg",
      likes: 3,
      comments: 2,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
    {
      name: "Algodón",
      image: "src/assets/algodon.jpg",
      likes: 2,
      comments: 8,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
    {
      name: "Aguacate",
      image: "src/assets/aguacate.jpg",
      likes: 3,
      comments: 12,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
    {
      name: "Pan de árbol",
      image: "src/assets/pan-de-arbol.jpg",
      likes: 2,
      comments: 1,
      growing_time: "2023/10/04",
      content:
        "Recuerda que para este paso las \
        semillas deben estar germinadas, ahora hay que sembrarlas dentro del sustrato, \
        y sumergir su raíz en los recipientes con agua.",
    },
  ]
  return (
    <Grid
      padding={2}
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item paddingBottom={4} xs={12}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" noWrap component="div" align="center">
              Galeria de plantas
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Typography
              fontWeight="ligth"
              fontSize={15}
              textAlign={"center"}
              color={"white"}
            >
              Iniciar sesión
            </Typography>
            <IconButton onClick={() => navigate(ROUTE_PATH.Login)}>
              <Login sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
      {plants.map((plant, index) => (
        <Grid
          paddingTop={2}
          item
          xs={6}
          sx={{ color: "red", border: "2px red" }}
        >
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography
                  fontWeight="ligth"
                  fontSize={20}
                  textAlign={"center"}
                  color={"black"}
                >
                  {plant.name}
                </Typography>
                <Typography
                  fontWeight="ligth"
                  fontSize={10}
                  textAlign={"center"}
                  color={"black"}
                >
                  {plant.content}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
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
                    Fecha de cultivo: {plant.growing_time}
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
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
