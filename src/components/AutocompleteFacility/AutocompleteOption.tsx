import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { Facility } from "../../assets";

type OptionListItemProps = {
  label: string;
  value: string;
};
const OptionListItem: FC<OptionListItemProps> = (props) => {
  const { label, value } = props;

  return (
    <ListItem>
      <ListItemText>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <Typography>{label}</Typography>
          <Typography fontWeight="bold">{value}</Typography>
        </Stack>
      </ListItemText>
    </ListItem>
  );
};

type OptionListProps = {
  children: ReactNode;
};
const OptionList: FC<OptionListProps> = (props) => {
  const { children } = props;

  return (
    <List dense disablePadding>
      {children}
    </List>
  );
};

type AutocompleteOptionProps = {
  LIprops: HTMLAttributes<HTMLLIElement>;
  option: Facility;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIprops, option } = props;

  const {
    label,
    speedup_multiplier,
    work_consumption,
    idle_consumption,
  } = option;

  return (
    <MenuItem {...LIprops}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <OptionList>
            <OptionListItem
              label="Production Speed"
              value={`${speedup_multiplier}x`}
            />
            <OptionListItem
              label="Work Consumption"
              value={`${work_consumption} MW`}
            />
            <OptionListItem
              label="Idle Consumption"
              value={`${idle_consumption} MW`}
            />
          </OptionList>
        }
      >
        <Typography>{label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
