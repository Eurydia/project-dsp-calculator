import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItemText,
  Grid,
  alpha,
  ListItem,
  MenuList,
  ListItemIcon,
} from "@mui/material";

import { Recipe } from "../../assets";
import {
  AccessTimeRounded,
  AddRounded,
  CheckRounded,
  CloseRounded,
  RemoveRounded,
} from "@mui/icons-material";

type OptionListItemProps = {
  slotIcon?: ReactNode;
  slotLabel: ReactNode;
  slotValue: ReactNode;
};
const OptionListItem: FC<OptionListItemProps> = (props) => {
  const { slotIcon, slotLabel, slotValue } = props;
  return (
    <ListItem dense>
      <ListItemIcon sx={{ display: slotIcon ? undefined : "none" }}>
        {slotIcon}
      </ListItemIcon>
      <ListItemText>
        <Grid container spacing={4} columns={4} alignItems="end">
          <Grid item xs>
            <Typography>{slotLabel}</Typography>
          </Grid>
          <Grid item xs={1}>
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
  LIProps: HTMLAttributes<HTMLLIElement>;
  option: Recipe;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIProps: LIprops, option } = props;

  const { label, cycle_time, materials, products, speedup_only } =
    option;

  return (
    <MenuItem {...LIprops}>
      {/* <Tooltip
        followCursor
        placement="right-start"
        title={
          <OptionList>
            <OptionListItem
              slotLabel="Cycle Time (s)"
              slotValue={cycle_time}
            />
            <OptionList>
              {Object.entries(materials).map((entry) => {
                const [label, value] = entry;
                return (
                  <OptionListItem
                    key={label}
                    slotIcon={<RemoveRounded />}
                    slotLabel={label}
                    slotValue={value}
                  />
                );
              })}
            </OptionList>
            <OptionList>
              {Object.entries(products).map((entry) => {
                const [label, value] = entry;
                return (
                  <OptionListItem
                    key={label}
                    slotIcon={<AddRounded />}
                    slotLabel={label}
                    slotValue={value}
                  />
                );
              })}
            </OptionList>
            <OptionList>
              <ListItem
                sx={{
                  display: speedup_only ? "none" : undefined,
                }}
              >
                <ListItemText>
                  <Typography>Extra Products</Typography>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Typography>Production Speedup</Typography>
                </ListItemText>
              </ListItem>
            </OptionList>
          </OptionList>
        }
      > */}
      <Typography>{label}</Typography>
      {/* </Tooltip> */}
    </MenuItem>
  );
};
