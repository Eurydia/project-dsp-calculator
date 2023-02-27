import {
  FC,
  Fragment,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";
import {
  Collapse,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  HelpCenterRounded,
} from "@mui/icons-material";

import { Preferences } from "../../types";

type PreferenceItemProps = {
  slotAction: ReactNode;
  label: string;
  explanation: string;
};
const PreferenceItem: FC<PreferenceItemProps> = (props) => {
  const { slotAction, label, explanation } = props;

  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    setOpen((prev) => {
      return !prev;
    });
  };
  // Do something about this component.
  // There has to be a better way to state the motivation
  // of the preference.
  return (
    <ListItem disableGutters alignItems="center">
      <ListItemIcon>{slotAction}</ListItemIcon>
      <ListItemText secondary={explanation}>
        <Typography>{label}</Typography>
      </ListItemText>
      {/* <ListItemSecondaryAction>
        <IconButton onClick={handleClick}>
          <HelpCenterRounded color="primary" />
        </IconButton>
      </ListItemSecondaryAction> */}
    </ListItem>
  );
};

type FormPreferencesProps = {
  preferences: Preferences;
  onPrefernceChange: (
    next_prefrences: (prev_preferences: Preferences) => Preferences,
  ) => void;
};
export const FormPreferences: FC<FormPreferencesProps> = (props) => {
  const { preferences, onPrefernceChange } = props;

  return (
    <List disablePadding>
      <PreferenceItem
        label="Prefer even array"
        explanation="Subtract one if the number of facilities in an array is odd."
        slotAction={
          <Switch
            disableRipple
            checked={preferences["preferEven"]}
            onClick={() => {
              onPrefernceChange((prev) => {
                const next = { ...prev };
                next["preferEven"] = !prev["preferEven"];
                return next;
              });
            }}
          />
        }
      />
      <PreferenceItem
        label="Keep output belts under max load"
        explanation="Subtract one to keep output belt under its maximal capacity."
        slotAction={
          <Switch
            disableRipple
            checked={preferences["keepBeltUnderMaxFlow"]}
            onClick={() => {
              onPrefernceChange((prev) => {
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
