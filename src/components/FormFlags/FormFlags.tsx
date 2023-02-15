import { FC, ReactNode } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { QuestionMarkRounded } from "@mui/icons-material";

import { Flags } from "../../types";

type FlagItemProps = {
  slotAction: ReactNode;
  label: string;
  explanation: string;
};
const FlagItem: FC<FlagItemProps> = (props) => {
  const { slotAction, label, explanation } = props;
  return (
    <ListItem disablePadding alignItems="center">
      <ListItemIcon>{slotAction}</ListItemIcon>
      <ListItemText primary={label} />
      <ListItemSecondaryAction>
        <Tooltip
          followCursor
          placement="top"
          title={<Typography>{explanation}</Typography>}
        >
          <QuestionMarkRounded />
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

type FormFlagsProps = {
  flags: Flags;
  onFlagChange: (next_flags: (prev_flag: Flags) => Flags) => void;
};
export const FormFlags: FC<FormFlagsProps> = (props) => {
  const { flags, onFlagChange } = props;

  return (
    <List disablePadding>
      <FlagItem
        label="Prefer even array"
        explanation="Affects the number of facilities in an array."
        slotAction={
          <Switch
            disableRipple
            checked={flags["preferEven"]}
            onClick={() => {
              onFlagChange((prev) => {
                const next = { ...prev };
                next["preferEven"] = !prev["preferEven"];
                return next;
              });
            }}
          />
        }
      />
      <FlagItem
        label="Keep output belts under max load"
        explanation="Affects the number of facilities in an array."
        slotAction={
          <Switch
            disableRipple
            checked={flags["keepBeltUnderMaxFlow"]}
            onClick={() => {
              onFlagChange((prev) => {
                const next = { ...prev };
                next["keepBeltUnderMaxFlow"] =
                  !prev["keepBeltUnderMaxFlow"];
                return next;
              });
            }}
          />
        }
      />
    </List>
  );
};
