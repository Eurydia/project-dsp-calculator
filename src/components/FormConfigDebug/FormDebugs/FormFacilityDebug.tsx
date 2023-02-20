import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Facility } from "../../../assets";
import { FieldNumber } from "../../FieldNumber";

type FormFacilityDebugProps = {
  facility: Facility;
  onFacilityChange: (
    next_facility: (prev_facility: Facility) => Facility,
  ) => void;
};
export const FormFacilityDebug: FC<FormFacilityDebugProps> = (
  props,
) => {
  const { facility, onFacilityChange } = props;

  const {
    speed_multiplier,
    work_consumption_MW,
    idle_consumption_MW,
  } = facility;

  const handleSpeedMultiplierChange = (next_value: number) => {
    onFacilityChange((prev) => {
      const next = { ...prev, speed_multiplier: next_value };
      return next;
    });
  };

  const handleWorkConsumptionChange = (next_value: number) => {
    onFacilityChange((prev) => {
      const next = { ...prev, work_consumption_MW: next_value };
      return next;
    });
  };

  const handleIdleConsumptionChange = (next_value: number) => {
    onFacilityChange((prev) => {
      const next = { ...prev, idle_consumption_MW: next_value };
      return next;
    });
  };

  return (
    <Box>
      <Stack spacing={1}>
        <FieldNumber
          float
          label="Speed multiplier"
          minValue={0}
          maxValue={Number.MAX_SAFE_INTEGER - 1}
          suffix="x"
          value={speed_multiplier}
          onValueChange={handleSpeedMultiplierChange}
        />
        <FieldNumber
          float
          label="Work power consumption"
          minValue={0}
          maxValue={Number.MAX_SAFE_INTEGER - 1}
          suffix="MW"
          value={work_consumption_MW}
          onValueChange={handleWorkConsumptionChange}
        />
        <FieldNumber
          float
          label="Idle power consumption"
          minValue={0}
          maxValue={Number.MAX_SAFE_INTEGER - 1}
          suffix="MW"
          value={idle_consumption_MW}
          onValueChange={handleIdleConsumptionChange}
        />
      </Stack>
    </Box>
  );
};
