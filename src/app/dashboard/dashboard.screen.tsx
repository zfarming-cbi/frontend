import { FC, useState } from "react"
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"

import { AuthenticationResetHandler } from "../../settings/routes/authentication.loader"
import { Outlet, useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../../settings/routes/routes"
import { AppBar } from "./components/AppBar"
import DrawerMenu, {
  DrawerHeader,
  DrawerMenuProps,
} from "./components/DrawerMenu"
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Man as PeopleIcon,
  Engineering as EngineeringIcon,
  SupportAgent as SupportAgentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"

import { FormPQRS } from "../pqrs/form-pqrs"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  closeFormPQRS,
  selectorDialogs,
} from "../../settings/redux/dialogs.slice"
import { Dialog } from "../../share/components/dialog"

export const DashboardScreen: FC = () => {
  const menuItems: DrawerMenuProps["items"] = [
    [
      {
        icon: <HomeIcon />,
        text: "Inicio",
        action() {
          navigate(ROUTE_PATH.Dashboard)
        },
      },
      {
        icon: <PeopleIcon />,
        text: "Asociados",
        action() {
          navigate(ROUTE_PATH.Associate)
        },
      },
      {
        icon: <SupportAgentIcon />,
        text: "PQRS/OTE",
        action() {
          navigate(ROUTE_PATH.PQRS)
        },
      },
      {
        icon: <EngineeringIcon />,
        text: "Asignaciones",
        action() {
          navigate(ROUTE_PATH.Assignments)
        },
      },
    ],
  ]

  const navigate = useNavigate()
  const { formPQRS } = useAppSelector(selectorDialogs)
  const dispatch = useAppDispatch()

  const onClickLogoutButton = () => {
    AuthenticationResetHandler()
    navigate(ROUTE_PATH.Login, { replace: true })
  }

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const onClosePQRSForm = () => {
    dispatch(closeFormPQRS())
  }

  const onSavePQRSForm = () => {}

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Z-Farming Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <DrawerMenu
          handleDrawerClose={handleDrawerClose}
          open={open}
          items={[
            ...menuItems,
            [
              {
                icon: <LogoutIcon />,
                text: "Cerrar Sesión",
                action: onClickLogoutButton,
              },
            ],
          ]}
        />
        <DashboardContent />
      </Box>

      <Dialog
        title={"Registro de PQRS"}
        onClose={onClosePQRSForm}
        visible={formPQRS.visible}
        // visible={true}
      >
        <FormPQRS onCancel={onClosePQRSForm} onSave={onSavePQRSForm} />
      </Dialog>
    </>
  )
}

export const DashboardContent: FC = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <DrawerHeader />
      <Outlet />
    </Box>
  )
}
