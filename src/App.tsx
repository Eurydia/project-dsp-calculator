import {
  Container,
  createTheme,
  ThemeProvider,
  alpha,
  responsiveFontSizes,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

let theme = createTheme({
  palette: { primary: indigo },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: alpha("#000000", 0.8) },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

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
