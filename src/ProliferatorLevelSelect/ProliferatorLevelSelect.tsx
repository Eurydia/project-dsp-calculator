import { Check } from "@mui/icons-material";
import {
  FormControl,
  FormLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";

interface ProliferatorLevelSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const ProliferatorLevelSelect: FC<ProliferatorLevelSelectProps> = (
  props,
) => {
  const theme = useTheme();
  const handleChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: null | number,
  ) => {
    if (value === null) {
      return;
    }

    props.onChange(value!);
  };

  return (
    <FormControl fullWidth>
      <FormLabel>proliferator level</FormLabel>
      <ToggleButtonGroup
        exclusive
        fullWidth
        color="primary"
        value={props.value}
        onChange={handleChange}
      >
        {[0, 1, 2, 3].map((level) => (
          <ToggleButton key={`p-level-${level}`} value={level}>
            <Stack direction="row" alignItems="center">
              <Typography
                fontWeight={theme.typography.fontWeightMedium}
              >
                {level}
              </Typography>
              {level === props.value && <Check />}
            </Stack>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};

export default ProliferatorLevelSelect;
