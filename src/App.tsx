import { Container, createTheme, ThemeProvider } from "@mui/material";
import { indigo } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

const theme = createTheme({ palette: { primary: indigo } });

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
