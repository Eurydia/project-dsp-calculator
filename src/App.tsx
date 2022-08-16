import {
  Container,
  createTheme,
  ThemeProvider,
  alpha,
  CssBaseline,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

let theme = createTheme({
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
      <Container maxWidth="md">
        <BlueprintForm />
      </Container>
    </ThemeProvider>
  );
}

export default App;
