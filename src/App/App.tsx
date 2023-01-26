import {
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
} from "@mui/material";

import { FormBlueprint } from "../components";

import { theme } from "./theme";

export const App = () => {
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
          <FormBlueprint />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
