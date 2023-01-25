import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Sorter } from "../../assets";

type OptionListItemProps = {
  label: string;
  value: string;
};
const OptionListItem: FC<OptionListItemProps> = (props) => {
  const { label, value } = props;

  return (
    <ListItem>
      <ListItemText>{label}</ListItemText>
      <ListItemText>{value}</ListItemText>
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
  option: Sorter;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIprops, option } = props;

  const { label, work_consumption, idle_consumption } = option;

  return (
    <MenuItem {...LIprops}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <OptionList>
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
