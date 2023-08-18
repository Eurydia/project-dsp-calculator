import { useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Card,
  CardHeader,
  CardContent,
  Fab,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { SettingsRounded } from "@mui/icons-material";

import {
  FormObjectives,
  ViewSummary,
  FormConfig,
  FormPreferences,
  usePreferences,
} from "../components";
import { Configuration, Preferences } from "../types";

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

export const App = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { preferences, setPreferences } = usePreferences(
    "preferences",
    Preferences.create(),
  );

  const [config, setConfig] = useState<Configuration>(
    Configuration.create(),
  );

  const [objectives, setObjectives] = useState<
    Record<string, number>
  >({});

  const handleObjectiveChange = (key: string, next_value: number) => {
    setObjectives((prev) => {
      const next = { ...prev };
      next[key] = next_value;
      return next;
    });
  };

  const handleConfigChange = (next_config: Configuration) => {
    setConfig(next_config);
    setObjectives((prev) => {
      const next: Record<string, number> = {};

      for (const key of Object.keys(
        next_config.recipe_product_ratios,
      )) {
        next[key] = prev[key] || 0;
      }

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

  const billMaterialsPerFacility = computeBillMaterialsPerFacility(
    config,
    preferences,
  );

  const billProductsPerFacility =
    computeBillProductsPerFacility(config);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tooltip
        title={<Typography>Preference Settings</Typography>}
        placement="top"
      >
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <IconButton
            size="large"
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <SettingsRounded color="primary" />
          </IconButton>
        </Fab>
      </Tooltip>
      <Container maxWidth="lg">
        <AppLayout
          slotSideTop={
            <Card>
              <CardHeader
                title="Configurations"
                titleTypographyProps={{
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <FormConfig onConfigChange={handleConfigChange} />
              </CardContent>
            </Card>
          }
          slotMainTop={
            <Card>
              <CardHeader
                title="Production"
                titleTypographyProps={{
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <FormObjectives
                  product_ratios={config.recipe_product_ratios}
                  objectives={objectives}
                  onObjectiveChange={handleObjectiveChange}
                />
              </CardContent>
            </Card>
          }
          slotMainBottom={
            <Card>
              <CardContent>
                <ViewSummary
                  facilitiesNeeded={facilitiesNeeded}
                  facilitiesPerArray={facilitiesPerArray}
                  powerIdlePerFacility={powerIdlePerFacility}
                  powerWorkPerFacility={powerWorkPerFacility}
                  billMaterialPerFacility={billMaterialsPerFacility}
                  billProductPerFacility={billProductsPerFacility}
                />
              </CardContent>
            </Card>
          }
        />
      </Container>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <DialogTitle>Preference Settings</DialogTitle>
        <DialogContent>
          <FormPreferences
            preferences={preferences}
            onPrefernceChange={setPreferences}
          />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};
