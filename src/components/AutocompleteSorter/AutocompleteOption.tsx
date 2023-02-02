import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  alpha,
} from "@mui/material";
import { Sorter } from "../../assets";

type OptionListItemProps = {
  inset?: boolean;
  slotLabel: ReactNode;
  slotValue: ReactNode;
};
const OptionListItem: FC<OptionListItemProps> = (props) => {
  const { inset, slotLabel, slotValue } = props;

  return (
    <ListItem dense>
      <ListItemText>
        <Grid container spacing={4} columns={4} alignItems="end">
          <Grid item xs>
            <Typography paddingLeft={inset ? 2 : 0}>
              {slotLabel}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography fontWeight="bold" textAlign="right">
              {slotValue}
            </Typography>
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  );
};

type OptionListProps = {
  children: ReactNode;
  subheader?: ReactNode;
};
const OptionList: FC<OptionListProps> = (props) => {
  const { subheader, children } = props;
  return (
    <List dense disablePadding>
      <ListItem sx={{ display: subheader ? "block" : "none" }}>
        <ListItemText>
          <Typography color={alpha("#ffffff", 0.6)}>
            {subheader}
          </Typography>
        </ListItemText>
      </ListItem>
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
  const { LIprops: LIProps, option } = props;
  const { label, work_consumption, idle_consumption } = option;
  return (
    <MenuItem {...LIProps}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <OptionList subheader="Power Usage (MW)">
            <OptionListItem
              inset
              slotLabel="Work"
              slotValue={work_consumption}
            />
            <OptionListItem
              inset
              slotLabel="Idle"
              slotValue={idle_consumption}
            />
          </OptionList>
        }
      >
        <Typography>{label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
