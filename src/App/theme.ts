import { alpha, createTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";

export const theme = createTheme({
  components: {
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
    primary: { main: deepPurple["300"] },
  },
});