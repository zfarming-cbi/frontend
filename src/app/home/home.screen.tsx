import { FC } from "react"
import { Grid } from "@mui/material"
import { CircularChart } from "./components/circularChart"

export const HomeScreen: FC = () => {
  return (
    <Grid container>
      <Grid item>
        <CircularChart />
      </Grid>
    </Grid>
  )
}
