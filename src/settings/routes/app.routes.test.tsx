import { CssBaseline, ThemeProvider } from "@mui/material"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { ReduxStore } from "../redux/store"
import { APP_THEME } from "../theme/theme"
import { ROUTER_OPTIONS } from "./app.routes"
import { User } from "../../share/models/user"

describe("Testing the routers", async () => {
  it.skip("Render index page", () => {
    // const users: User[] = [
    //   {
    //     username: "test",
    //     email: "test@mail.com",
    //     name: "Jhon Doe",
    //     avatar: "",
    //   },
    // ]
    // const mocks = [
    //   {
    //     request: {
    //       query: GET_USERS,
    //       variables: { name: "Buck" },
    //     },
    //     result: { data: users },
    //   },
    // ]
    // const router = createMemoryRouter(ROUTER_OPTIONS, {
    //   initialEntries: ["/"],
    // })
    // render(
    //   <Provider store={ReduxStore}>
    //     <CssBaseline />
    //     <ThemeProvider theme={APP_THEME}>
    //       <MockedProvider mocks={mocks}>
    //         <RouterProvider router={router} />
    //       </MockedProvider>
    //     </ThemeProvider>
    //   </Provider>
    // )
    // const titleText = screen.getByRole("heading")
    // expect(titleText).toHaveTextContent("PQRS - OTE")
    // make assertions, await changes, etc...
  })
})
