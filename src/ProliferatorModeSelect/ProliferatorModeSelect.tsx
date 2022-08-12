import { ChangeEvent, FC } from "react";
import {
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { lightBlue, orange } from "@mui/material/colors";

const color_theme = createTheme({
  palette: { primary: lightBlue, secondary: orange },
});

interface ProliferatorModeSelectProps {
  speedup_only: boolean;
  value: number;
  onChange: (value: number) => void;
}

const ProliferatorModeSelect: FC<ProliferatorModeSelectProps> = (
  props,
) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (props.speedup_only) {
      props.onChange(1);
    } else {
      props.onChange(parseInt(value));
    }
  };

  return (
    <FormControl size="small">
      <FormLabel>proliferator bonus</FormLabel>
      <ThemeProvider theme={color_theme}>
        <RadioGroup value={props.value} onChange={handleChange}>
          {["extra products", "production speedup"].map(
            (label, index) => (
              <FormControlLabel
                disabled={props.speedup_only && index === 0}
                key={label}
                label={
                  <Typography
                    fontWeight="bold"
                    color={index === 0 ? "primary" : "secondary"}
                    sx={{
                      textShadow: "0 0 10px",
                    }}
                  >
                    {label}
                  </Typography>
                }
                value={index}
                control={
                  <Radio
                    color={index === 0 ? "primary" : "secondary"}
                  />
                }
              />
            ),
          )}
        </RadioGroup>
      </ThemeProvider>
    </FormControl>
  );
};

export default ProliferatorModeSelect;
