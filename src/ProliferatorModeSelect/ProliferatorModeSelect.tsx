import { Check } from "@mui/icons-material";
import {
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { lightBlue, orange } from "@mui/material/colors";
import React, { FC } from "react";

const color_theme = createTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  },
});

interface ProliferatorModeSelectProps {
  speedup_only: boolean;
  value: number;
  onChange: (value: number) => void;
}

const ProliferatorModeSelect: FC<ProliferatorModeSelectProps> = (
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

    if (props.speedup_only) {
      props.onChange(1);
    } else {
      props.onChange(value);
    }
  };

  return (
    <ThemeProvider theme={color_theme}>
      <FormControl fullWidth>
        <FormLabel>proliferator bonus</FormLabel>
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          color={props.value === 0 ? "primary" : "secondary"}
          value={props.value}
          onChange={handleChange}
        >
          {["extra products", "production speedup"].map(
            (label, index) => (
              <ToggleButton
                key={`prolif-mode-${index}`}
                disabled={index === 0 && props.speedup_only}
                value={index}
              >
                <Stack direction="row" alignItems="center">
                  <Typography
                    fontWeight={theme.typography.fontWeightMedium}
                  >
                    {label}
                  </Typography>
                  {index === props.value && <Check />}
                </Stack>
              </ToggleButton>
            ),
          )}
        </ToggleButtonGroup>
      </FormControl>
    </ThemeProvider>
  );
};

export default ProliferatorModeSelect;
