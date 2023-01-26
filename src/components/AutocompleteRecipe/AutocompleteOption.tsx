import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { Recipe } from "../../assets";

type OptionListItemProps = {
  label: string;
  value: string;
};
const OptionListItem: FC<OptionListItemProps> = (props) => {
  const { label, value } = props;

  return (
    <ListItem dense>
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

  return <List dense>{children}</List>;
};

type AutocompleteOptionProps = {
  LIprops: HTMLAttributes<HTMLLIElement>;
  option: Recipe;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIprops, option } = props;

  const {
    label,
    cycle_time,
    materials: material,
    products: product,
    speedup_only,
  } = option;

  return (
    <MenuItem {...LIprops}>
      <Tooltip
        followCursor
        placement="right-start"
        title={
          <OptionList>
            <OptionListItem
              label="Cycle Time"
              value={`${cycle_time}s`}
            />
            <OptionList>
              {Object.entries(material).map((entry) => {
                const [label, value] = entry;
                return (
                  <OptionListItem
                    key={label}
                    label={`- ${label}`}
                    value={`x${value}`}
                  />
                );
              })}
            </OptionList>
            <OptionList>
              {Object.entries(product).map((entry) => {
                const [label, value] = entry;
                return (
                  <OptionListItem
                    key={label}
                    label={`+ ${label}`}
                    value={`x${value}`}
                  />
                );
              })}
            </OptionList>
            <OptionList>
              {!speedup_only && (
                <OptionListItem label="Extra Products" value="" />
              )}
              <OptionListItem label="Production Speedup" value="" />
            </OptionList>
          </OptionList>
        }
      >
        <Typography>{label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
