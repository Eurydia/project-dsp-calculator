import {
  Container,
  createTheme,
  ThemeProvider,
  alpha,
  CssBaseline,
  GlobalStyles,
  Box,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import BlueprintForm from "./BlueprintForm";

const theme = createTheme({
  palette: {
    primary: { main: deepPurple["300"] },
  },
  // components: {
  //   MuiTooltip: {
  //     styleOverrides: {
  //       tooltip: {
  //         backgroundColor: alpha(grey["800"], 1),
  //       },
  //     },
  //   },
  // },
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
          <BlueprintForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
