import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { FlagContext } from "../../contexts";
import { Flags } from "../../types";

type FlagItemProps = {
  info: string;
  label: string;
  flag: keyof Flags;
};
export const FlagItem: FC<FlagItemProps> = (props) => {
  const { info, label, flag } = props;

  const { flags, setFlags } = useContext(FlagContext);

  const handleFlagChange = (flag: keyof Flags) => {
    setFlags((prev) => {
      const next = { ...prev };
      next[flag] = !prev[flag];
      return next;
    });
  };

  return (
    <ListItem>
      <ListItemText>
        <Tooltip
          placement="top"
          followCursor
          title={<Typography paragraph>{info}</Typography>}
        >
          <Typography>{label}</Typography>
        </Tooltip>
      </ListItemText>
      <ListItemSecondaryAction>
        <Switch
          checked={flags[flag]}
          onClick={() => {
            handleFlagChange(flag);
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
