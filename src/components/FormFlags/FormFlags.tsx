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

import { Flags } from "../../types";
import { QuestionMarkRounded } from "@mui/icons-material";

type FlagExplanationProps = {
  explanation: ReactNode;
};
const FlagExplanation: FC<FlagExplanationProps> = (props) => {
  const { explanation } = props;

  return (
    <Tooltip
      placement="top"
      title={<Typography>{explanation}</Typography>}
    >
      <QuestionMarkRounded />
    </Tooltip>
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
      <ListItem disablePadding alignItems="center">
        <ListItemIcon>
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
        </ListItemIcon>
        <ListItemText
          primary="Prefer even array"
          primaryTypographyProps={{ fontWeight: "bold" }}
        />
        <ListItemSecondaryAction>
          <FlagExplanation explanation="Affects the number of facilities in an array." />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem disablePadding alignItems="center">
        <ListItemIcon>
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
        </ListItemIcon>
        <ListItemText
          primary="Keep output belts under max load"
          primaryTypographyProps={{ fontWeight: "bold" }}
        />
        <ListItemSecondaryAction>
          <FlagExplanation explanation="Affects the number of facilities in an array." />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
