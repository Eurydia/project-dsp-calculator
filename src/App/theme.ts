import { alpha, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          userSelect: "none",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          userSelect: "none",
          backgroundColor: "inherit",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => {
          return {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          };
        },
      },
    },
  },
  palette: {
    mode: "dark",

    primary: {
      dark: "#725ac1",
      main: "#8d86c9",
      light: "#cac4ce",
    },

    background: {
      default: "#242038",
      paper: "#242038",
    },

    text: {
      primary: alpha("#f7ece1", 0.87),
      secondary: alpha("#f7ece1", 0.6),
      disabled: alpha("#f7ece1", 0.37),
    },

    contrastThreshold: 4.5,
  },
});
