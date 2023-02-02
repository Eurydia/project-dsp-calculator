import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  Box,
} from "@mui/material";
import { grey } from "@mui/material/colors";

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
            backgroundColor: theme.palette.primary.light,
            color: grey[900],
          },
        }}
      />
      <FlagContext.Provider value={{ flags, setFlags }}>
        <Container maxWidth="md">
          <FormBlueprint />
        </Container>
      </FlagContext.Provider>
    </ThemeProvider>
  );
};
