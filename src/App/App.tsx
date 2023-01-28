import {
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
  Fab,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

import { FormBlueprint } from "../components";
import { FlagContext } from "../contexts";
import { Flags } from "../types";

import { theme } from "./theme";

export const App = () => {
  const [flags, setFlags] = useState((): Flags => {
    const fallback = Flags.create();
    const loaded_string: string | null =
      localStorage.getItem("flags");
    if (loaded_string === null) {
      return fallback;
    }
    try {
      return JSON.parse(loaded_string);
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    const data_string: string = JSON.stringify(flags);
    localStorage.setItem("flags", data_string);
  }, [flags]);

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
