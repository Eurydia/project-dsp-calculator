import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";

import { FormBlueprint } from "../components";
import { FlagContext } from "../contexts";
import { Flags } from "../types";

import { theme } from "./theme";

const useFlags = (
  storage_key: string,
): {
  flags: Flags;
  setFlags: (
    next_flags: Flags | ((prev_flags: Flags) => Flags),
  ) => void;
} => {
  const [value, setValue] = useState((): Flags => {
    const fallback = Flags.create();
    const loaded_string: string | null =
      localStorage.getItem(storage_key);
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
    const data_string: string = JSON.stringify(value);
    localStorage.setItem(storage_key, data_string);
  }, [value]);

  return {
    flags: value,
    setFlags: setValue,
  };
};

export const App = () => {
  const { flags, setFlags } = useFlags("flags");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: deepPurple["100"],
            color: grey[900],
          },
        }}
      />
      <FlagContext.Provider value={{ flags, setFlags }}>
        <AppBar position="static">
          <Toolbar>
            <Typography fontWeight="bold">
              DSP Production Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box paddingY={4}>
            <FormBlueprint />
          </Box>
        </Container>
      </FlagContext.Provider>
    </ThemeProvider>
  );
};
