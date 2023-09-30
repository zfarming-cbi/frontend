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
  Devices as DeviceIcon,
  AccountCircle as AccountCircleIcon,
  Yard as PlantIcon,
  Grass,
} from "@mui/icons-material"

import { FormPQRS } from "../pqrs/components/form-pqrs"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  closeFormCreateDevice,
  closeFormCreateFarm,
  closeFormCreatePlant,
  closeFormCreateUser,
  closeFormPQRS,
  selectorDialogs,
  closeAsignDevice,
} from "../../settings/redux/dialogs.slice"
import { Dialog } from "../../share/components/dialog"
import { FormCreateUser } from "../user/components/formCreateUser"
import { FormCreateFarm } from "../farms/components/formCreateFarm"
import { FormCreateDevice } from "../device/components/formCreateDevice"
import { FormCreatePlant } from "../plant/components/formCreatePlant"
import { AsigmentDevice } from "../farms/components/dialogAsignDevice"

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
        icon: <SupportAgentIcon />,
        text: "Galería Plantas",
        action() {
          navigate(ROUTE_PATH.PQRS)
        },
      },
      {
        icon: <DeviceIcon />,
        text: "Dispositivos",
        action() {
          navigate(ROUTE_PATH.Device)
        },
      },
      {
        icon: <AccountCircleIcon />,
        text: "Perfil de usuario",
        action() {
          navigate(ROUTE_PATH.Profile)
        },
      },
      {
        icon: <PlantIcon />,
        text: "Plantas",
        action() {
          navigate(ROUTE_PATH.Plant)
        },
      },
      {
        icon: <Grass />,
        text: "Galeria de plantas",
        action() {
          navigate(ROUTE_PATH.Galery)
        },
      },
    ],
  ]

  const navigate = useNavigate()
  const {
    formPQRS,
    formCreateUser,
    formCreateFarm,
    formCreateDevice,
    formCreatePlant,
    assignDevice,
  } = useAppSelector(selectorDialogs)
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

  const onCloseFormCreateDevice = () => {
    dispatch(closeFormCreateDevice())
  }

  const onCloseFormCreatePlant = () => {
    dispatch(closeFormCreatePlant())
  }

  const onCloseAsignDevice = () => {
    dispatch(closeAsignDevice())
  }

  const onSavePQRSForm = () => {}
  const onSaveFormCreateUser = () => {}
  const onSaveFormCreateFarm = () => {}
  const onSaveFormCreateDevice = () => {}
  const onSaveFormCreatePlant = () => {}
  const onSaveAsignDevice = () => {}

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
      >
        <FormPQRS onCancel={onClosePQRSForm} onSave={onSavePQRSForm} />
      </Dialog>

      <Dialog
        title={"Registro usuarios"}
        onClose={onCloseFormCreateUser}
        visible={formCreateUser.visible}
      >
        <FormCreateUser
          onCancel={onCloseFormCreateUser}
          onSave={onSaveFormCreateUser}
        />
      </Dialog>

      <Dialog
        title={"Registro de granjas"}
        onClose={onCloseFormCreateFarm}
        visible={formCreateFarm.visible}
      >
        <FormCreateFarm
          onCancel={onCloseFormCreateFarm}
          onSave={onSaveFormCreateFarm}
        />
      </Dialog>

      <Dialog
        title={"Registro de dispositivos"}
        onClose={onCloseFormCreateDevice}
        visible={formCreateDevice.visible}
      >
        <FormCreateDevice
          onCancel={onCloseFormCreateDevice}
          onSave={onSaveFormCreateDevice}
        />
      </Dialog>

      <Dialog
        title={"Registro de plantas"}
        onClose={onCloseFormCreatePlant}
        visible={formCreatePlant.visible}
      >
        <FormCreatePlant
          onCancel={onCloseFormCreatePlant}
          onSave={onSaveFormCreatePlant}
        />
      </Dialog>

      <Dialog
        title={"Asignar dispositivos"}
        onClose={onCloseAsignDevice}
        visible={assignDevice.visible}
      >
        <AsigmentDevice
          onCancel={onCloseAsignDevice}
          onSave={onSaveAsignDevice}
        />
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
