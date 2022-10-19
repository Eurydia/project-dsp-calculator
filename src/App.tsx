import {
  Container,
  createTheme,
  ThemeProvider,
  alpha,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { Fragment } from "react";
import BlueprintForm from "./BlueprintForm";

const theme = createTheme({
  palette: {
    primary: { main: deepPurple["300"] },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: alpha(grey["800"], 0.87) },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: deepPurple["300"],
          },
        }}
      />
      <Container maxWidth="md">
        <BlueprintForm />
      </Container>
    </ThemeProvider>
  );
}

export default App;
