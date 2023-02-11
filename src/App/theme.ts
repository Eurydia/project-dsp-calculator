import { alpha, createTheme } from "@mui/material";
import { spacing } from "@mui/system";
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
        tooltip: {
          backgroundColor: grey["800"],
          color: alpha("#ffffff", 0.87),
        },
      },
    },
  },
  palette: {
    mode: "dark",
    text: {
      primary: alpha("#ffffff", 0.87),
      secondary: alpha("#ffffff", 0.6),
      disabled: alpha("#ffffff", 0.37),
    },
    contrastThreshold: 2,
  },
});
