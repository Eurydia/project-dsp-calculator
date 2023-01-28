import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItemText,
  ListSubheader,
  Grid,
  alpha,
  Box,
} from "@mui/material";
import { Recipe } from "../../assets";

type OptionListItemProps = {
  inset?: boolean;
  label: ReactNode;
  value: ReactNode;
};
const OptionListItem: FC<OptionListItemProps> = (props) => {
  const { inset, label, value } = props;

  return (
    <MenuItem dense>
      <ListItemText>
        <Box>
          <Grid container spacing={3} columns={2}>
            <Grid item xs={1}>
              <Typography paddingLeft={inset ? 2 : 0}>
                {label}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontWeight="bold" textAlign="right">
                {value}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </ListItemText>
    </MenuItem>
  );
};

type OptionListProps = {
  children: ReactNode;
  subheader?: ReactNode;
};
const OptionList: FC<OptionListProps> = (props) => {
  const { subheader, children } = props;
  return (
    <List
      dense
      disablePadding
      subheader={
        subheader ? (
          <ListSubheader sx={{ backgroundColor: "inherit" }}>
            <Typography sx={{ color: alpha("#ffffff", 0.6) }}>
              {subheader}
            </Typography>
          </ListSubheader>
        ) : null
      }
    >
      {children}
    </List>
  );
};

type AutocompleteOptionProps = {
  LIprops: HTMLAttributes<HTMLLIElement>;
  option: Recipe;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIprops, option } = props;

  const { label, cycle_time, materials, products, speedup_only } =
    option;

  return (
    <MenuItem {...LIprops}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <OptionList>
            <OptionListItem
              label="Cycle Time (s)"
              value={cycle_time}
            />
            <OptionList
              subheader={
                Object.keys(materials).length > 1
                  ? "Materials"
                  : "Material"
              }
            >
              {Object.entries(materials).map((entry) => {
                const [label, value] = entry;
                return (
                  <OptionListItem
                    key={label}
                    inset
                    label={label}
                    value={value}
                  />
                );
              })}
            </OptionList>
            <OptionList
              subheader={
                Object.keys(products).length > 1
                  ? "Products"
                  : "Product"
              }
            >
              {Object.entries(products).map((entry) => {
                const [label, value] = entry;
                return (
                  <OptionListItem
                    key={label}
                    inset
                    label={label}
                    value={value}
                  />
                );
              })}
            </OptionList>
            <OptionList
              subheader={speedup_only ? "Bonus" : "Bonuses"}
            >
              {!speedup_only && (
                <OptionListItem
                  inset
                  label="Extra Products"
                  value="OK"
                />
              )}
              <OptionListItem
                inset
                label="Production Speedup"
                value="OK"
              />
            </OptionList>
          </OptionList>
        }
      >
        <Typography>{label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
