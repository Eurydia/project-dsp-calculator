import { FC, ReactNode, useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Typography,
  Paper,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import {
  DisplaySettingsRounded,
  FactoryRounded,
  LocalShippingRounded,
  PowerRounded,
} from "@mui/icons-material";

import {
  SelectFacility,
  SelectProliferator,
  SelectRecipe,
  SelectSorter,
  FieldNumber,
  FormPreferences,
  FormObjectives,
  useFacility,
  useNumber,
  useProliferator,
  useRecipe,
  useSorter,
  usePreferences,
  ViewSummary,
  FormCustomRecipe,
  FormConfiguration,
} from "../components";
import { Configuration, Preferences } from "../types";
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
  computeIdlePowerPerFacility,
  computeWorkPowerPerFacility,
} from "./helper";

type IconDividerProps = {
  icon: ReactNode;
  label: string;
};
const IconDivider: FC<IconDividerProps> = (props) => {
  const { icon, label } = props;

  const { palette } = useTheme();

  return (
    <Divider flexItem>
      <Stack spacing={0.5} direction="column" alignItems="center">
        {icon}
        <Typography fontSize="small" color={palette.text.secondary}>
          {label}
        </Typography>
      </Stack>
    </Divider>
  );
};

export const App = () => {
  const { preferences, setPreferences } = usePreferences(
    "preferences",
    Preferences.create(),
  );

  const [config, setConfig] = useState<Configuration>(
    Configuration.create(),
  );

  const [debugConfig, setDebugConfig] = useState<Configuration>(
    Configuration.create(),
  );

  const [objectives, setObjectives] = useState<
    Record<string, number>
  >({});

  // useEffect(() => {
  //   setObjectives(() => {
  //     const bill: { [K: string]: number } = {};
  //     Object.keys(recipe.products).forEach((key) => {
  //       bill[key] = 0;
  //     });
  //     return bill;
  //   });
  // }, []);

  const handleConfigChange = (next_config: Configuration) => {
    setConfig(next_config);
    setObjectives((prev) => {
      const next: Record<string, number> = {};
      Object.keys(next_config.recipe_product_ratios).forEach(
        (key) => {
          next[key] = prev[key] || 0;
        },
      );
      return next;
    });
  };

  const handleDebugConfigChange = (next_config: Configuration) => {
    setDebugConfig(next_config);
    setObjectives((prev) => {
      const next: Record<string, number> = {};
      Object.keys(next_config.recipe_product_ratios).forEach(
        (key) => {
          next[key] = prev[key] || 0;
        },
      );
      return next;
    });
  };

  const handleObjectiveChange = (key: string, next_value: number) => {
    setObjectives((prev) => {
      const next = { ...prev };
      next[key] = next_value;
      return next;
    });
  };

  const facilitiesPerArray = computeFacilitiesPerArray(
    config,
    preferences,
  );
  const facilitiesNeeded = computeFacilitiesNeeded(
    objectives,
    config,
  );

  const powerIdlePerFacility = computeIdlePowerPerFacility(config);
  const powerWorkPerFacility = computeWorkPowerPerFacility(config);

  const billMaterialsPerFacility =
    computeBillMaterialsPerFacility(config);
  const billProductsPerFacility =
    computeBillProductsPerFacility(config);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppLayout
          slotSideTop={
            <Paper sx={{ padding: 4 }}>
              <Stack spacing={3}>
                <Typography fontWeight="bold" fontSize="x-large">
                  {preferences.debugMode
                    ? "1. Config (Debug)"
                    : "1. Config"}
                </Typography>
                <FormConfiguration
                  onConfigurationChange={handleConfigChange}
                />
              </Stack>
            </Paper>
          }
          slotSideButton={
            <Paper sx={{ padding: 4 }}>
              <Stack spacing={3}>
                <Typography fontWeight="bold" fontSize="x-large">
                  Preferences
                </Typography>
                <FormPreferences
                  preferences={preferences}
                  onPrefernceChange={setPreferences}
                />
              </Stack>
            </Paper>
          }
          slotMainTop={
            <Paper
              sx={{
                padding: 4,
              }}
            >
              <Stack spacing={3}>
                <Typography fontWeight="bold" fontSize="x-large">
                  {Object.values(objectives).length > 1
                    ? "2. Objectives"
                    : "2. Objective"}
                </Typography>
                <FormObjectives
                  product_ratios={
                    preferences.debugMode
                      ? debugConfig.recipe_product_ratios
                      : config.recipe_product_ratios
                  }
                  objectives={objectives}
                  onObjectiveChange={handleObjectiveChange}
                />
              </Stack>
            </Paper>
          }
          slotMainBottom={
            <Paper
              sx={{
                padding: 4,
              }}
            >
              <Stack spacing={3}>
                <Typography fontWeight="bold" fontSize="x-large">
                  3. Results
                </Typography>
                <ViewSummary
                  facilitiesNeeded={facilitiesNeeded}
                  facilitiesPerArray={facilitiesPerArray}
                  powerIdlePerFacility={powerIdlePerFacility}
                  powerWorkPerFacility={powerWorkPerFacility}
                  billMaterialPerFacility={billMaterialsPerFacility}
                  billProductPerFacility={billProductsPerFacility}
                />
              </Stack>
            </Paper>
          }
        />
      </Container>
    </ThemeProvider>
  );
};
