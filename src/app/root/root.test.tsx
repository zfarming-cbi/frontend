import { CssBaseline, ThemeProvider } from "@mui/material"
import { screen, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { describe, it } from "vitest"

import { ReduxStore } from "../../settings/redux/store"
import { ROUTER_OPTIONS } from "../../settings/routes/app.routes"
import { APP_THEME } from "../../settings/theme/theme"

describe("Root Screen", () => {
  it.skip("Render Root Screen", () => {
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
    // expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    //   "PQRS - OTE"
    // )
  })
})
