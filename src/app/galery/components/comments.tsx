import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import * as React from "react"

interface Props {
  comments?: []
}

export const Comments: React.FC<Props> = (props) => {
  const { comments } = props
  return (
    <Box>
      {comments?.map((comment, index) => (
        <Card key={index}>
          <CardContent>
            <Typography
              fontWeight="ligth"
              fontSize={10}
              textAlign={"left"}
              color={"grey"}
            >
              nombre de usuario
            </Typography>
            <Typography
              fontWeight="ligth"
              fontSize={10}
              textAlign={"left"}
              color={"grey"}
            >
              mensaje del comentario
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Grid container spacing={1} component="form" flexDirection="column">
        <Grid item xs>
          <TextField
            fullWidth
            required
            multiline
            label="Comentario"
            variant="outlined"
            name="comment"
            id="comment"
            rows={4}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="end" marginTop={1}>
          <Button sx={{ marginInline: 1 }} type="submit">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
