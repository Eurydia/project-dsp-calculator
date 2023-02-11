import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Typography,
  Paper,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  DisplaySettingsRounded,
  FactoryRounded,
  PowerRounded,
  PrecisionManufacturingRounded,
} from "@mui/icons-material";

import {
  AutocompleteFacility,
  AutocompleteProliferator,
  AutocompleteRecipe,
  AutocompleteSorter,
  FieldNumber,
  FormFlags,
  FormObjectives,
  useFacility,
  useNumber,
  useProliferator,
  useRecipe,
  useSorter,
  ViewSummary,
} from "../components";
import { Flags } from "../types";
import {
  AssetProliferators,
  AssetRecipes,
  Facility,
  Recipe,
} from "../assets";

import { theme } from "./theme";
import { AppLayout } from "./AppLayout";
import {
  computeBillMaterialsPerFacility,
  computeBillProductsPerFacility,
  computeFacilitiesNeeded,
  computeFacilitiesPerArray,
  computeIdleConsumptionPerFacility,
  computeWorkConsumptionPerFacility,
} from "./helper";

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
  const { proliferator, setProliferator } =
    useProliferator("proliferator");
  const { sorter, setSorter } = useSorter("sorter");
  const {
    value: inputFlowratePerSecond,
    setValue: setInputFlowratePerSecond,
  } = useNumber("in-flow", 6);
  const {
    value: outputFlowratePerSecond,
    setValue: setOutputFlowratePerSecond,
  } = useNumber("out-flow", 6);

  const [objectives, setObjectives] = useState<{
    [K: string]: number;
  }>({});

  useEffect(() => {
    handleFacilityChange(facility);
  }, []);

  useEffect(() => {
    setObjectives(() => {
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
      setProliferator(AssetProliferators[0]);
    }
    setRecipe(next_recipe);
    setObjectives((_) => {
      const next: { [K: string]: number } = {};
      for (const label of Object.keys(next_recipe.products)) {
        next[label] = 0;
      }
      return next;
    });
  };

  const handleObjectiveChange = (
    label: string,
    next_value: number,
  ) => {
    setObjectives((prev) => {
      const next = { ...prev };
      next[label] = next_value;
      return next;
    });
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
    objectives,
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
      <Container maxWidth="lg">
        <AppLayout
          slotSide={
            <Paper sx={{ padding: 2 }}>
              <Typography
                fontWeight="bold"
                fontSize="x-large"
                color={theme.palette.text.secondary}
              >
                1. Settings
              </Typography>
              <Stack spacing={3}>
                <Divider flexItem>
                  <Tooltip
                    placement="top"
                    title={<Typography>Factory</Typography>}
                  >
                    <FactoryRounded />
                  </Tooltip>
                </Divider>
                <Stack spacing={2}>
                  <AutocompleteFacility
                    facility={facility}
                    onFacilityChange={handleFacilityChange}
                  />
                  <AutocompleteRecipe
                    recipeType={facility.recipe_type}
                    recipe={recipe}
                    onRecipeChange={handleRecipeChange}
                  />
                </Stack>
                <Divider flexItem>
                  <Tooltip
                    placement="top"
                    title={<Typography>Transportation</Typography>}
                  >
                    <PrecisionManufacturingRounded />
                  </Tooltip>
                </Divider>
                <Stack spacing={2}>
                  <FieldNumber
                    suffix="/s"
                    label="Input belt capacity"
                    minValue={6}
                    maxValue={120}
                    value={inputFlowratePerSecond}
                    onValueChange={setInputFlowratePerSecond}
                  />
                  <FieldNumber
                    suffix="/s"
                    label="Output belt capacity"
                    minValue={6}
                    maxValue={120}
                    value={outputFlowratePerSecond}
                    onValueChange={setOutputFlowratePerSecond}
                  />
                </Stack>
                <Divider flexItem>
                  <Tooltip
                    placement="top"
                    title={<Typography>Power usage</Typography>}
                  >
                    <PowerRounded />
                  </Tooltip>
                </Divider>
                <Stack spacing={2}>
                  <AutocompleteSorter
                    sorter={sorter}
                    onSorterChange={setSorter}
                  />
                  <AutocompleteProliferator
                    disableExtraProducts={recipe.speedup_only}
                    proliferator={proliferator}
                    onProliferatorChange={setProliferator}
                  />
                </Stack>
                <Divider flexItem>
                  <Tooltip
                    placement="top"
                    title={<Typography>Preferences</Typography>}
                  >
                    <DisplaySettingsRounded />
                  </Tooltip>
                </Divider>
                <FormFlags flags={flags} onFlagChange={setFlags} />
              </Stack>
            </Paper>
          }
          slotMainTop={
            <Paper
              sx={{
                padding: 2,
              }}
            >
              <FormObjectives
                products={recipe.products}
                objectives={objectives}
                onObjectiveChange={handleObjectiveChange}
              />
            </Paper>
          }
          slotMainBottom={
            <Paper
              sx={{
                padding: 2,
              }}
            >
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
            </Paper>
          }
        />
      </Container>
    </ThemeProvider>
  );
};
