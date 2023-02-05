import { FC } from "react";
import { List, ListSubheader } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryMaterialProps = {
  facilityCount: number;
  billMaterial: { [K: string]: number };
};
export const SummaryMaterial: FC<SummaryMaterialProps> = (props) => {
  const { facilityCount, billMaterial } = props;

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
        const v = value * facilityCount;
        return (
          <SummaryItem
            key={label}
            inset
            slotLabel={label}
            slotValue={v.toLocaleString("en-US")}
          />
        );
      })}
    </List>
  );
};
