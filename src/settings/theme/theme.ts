import { createTheme } from "@mui/material/styles"
import { green, blue } from "@mui/material/colors"
// import { esES } from "@mui/x-data-grid"
// import { esES as pickersesES } from "@mui/x-date-pickers"
// import { esES as coreesES } from "@mui/material/locale"

export const APP_THEME = createTheme({
  palette: {
    primary: {
      // main: blue[500],
      main: '#437D24',
    },
    secondary: {
      main: green[500],
    },
  },
  mixins: {
    // @ts-ignore
    denseToolbar: {
      minHeight: 48,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "contained",
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
        variant: "outlined",
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
    },
  },
})
