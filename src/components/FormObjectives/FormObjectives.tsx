import { FC } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FieldNumber } from "../FieldNumber";

type FormObjectivesProps = {
  objectives: { [K: string]: number };
  onObjectiveChange: (label: string, next_value: number) => void;
};
export const FormObjectives: FC<FormObjectivesProps> = (props) => {
  const { objectives, onObjectiveChange } = props;

  return (
    <Box>
      <Stack spacing={2}>
        {Object.entries(objectives).map((entry) => {
          const [label, value] = entry;
          return (
            <Box key={label}>
              <Grid
                container
                spacing={2}
                columns={2}
                alignItems="center"
              >
                <Grid item xs={1}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={1}>
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
