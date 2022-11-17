import { FC, Fragment, HTMLAttributes, ReactNode } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Typography,
  FilterOptionsState,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { Hexagon } from "@mui/icons-material";
import { blue, grey, orange } from "@mui/material/colors";
import { matchSorter } from "match-sorter";
import { Recipe, BOM } from "../types";
import { RecipeType } from "../enums";
import { capitalizeAll } from "../utils";

interface TypographyWithIconProps {
  text: string;
  icon: ReactNode;
}
const TypographyWithIcon: FC<TypographyWithIconProps> = (props) => {
  return (
    <Stack direction="row">
      {props.icon}
      <Typography>{props.text}</Typography>
    </Stack>
  );
};

interface TooltipDetailProps {
  label: string;
  value: string;
}
const TooltipDetail: FC<TooltipDetailProps> = (props) => {
  return (
    <Grid container columns={4} alignItems="start">
      <Grid item xs={1}>
        <Typography>{props.value}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{props.label}</Typography>
      </Grid>
    </Grid>
  );
};

const toTypography = (bom: BOM) => {
  const res: JSX.Element[] = [];

  for (const key of Object.keys(bom)) {
    res.push(
      <TooltipDetail
        key={key}
        label={capitalizeAll(key)}
        value={`${bom[key]}x`}
      />,
    );
  }
  return res;
};

interface TooltipListDetailProps {
  title: string;
  items: ReactNode[] | ReactNode;
}
const TooltipListDetail: FC<TooltipListDetailProps> = (props) => {
  return (
    <Box>
      <Typography>{props.title}</Typography>
      <Box paddingLeft={2}>{props.items}</Box>
    </Box>
  );
};

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Recipe,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <MenuItem {...props}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <Stack
            padding={1}
            spacing={1}
            divider={
              <Divider flexItem sx={{ backgroundColor: grey[300] }} />
            }
          >
            <TooltipListDetail
              title="Cycle Time"
              items={
                <Typography>{`${option.cycle_time}s`}</Typography>
              }
            />
            <TooltipListDetail
              title="Materials"
              items={toTypography(option.material)}
            />
            <TooltipListDetail
              title="Products"
              items={toTypography(option.product)}
            />
            <TooltipListDetail
              title="Bonuses"
              items={
                <Fragment>
                  {!option.speedup_only && (
                    <TypographyWithIcon
                      icon={<Hexagon sx={{ color: blue["400"] }} />}
                      text="Extra Products"
                    />
                  )}
                  <TypographyWithIcon
                    icon={<Hexagon sx={{ color: orange["400"] }} />}
                    text="Production Speedup"
                  />
                </Fragment>
              }
            />
          </Stack>
        }
      >
        <Typography>{capitalizeAll(option.label)}</Typography>
      </Tooltip>
    </MenuItem>
  );
};

export const filterOptions = (
  options: Recipe[],
  state: FilterOptionsState<Recipe>,
  recipe_type: RecipeType,
): Recipe[] => {
  const value = state.inputValue;

  const filtered_options = matchSorter(options, recipe_type, {
    keys: [(item) => item.recipe_type],
  });

  return matchSorter(filtered_options, value, {
    keys: [(item) => item.label],
  });
};
