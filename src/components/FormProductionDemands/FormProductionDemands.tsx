import { FC } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FieldNumber } from "../FieldNumber";

type FormProductionDemandsProps = {
  demands: { [K: string]: number };
  onDemandChange: (label: string, next_value: number) => void;
};
export const FormProductionDemands: FC<FormProductionDemandsProps> = (
  props,
) => {
  const { demands, onDemandChange } = props;

  return (
    <Box>
      <Grid container spacing={2} columns={1}>
        {Object.entries(demands).map((entry) => {
          const [label, value] = entry;
          return (
            <Grid key={label} item xs={1}>
              <FieldNumber
                label={label}
                suffix="/min"
                minValue={0}
                maxValue={Number.MAX_SAFE_INTEGER}
                value={value}
                onValueChange={(next_value) => {
                  onDemandChange(label, next_value);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
