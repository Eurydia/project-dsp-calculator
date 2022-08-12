import {
  Container,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

const theme = createTheme({
  palette: { primary: indigo },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: alpha("#000000", 0.8) },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <BlueprintForm />
      </Container>
    </ThemeProvider>
  );
}

export default App;
