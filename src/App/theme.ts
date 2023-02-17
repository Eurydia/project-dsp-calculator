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
      light: "hsl(318deg 55% 87%)",
      main: "hsl(318deg 55% 60%)",
      dark: "hsl(318deg 55% 37%)",
    },

    background: {
      default: "#110E1B",
      paper: "#110E1B",
    },

    text: {
      primary: alpha("#FAF7F0", 0.87),
      secondary: alpha("#FAF7F0", 0.6),
      disabled: alpha("#FAF7F0", 0.37),
    },

    contrastThreshold: 4.5,
  },
});
