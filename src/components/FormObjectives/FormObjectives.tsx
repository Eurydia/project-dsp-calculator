import { FC } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FieldNumber } from "../FieldNumber";
import { FlagRounded } from "@mui/icons-material";

type FormObjectivesProps = {
  products: { [K: string]: number };
  objectives: { [K: string]: number };
  onObjectiveChange: (label: string, next_value: number) => void;
};
export const FormObjectives: FC<FormObjectivesProps> = (props) => {
  const { products, objectives, onObjectiveChange } = props;

  let main_goal_value = 0;
  let main_goal_label = "";

  for (const label of Object.keys(products)) {
    const ratio = objectives[label] / products[label];
    if (ratio >= main_goal_value) {
      main_goal_label = label;
      main_goal_value = ratio;
    }
  }

  return (
    <Box>
      <Stack spacing={2}>
        {Object.entries(objectives).map((entry) => {
          const [label, value] = entry;
          return (
            <Box key={label} paddingLeft={1}>
              <Grid
                container
                spacing={2}
                columns={10}
                alignItems="center"
              >
                <Grid item xs={1}>
                  <FlagRounded
                    sx={{
                      display:
                        label === main_goal_label ? "block" : "none",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <FieldNumber
                    label=""
                    suffix="/min"
                    minValue={0}
                    maxValue={Number.MAX_SAFE_INTEGER}
                    value={value}
                    onValueChange={(next_value) => {
                      onObjectiveChange(label, next_value);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
