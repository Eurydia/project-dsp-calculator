import { FC, SyntheticEvent } from "react";
import {
  FormControlLabel,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { Help } from "@mui/icons-material";

interface CustomSwitchProps {
  tooltip?: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}
const CustomSwitch: FC<CustomSwitchProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element | Event>,
    checked: boolean,
  ) => {
    props.onChange(checked);
  };

  const showTooltip = Boolean(props.tooltip);

  return (
    <Stack direction="row" alignItems="center">
      <FormControlLabel
        label={props.label}
        checked={props.checked}
        onChange={handleChange}
        control={<Switch />}
      />
      {showTooltip && (
        <Tooltip
          placement="right-start"
          title={<Typography>{props.tooltip!}</Typography>}
        >
          <Help fontSize="small" />
        </Tooltip>
      )}
    </Stack>
  );
};

export default CustomSwitch;
