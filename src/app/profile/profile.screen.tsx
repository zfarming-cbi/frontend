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
        flexDirection="row"
        alignItems={"center"}
        xs={12}
        spacing={2}
      >
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <FormProfile />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <FormChangePassword />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <FormCompany />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}
