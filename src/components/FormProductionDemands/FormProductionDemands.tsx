import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
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
      <Stack spacing={2}>
        <Typography fontWeight="bold" fontSize="x-large">
          Production Targets
        </Typography>
        <Stack spacing={2}>
          {Object.entries(demands).map((entry) => {
            const [label, value] = entry;
            return (
              <FieldNumber
                key={label}
                label={label}
                suffix="/min"
                minValue={0}
                maxValue={Number.MAX_SAFE_INTEGER}
                value={value}
                onValueChange={(next_value) => {
                  onDemandChange(label, next_value);
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
