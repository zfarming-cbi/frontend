import { ApolloProvider } from "@apollo/client"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { FC } from "react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { API_CLIENT } from "./settings/grahpql/client"
import { ReduxStore } from "./settings/redux/store"
import { AppRouter } from "./settings/routes/app.routes"
import { APP_THEME } from "./settings/theme/theme"

export const App: FC = () => (
  <Provider store={ReduxStore}>
    <CssBaseline />
    <ThemeProvider theme={APP_THEME}>
      <ApolloProvider client={API_CLIENT}>
        <RouterProvider router={AppRouter} />
      </ApolloProvider>
    </ThemeProvider>
  </Provider>
)

export default App
