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
  People as PeopleIcon,
  Agriculture as AgricultureIcon,
  SupportAgent as SupportAgentIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"

import { FormPQRS } from "../pqrs/form-pqrs"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  closeFormCreateFarm,
  closeFormCreateUser,
  closeFormPQRS,
  selectorDialogs,
} from "../../settings/redux/dialogs.slice"
import { Dialog } from "../../share/components/dialog"
import { FormCreateUser } from "../user/components/formCreateUser"
import { FormCreateFarm } from "../assignments/components/formCreateFarm"

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
        text: "Usuarios",
        action() {
          navigate(ROUTE_PATH.User)
        },
      },
      {
        icon: <AgricultureIcon />,
        text: "Unidades ZFarmings",
        action() {
          navigate(ROUTE_PATH.Assignments)
        },
      },
      {
        icon: <SupportAgentIcon />,
        text: "Galería Plantas",
        action() {
          navigate(ROUTE_PATH.PQRS)
        },
      },
    ],
  ]

  const navigate = useNavigate()
  const { formPQRS, formCreateUser, formCreateFarm } = useAppSelector(selectorDialogs)
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

  const onCloseFormCreateUser = () => {
    dispatch(closeFormCreateUser())
  }

  const onCloseFormCreateFarm = () => {
    dispatch(closeFormCreateFarm())
  }

  const onSavePQRSForm = () => { }
  const onSaveFormCreateUser = () => { }
  const onSaveFormCreateFarm = () => { }

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

      <Dialog
        title={"Registro usuarios"}
        onClose={onCloseFormCreateUser}
        visible={formCreateUser.visible}
      // visible={true}
      >
        <FormCreateUser onCancel={onCloseFormCreateUser} onSave={onSaveFormCreateUser} />
      </Dialog>

      <Dialog
        title={"Registro de granjas"}
        onClose={onCloseFormCreateFarm}
        visible={formCreateFarm.visible}
      // visible={true}
      >
        <FormCreateFarm onCancel={onCloseFormCreateFarm} onSave={onSaveFormCreateFarm} />
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
