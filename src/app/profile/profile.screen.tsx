import { FC } from "react"
import { Box, Card, CardContent, Divider, Grid } from "@mui/material"
import { Toolbar } from "../../share/components/toolbar"
import { FormProfile } from "./components/form-profile"
import { FormCompany } from "./components/form-company"
import { FormChangePassword } from "./components/form-change-password"

export const ProfileScreen: FC = () => {
  return (
    <Grid container flex={1} flexDirection={"column"}>
      <Toolbar title="Configuración" />
      <Grid container flex={1}>
        <Grid item xs={12} md={6} lg={6} padding={1}>
          <Card sx={{ height: "100%", display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <FormCompany />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6} padding={1}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <FormProfile />
              <Divider />
              <FormChangePassword />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}
