import { FC } from "react";
import { List, ListSubheader } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryProductProps = {
  facilityCount: number;
  billProduct: { [K: string]: number };
};
export const SummaryProduct: FC<SummaryProductProps> = (props) => {
  const { facilityCount, billProduct } = props;

  return (
    <List
      dense
      disablePadding
      subheader={
        <ListSubheader>Production (per minute)</ListSubheader>
      }
    >
      {Object.entries(billProduct).map((entry) => {
        const [label, value] = entry;
        const v = facilityCount * value;
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
