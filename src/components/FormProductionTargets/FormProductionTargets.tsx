import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { FieldNumber } from "../FieldNumber";

type FormProductionTargetsProps = {
  targets: { [K: string]: number };
  onTargetChange: (label: string, next_value: number) => void;
};

export const FormProductionTargets: FC<FormProductionTargetsProps> = (
  props,
) => {
  const { targets, onTargetChange } = props;

  return (
    <Box>
      <Stack spacing={2}>
        <Typography fontWeight="bold" fontSize="x-large">
          Production Targets
        </Typography>
        <Stack spacing={2}>
          {Object.entries(targets).map((entry) => {
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
                  onTargetChange(label, next_value);
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
