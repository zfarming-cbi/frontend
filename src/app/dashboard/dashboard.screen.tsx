import { FC, useEffect, useState } from "react"
import {
  Alert,
  Box,
  CssBaseline,
  IconButton,
  Snackbar,
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
  SupportAgent as SupportAgentIcon,
  Logout as LogoutIcon,
  Devices as DeviceIcon,
  AccountCircle as AccountCircleIcon,
  Yard as PlantIcon,
  Grass,
} from "@mui/icons-material"

import { FormPQRS } from "../pqrs/components/formCreatePqrs"
import { useAppDispatch, useAppSelector } from "../../settings/redux/hooks"
import {
  closeFormCreateDevice,
  closeFormCreateFarm,
  closeFormCreatePlant,
  closeFormCreateUser,
  closeFormPQRS,
  selectorDialogs,
  closeAsignDevice,
  closeFormSearchUser,
  closeFormCopyPlant,
  closeFormSearchDevice,
  closeFormSearchPlant,
  closeFormSearchPQRS,
} from "../../settings/redux/dialogs.slice"
import { Dialog } from "../../share/components/dialog"
import { FormCreateUser } from "../user/components/formCreateUser"
import { FormCreateFarm } from "../farms/components/formCreateFarm"
import { FormCreateDevice } from "../device/components/formCreateDevice"
import { FormCreatePlant } from "../plant/components/formCreatePlant"
import { AsigmentDevice } from "../farms/components/dialogAsignDevice"
import { FormSearchUser } from "../user/components/formSearchUser"
import { FormCopyPlant } from "../plant/components/formCopyPlant"
import { Rol } from "../../share/models/appSession"
import { FormSearchDevice } from "../device/components/formSearchDevice"
import { FormSearchPlant } from "../plant/components/formSearchPlant"
import { selectorSession } from "../../settings/redux/session.slice"
import {
  closeSnackbar,
  selectorSnackbar,
} from "../../settings/redux/snackbar.slice"
import { FormSearchPQRS } from "../pqrs/components/formSearchPqrs"

export const DashboardScreen: FC = () => {
  const dispatch = useAppDispatch()
  const MENU_MAIN_SESSION = 0
  const token = useAppSelector(selectorSession)
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
        icon: <AccountCircleIcon />,
        text: "Perfil de usuario",
        action() {
          navigate(ROUTE_PATH.Profile)
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

  if (token && token.rol != Rol.Administrator) {
    menuItems[MENU_MAIN_SESSION] = menuItems[MENU_MAIN_SESSION].filter(
      (item) => {
        return item.text !== "Usuarios"
      }
    )
  }

  const navigate = useNavigate()
  const {
    formPQRS,
    formCreateUser,
    formCreateFarm,
    formCreateDevice,
    formCreatePlant,
    assignDevice,
    formSearchUser,
    formCopyPlant,
    formSearchDevice,
    formSearchPlant,
    formSearchPQRS,
  } = useAppSelector(selectorDialogs)

  const { visible, severity, message } = useAppSelector(selectorSnackbar)
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

  const onCloseFormSearchPQRS = () => {
    dispatch(closeFormSearchPQRS())
  }

  const onCloseFormCreateUser = () => {
    dispatch(closeFormCreateUser())
  }

  const onCloseFormSearchUser = () => {
    dispatch(closeFormSearchUser())
  }

  const onCloseFormCreateFarm = () => {
    dispatch(closeFormCreateFarm())
  }

  const onCloseFormCreateDevice = () => {
    dispatch(closeFormCreateDevice())
  }

  const onCloseFormSearchDevice = () => {
    dispatch(closeFormSearchDevice())
  }

  const onCloseAsignDevice = () => {
    dispatch(closeAsignDevice())
  }

  const onCloseFormCreatePlant = () => {
    dispatch(closeFormCreatePlant())
  }

  const onCloseFormSearchPlant = () => {
    dispatch(closeFormSearchPlant())
  }

  const onCloseFormCopyPlant = () => {
    dispatch(closeFormCopyPlant())
  }

  const onCloseSnackbar = () => {
    dispatch(closeSnackbar())
  }

  const onSavePQRSForm = () => {}
  const onSaveFormCreateUser = () => {}
  const onSaveFormCreateFarm = () => {}
  const onSaveFormCreateDevice = () => {}
  const onSaveAsignDevice = () => {}
  const onSaveFormSearchDevice = () => {}
  const onSaveFormCreatePlant = () => {}
  const onSaveFormSearchPlant = () => {}
  const onSaveFormSearchUser = () => {}
  const onSaveFormCopyPlant = () => {}
  const onSaveFormSearchPQRS = () => {}

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
        title={"Buscar PQRS"}
        onClose={onCloseFormSearchPQRS}
        visible={formSearchPQRS.visible}
      >
        <FormSearchPQRS
          onCancel={onCloseFormSearchPQRS}
          onSave={onSaveFormSearchPQRS}
        />
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
        title={"Buscar usuarios"}
        onClose={onCloseFormSearchUser}
        visible={formSearchUser.visible}
      >
        <FormSearchUser
          onCancel={onCloseFormSearchUser}
          onSave={onSaveFormSearchUser}
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
        title={"Buscar dispositivo"}
        onClose={onCloseFormSearchDevice}
        visible={formSearchDevice.visible}
      >
        <FormSearchDevice
          onCancel={onCloseFormSearchDevice}
          onSave={onSaveFormSearchDevice}
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
        title={"Buscar planta"}
        onClose={onCloseFormSearchPlant}
        visible={formSearchPlant.visible}
      >
        <FormSearchPlant
          onCancel={onCloseFormSearchPlant}
          onSave={onSaveFormSearchPlant}
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
      <Dialog
        title={"Copiar formula"}
        onClose={onCloseFormCopyPlant}
        visible={formCopyPlant.visible}
      >
        <FormCopyPlant
          onCancel={onCloseFormCopyPlant}
          onSave={onSaveFormCopyPlant}
        />
      </Dialog>
      <Snackbar
        open={visible}
        autoHideDuration={4000}
        onClose={onCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={onCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
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
