import { FC, HTMLAttributes, ReactNode } from "react";
import {
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Recipe } from "../../assets";

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
  option: Recipe;
};
export const AutocompleteOption: FC<AutocompleteOptionProps> = (
  props,
) => {
  const { LIprops, option } = props;

  const { label, cycle_time, material, product, speedup_only } =
    option;

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
                    label={label}
                    value={value.toString()}
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
                    label={label}
                    value={value.toString()}
                  />
                );
              })}
            </OptionList>
            <OptionList>
              {!speedup_only && (
                <OptionListItem label="Extra Products" value="ok" />
              )}
              <OptionListItem label="Production Speedup" value="ok" />
            </OptionList>
          </OptionList>
        }
      >
        <Typography>{label}</Typography>
      </Tooltip>
    </MenuItem>
  );
};
