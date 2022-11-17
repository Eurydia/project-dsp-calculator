import { FC, SyntheticEvent } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { Help } from "@mui/icons-material";
import { Flag } from "../types";

const flagLookup: {
  [key: string]: Flag;
} = {
  "0": {
    label: "Keep belt under max load.",
    tooltip:
      "Active: Actual flowrate should be strictly less than 100% of what is given.",
  },
  "1": {
    label: "Prefer even facilities.",
    tooltip: "Active: Subtract one from odd numbers of facilities.",
  },
  "2": {
    label: "Count sorters consumption.",
    tooltip: "Active: Count sorter when computing power consumption.",
  },
};

interface SwitchWithTooltipProps {
  tooltip: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const SwitchWithTooltip: FC<SwitchWithTooltipProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element | Event>,
    checked: boolean,
  ) => {
    props.onChange(checked);
  };

  return (
    <Stack direction="row" alignItems="center">
      <FormControlLabel
        label={props.label}
        checked={props.checked}
        onChange={handleChange}
        control={<Switch />}
      />
      <Tooltip
        placement="top"
        title={<Typography>{props.tooltip}</Typography>}
      >
        <Help color="primary" fontSize="small" />
      </Tooltip>
    </Stack>
  );
};

interface GroupFlagsProps {
  flags: { [key: string]: boolean };
  onChange: (key: string, value: boolean) => void;
}
const GroupFlags: FC<GroupFlagsProps> = (props) => {
  return (
    <FormControl>
      <FormLabel>Flags</FormLabel>
      {Object.keys(props.flags).map((key) => (
        <SwitchWithTooltip
          key={key}
          label={flagLookup[key].label}
          tooltip={flagLookup[key].tooltip}
          checked={props.flags[key]}
          onChange={(value) => props.onChange(key, value)}
        />
      ))}
    </FormControl>
  );
};

export default GroupFlags;
