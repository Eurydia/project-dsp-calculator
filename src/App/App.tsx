import {
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

import { FormBlueprint } from "../components";
import { FlagContext } from "../contexts";
import { Flags } from "../types";

import { theme } from "./theme";

export const App = () => {
  const [flags, setFlags] = useState(Flags.create());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.primary.light,
            color: grey[900],
          },
        }}
      />
      <FlagContext.Provider value={{ flags, setFlags }}>
        <Container maxWidth="md">
          <Box padding={4}>
            <FormBlueprint />
          </Box>
        </Container>
      </FlagContext.Provider>
    </ThemeProvider>
  );
};
