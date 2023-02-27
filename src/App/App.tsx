import { useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Card,
  CardHeader,
  CardContent,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";

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
import { SettingsRounded } from "@mui/icons-material";

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
      Object.keys(next_config.recipe_product_ratios).forEach(
        (key) => {
          next[key] = prev[key] || 0;
        },
      );
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
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "end",
          }}
        >
          <Tooltip
            title={<Typography>Settings</Typography>}
            placement="top"
          >
            <IconButton
              size="large"
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <SettingsRounded color="inherit" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <AppLayout
          slotSideTop={
            <Card>
              <CardHeader
                title="1. Config"
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
                title={
                  Object.values(objectives).length > 1
                    ? "2. Objectives"
                    : "2. Objective"
                }
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
              <CardHeader
                title="3. Results"
                titleTypographyProps={{
                  fontWeight: "bold",
                }}
              />
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
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Grid container columns={10}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <FormPreferences
                preferences={preferences}
                onPrefernceChange={setPreferences}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};
