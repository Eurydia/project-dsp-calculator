import { Container, createTheme, ThemeProvider } from "@mui/material";
import { deepPurple, purple } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

const theme = createTheme({ palette: { primary: purple } });

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
