import { createBrowserRouter, redirect, RouteObject } from "react-router-dom"
import { AssociateScreen } from "../../app/associate/associate.screen"
import { DashboardScreen } from "../../app/dashboard/dashboard.screen"
import { LoginScreen } from "../../app/login/login.screen"
import { RootScreen } from "../../app/root/root.screen"
import {
  AuthenticationLessRouteLoader,
  AuthenticationRouteLoader,
} from "./authentication.loader"
import { ROUTE_PATH } from "./routes"
import { HomeScreen } from "../../app/home/home.screen"
import { PQRSScreen } from "../../app/pqrs/pqrs.screen"
import { AssignmentsScreen } from "../../app/assignments/assignments.screen"

export const ROUTER_OPTIONS: RouteObject[] = [
  {
    path: ROUTE_PATH.Root,
    element: <RootScreen />,
    loader: () => redirect(ROUTE_PATH.Login),
  },
  {
    path: ROUTE_PATH.Login,
    element: <LoginScreen />,
    loader: AuthenticationLessRouteLoader,
  },
  {
    path: ROUTE_PATH.Dashboard,
    element: <DashboardScreen />,
    // loader: AuthenticationRouteLoader,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: ROUTE_PATH.Associate,
        element: <AssociateScreen />,
      },
      {
        path: ROUTE_PATH.PQRS,
        element: <PQRSScreen />,
      },
      {
        path: ROUTE_PATH.Assignments,
        element: <AssignmentsScreen />,
      },
    ],
  },
]

export const AppRouter = createBrowserRouter(ROUTER_OPTIONS)
