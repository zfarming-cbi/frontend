import { createBrowserRouter, redirect, RouteObject } from "react-router-dom"
import { UserScreen } from "../../app/user/user.screen"
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
import { FarmScreen } from "../../app/farms/farm.screen"
import { SignupScreen } from "../../app/signup/signup.screen"
import { DeviceScreen } from "../../app/device/device.screen"
import { ProfileScreen } from "../../app/profile/profile.screen"
import { CompanyScreen } from "../../app/company/company.screen"
import { DeviceByFarmScreen } from "../../app/farms/farm.device.screen"
import { PlantScreen } from "../../app/plant/plant.screen"

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
    path: ROUTE_PATH.Singup,
    element: <SignupScreen />,
    loader: AuthenticationLessRouteLoader,
  },
  {
    path: ROUTE_PATH.Dashboard,
    element: <DashboardScreen />,
    loader: AuthenticationRouteLoader,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: ROUTE_PATH.User,
        element: <UserScreen />,
      },
      {
        path: ROUTE_PATH.PQRS,
        element: <PQRSScreen />,
      },
      {
        path: ROUTE_PATH.Farms,
        element: <FarmScreen />,
      },
      {
        path: ROUTE_PATH.DeviceByFarm,
        element: <DeviceByFarmScreen />,
      },
      {
        path: ROUTE_PATH.Device,
        element: <DeviceScreen />,
      },
      {
        path: ROUTE_PATH.Profile,
        element: <ProfileScreen />,
      },
      {
        path: ROUTE_PATH.Company,
        element: <CompanyScreen />,
      },
      {
        path: ROUTE_PATH.Plant,
        element: <PlantScreen />,
      },
    ],
  },
]

export const AppRouter = createBrowserRouter(ROUTER_OPTIONS)
