import { FC } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";

import { Flags } from "../../types";

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
          secondary="Affects the number of facilities in an array."
          primaryTypographyProps={{ fontWeight: "bold" }}
        />
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
          secondary="Affects the number of facilities in an array."
          primaryTypographyProps={{ fontWeight: "bold" }}
        />
      </ListItem>
    </List>
  );
};
