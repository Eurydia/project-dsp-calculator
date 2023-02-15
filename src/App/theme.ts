import { alpha, createTheme } from "@mui/material";
import { deepPurple, amber, pink } from "@mui/material/colors";

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
      light: pink[300],
      main: pink[400],
      dark: pink[700],
    },

    background: {
      default: "#242038",
      paper: "#242038",
    },

    text: {
      primary: alpha(amber[50], 0.87),
      secondary: alpha(amber[50], 0.6),
      disabled: alpha(amber[50], 0.37),
    },

    contrastThreshold: 4.5,
  },
});
