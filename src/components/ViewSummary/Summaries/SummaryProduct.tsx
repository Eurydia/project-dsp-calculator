import { FC } from "react";
import { List, ListSubheader } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryProductProps = {
  billProduct: { [K: string]: number };
};
export const SummaryProduct: FC<SummaryProductProps> = (props) => {
  const { billProduct } = props;

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
