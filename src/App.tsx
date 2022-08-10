import { Container, createTheme, ThemeProvider } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

const theme = createTheme({ palette: { primary: deepPurple } });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <BlueprintForm />
      </Container>
    </ThemeProvider>
  );
}

export default App;
