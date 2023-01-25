import {
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { FormFacility } from "./forms/FormFacility";

const theme = createTheme({
  palette: {
    primary: { main: deepPurple["300"] },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.primary.light },
        }}
      />
      <Container maxWidth="md">
        <Box padding={4}>
          <FormFacility />
          {/* <BlueprintForm /> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
