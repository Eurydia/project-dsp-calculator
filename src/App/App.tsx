import { useState } from "react";
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

import {
  FormObjectives,
  ViewSummary,
  FormConfig,
} from "../components";
import { Configuration } from "../types";

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

  const facilitiesPerArray = computeFacilitiesPerArray(config);
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
            <Card>
              <CardHeader
                title="1. Config"
                titleTypographyProps={{
                  fontWeight: "bold",
                  fontSize: "x-large",
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
                  fontSize: "x-large",
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
                  fontSize: "x-large",
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
    </ThemeProvider>
  );
};
