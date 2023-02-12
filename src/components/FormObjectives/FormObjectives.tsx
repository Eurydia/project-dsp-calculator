import { FC } from "react";
import {
  Box,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { FlagOutlined, FlagRounded } from "@mui/icons-material";

import { FieldNumber } from "../FieldNumber";

type FormItemProps = {
  isPrimaryObjective: boolean;
  label: string;
  value: number;
  onValueChange: (next_value: number) => void;
};
const FormItem: FC<FormItemProps> = (props) => {
  const { isPrimaryObjective, label, value, onValueChange } = props;
  return (
    <Box>
      <Grid
        container
        alignItems="center"
        spacing={1}
        columns={{ xs: 5, md: 10 }}
      >
        <Grid item xs={5}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={1} display="flex" justifyContent="center">
          {isPrimaryObjective ? (
            <Tooltip
              placement="top"
              title={<Typography>Main objective</Typography>}
            >
              <FlagRounded color="primary" />
            </Tooltip>
          ) : (
            <FlagOutlined color="disabled" />
          )}
        </Grid>
        <Grid item xs={4}>
          <FieldNumber
            small
            label=""
            suffix="/min"
            minValue={0}
            maxValue={Number.MAX_SAFE_INTEGER - 1}
            value={value}
            onValueChange={onValueChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

type FormObjectivesProps = {
  products: { [K: string]: number };
  objectives: { [K: string]: number };
  onObjectiveChange: (label: string, next_value: number) => void;
};
export const FormObjectives: FC<FormObjectivesProps> = (props) => {
  const { products, objectives, onObjectiveChange } = props;

  const { palette } = useTheme();

  let goal_value = 0;
  let goal_label = "";

  for (const label of Object.keys(products)) {
    const ratio = objectives[label] / products[label];
    if (ratio >= goal_value) {
      goal_label = label;
      goal_value = ratio;
    }
  }

  return (
    <Box>
      <Typography
        fontWeight="bold"
        fontSize="x-large"
        color={palette.text.secondary}
      >
        {Object.values(objectives).length > 1
          ? "2. Objectives"
          : "2. Objective"}
      </Typography>
      <Stack spacing={3}>
        {Object.entries(objectives).map((entry) => {
          const [label, value] = entry;
          return (
            <FormItem
              key={label}
              isPrimaryObjective={label === goal_label}
              label={label}
              value={value}
              onValueChange={(next_value) => {
                onObjectiveChange(label, next_value);
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
