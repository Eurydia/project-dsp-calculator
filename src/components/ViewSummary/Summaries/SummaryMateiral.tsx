import { FC } from "react";
import { List, ListSubheader } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryMaterialProps = {
  billMaterial: { [K: string]: number };
};
export const SummaryMaterial: FC<SummaryMaterialProps> = (props) => {
  const { billMaterial } = props;

  return (
    <List
      dense
      disablePadding
      subheader={
        <ListSubheader>
          {Object.values(billMaterial).length >= 1
            ? "Materials needed (per minute)"
            : "Material needed (per minute)"}
        </ListSubheader>
      }
    >
      {Object.entries(billMaterial).map((entry) => {
        const [label, value] = entry;
        return (
          <SummaryItem
            key={label}
            inset
            slotLabel={label}
            slotValue={value.toLocaleString("en-US")}
          />
        );
      })}
    </List>
  );
};
