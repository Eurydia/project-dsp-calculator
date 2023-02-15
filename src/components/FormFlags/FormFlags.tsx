import {
  FC,
  Fragment,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";

import { Flags } from "../../types";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

type FlagItemProps = {
  slotAction: ReactNode;
  label: string;
  explanation: string;
};
const FlagItem: FC<FlagItemProps> = (props) => {
  const { slotAction, label, explanation } = props;

  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    setOpen((prev) => !prev);
  };

  return (
    <ListItem disablePadding alignItems="center">
      <ListItemIcon>{slotAction}</ListItemIcon>
      <ListItemText>
        <Typography>{label}</Typography>
        <Collapse in={open} unmountOnExit>
          <Typography color={palette.text.secondary}>
            {explanation}
          </Typography>
        </Collapse>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={handleClick}>
          {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </IconButton>
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
