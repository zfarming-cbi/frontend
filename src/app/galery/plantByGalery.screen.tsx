import { Box, Typography } from "@mui/material"
import * as React from "react"

export const PlantByGalery: React.FC = () => {
  return (
    <Box>
      <Typography variant="h2" noWrap component="div">
        Tomate
      </Typography>
      <Typography
        fontWeight="ligth"
        fontSize={10}
        textAlign={"left"}
        color={"black"}
      >
        Los tomates son una planta popular en la huerta debido a su versatilidad
        en la cocina. Pueden ser cultivados en macetas o en el suelo y requieren
        un sustrato bien drenado. Asegúrate de proporcionar suficiente luz solar
        y riego constante para obtener una cosecha saludable. Los tomates suelen
        tardar alrededor de 70-90 días en madurar después de la siembra.
      </Typography>
    </Box>
  )
}
