import { FC } from "react"
import { Card, CardContent, Grid } from "@mui/material"
import { Toolbar } from "../../share/components/toolbar"
import { FormProfile } from "./components/form-profile"
import { FormCompany } from "./components/form-company"
import { FormChangePassword } from "./components/form-change-password"

export const ProfileScreen: FC = () => {
  return (
    <Grid container flex={1} flexDirection="column">
      <Toolbar title="Configuración" />
      <Grid
        padding={2}
        container
        flex={1}
        flexDirection="column"
        alignItems={"center"}
      >
        <Card sx={{ width: "700px" }}>
          <CardContent>
            <FormProfile />
            <FormChangePassword />
            <FormCompany />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
