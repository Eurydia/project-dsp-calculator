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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  FormFlags,
  FormFlowrate,
  FormProductionDemands,
  FormProliferator,
  FormRecipe,
  useFacility,
  useNumber,
  useRecipe,
  useSorter,
  ViewSummary,
} from "../components";
import { FlagContext } from "../contexts";
import { Flags, Proliferator, ProliferatorMode } from "../types";

import { theme } from "./theme";
import { AssetRecipes, Facility, Recipe } from "../assets";
import {
  computeBillMaterialsPerFacility,
  computeBillProductsPerFacility,
  computeFacilitiesNeeded,
  computeFacilitiesPerArray,
  computeIdleConsumptionPerFacility,
  computeWorkConsumptionPerFacility,
} from "./helper";
import { SettingsRounded } from "@mui/icons-material";

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

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { facility, setFacility } = useFacility("facility");
  const { recipe, setRecipe } = useRecipe("recipe");
  const { sorter, setSorter } = useSorter("sorter");
  const {
    value: inputFlowratePerSecond,
    setValue: setInputFlowratePerSecond,
  } = useNumber("in-flow", 6);
  const {
    value: outputFlowratePerSecond,
    setValue: setOutputFlowratePerSecond,
  } = useNumber("out-flow", 6);

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
  useEffect(() => {
    setDemands(() => {
      const bill: { [K: string]: number } = {};
      Object.keys(recipe.products).forEach((key) => {
        bill[key] = 0;
      });
      return bill;
    });
  }, []);

  const handleFacilityChange = (next_facility: Facility) => {
    setFacility(next_facility);
    const available_recipes: Recipe[] = AssetRecipes.filter(
      (r) => r.recipe_type === next_facility.recipe_type,
    );

    if (recipe.recipe_type === next_facility.recipe_type) {
      return;
    }
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

  const proliferator: Proliferator = {
    mode:
      prolifMode === 0
        ? ProliferatorMode.EXTRA_PRODUCTS
        : ProliferatorMode.EXTRA_SPEED,
    level: prolifLevel,
  };

  const facilitiesPerArray = computeFacilitiesPerArray(
    facility,
    recipe,
    proliferator,
    inputFlowratePerSecond * 60,
    outputFlowratePerSecond * 60,
    flags,
  );

  const facilitiesNeeded = computeFacilitiesNeeded(
    demands,
    facility,
    recipe,
    proliferator,
  );

  const consumptionIdlePerFacility =
    computeIdleConsumptionPerFacility(facility, recipe, sorter);

  const consumptionWorkPerFacility =
    computeWorkConsumptionPerFacility(
      facility,
      recipe,
      proliferator,
      sorter,
    );

  const billMaterialsPerFacility = computeBillMaterialsPerFacility(
    facility,
    recipe,
    proliferator,
  );

  const billProductsPerFacility = computeBillProductsPerFacility(
    facility,
    recipe,
    proliferator,
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlagContext.Provider value={{ flags, setFlags }}>
        <AppBar position="sticky">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography fontWeight="bold">
              DSP Production Calculator
            </Typography>
            <Tooltip
              placement="top"
              title={<Typography>Settings</Typography>}
            >
              <IconButton
                onClick={() => {
                  setDialogOpen(true);
                }}
              >
                <SettingsRounded />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Paper
            sx={{
              marginY: 4,
            }}
          >
            <Box padding={2}>
              <Stack spacing={2}>
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
                  sorter={sorter}
                  inputFlowrate={inputFlowratePerSecond}
                  outputFlowrate={outputFlowratePerSecond}
                  onSorterChange={setSorter}
                  onInputFlowrateChange={setInputFlowratePerSecond}
                  onOutputFlowrateChange={setOutputFlowratePerSecond}
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
                  facilitiesNeeded={facilitiesNeeded}
                  facilitiesPerArray={facilitiesPerArray}
                  consumptionIdlePerFacility={
                    consumptionIdlePerFacility
                  }
                  consumptionWorkPerFacility={
                    consumptionWorkPerFacility
                  }
                  billMaterialPerFacility={billMaterialsPerFacility}
                  billProductPerFacility={billProductsPerFacility}
                />
              </Stack>
            </Box>
          </Paper>
        </Container>
      </FlagContext.Provider>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <FormFlags flags={flags} onFlagChange={setFlags} />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};
