import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import {
  FormFlowrate,
  FormProductionDemands,
  FormProliferator,
  FormRecipe,
  useFacility,
  useNumber,
  useRecipe,
  ViewSummary,
} from "../components";
import { FlagContext } from "../contexts";
import { Flags } from "../types";

import { theme } from "./theme";
import { AssetRecipes, Facility, Recipe } from "../assets";

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

  const { facility, setFacility } = useFacility("facility");
  const { recipe, setRecipe } = useRecipe("recipe");
  const { value: inputFlow, setValue: setInputFlow } = useNumber(
    "in-flow",
    6,
  );
  const { value: outputFlow, setValue: setOutputFlow } = useNumber(
    "out-flow",
    6,
  );

  const { value: prolifMode, setValue: setProlifMode } = useNumber(
    "proliferator-mode",
    0,
  );
  const { value: prolifLevel, setValue: setProlifLevel } = useNumber(
    "proliferator-level",
    0,
  );

  const [demands, setDemands] = useState<{ [K: string]: number }>({});

  useEffect(() => {
    handleFacilityChange(facility);
  }, []);

  const handleFacilityChange = (next_facility: Facility) => {
    setFacility(next_facility);
    const available_recipes: Recipe[] = AssetRecipes.filter(
      (r) => r.recipe_type === next_facility.recipe_type,
    );
    const next_recipe: Recipe = available_recipes[0];
    handleRecipeChange(next_recipe);
  };

  const handleRecipeChange = (next_recipe: Recipe) => {
    if (next_recipe.speedup_only) {
      setProlifMode(1);
    }
    setRecipe(next_recipe);
    setDemands((_) => {
      const next: { [K: string]: number } = {};
      for (const label of Object.keys(next_recipe.products)) {
        next[label] = 0;
      }
      return next;
    });
  };

  const handleDemandChange = (label: string, next_value: number) => {
    setDemands((prev) => {
      const next = { ...prev };
      next[label] = next_value;
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlagContext.Provider value={{ flags, setFlags }}>
        <AppBar position="static">
          <Toolbar>
            <Typography fontWeight="bold">
              DSP Production Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Paper
            sx={{
              marginY: 4,
            }}
          >
            <Box padding={2}>
              <Stack spacing={3}>
                <Typography fontWeight="bold" fontSize="x-large">
                  Configuration
                </Typography>
                <FormRecipe
                  facility={facility}
                  recipe={recipe}
                  onFacilityChange={handleFacilityChange}
                  onRecipeChange={handleRecipeChange}
                />
                <FormFlowrate
                  inputFlow={inputFlow}
                  outputFlow={outputFlow}
                  onInputFlowChange={setInputFlow}
                  onOutputFlowChange={setOutputFlow}
                />
                <FormProliferator
                  mode={prolifMode}
                  level={prolifLevel}
                  disableExtraProduct={recipe.speedup_only}
                  onModeChange={setProlifMode}
                  onLevelChange={setProlifLevel}
                />
                <Typography fontWeight="bold" fontSize="x-large">
                  Production Demands
                </Typography>
                <Box width={{ xs: 1, sm: 0.5 }}>
                  <FormProductionDemands
                    demands={demands}
                    onDemandChange={handleDemandChange}
                  />
                </Box>
                <ViewSummary
                  facilityMax={0}
                  facilityNeeded={0}
                  consumptionIdle={0}
                  consumptionWork={0}
                  billProduct={{}}
                  billMaterial={{}}
                />
              </Stack>
            </Box>
          </Paper>
        </Container>
      </FlagContext.Provider>
    </ThemeProvider>
  );
};
