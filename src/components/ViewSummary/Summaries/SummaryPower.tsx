import { FC } from "react";
import { List, ListSubheader } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryPowerProps = {
  consumptionWork: number;
  consumptionIdle: number;
};
export const SummaryPower: FC<SummaryPowerProps> = (props) => {
  const { consumptionIdle, consumptionWork } = props;

  return (
    <List
      dense
      disablePadding
      subheader={
        <ListSubheader>Power consumption (MW)</ListSubheader>
      }
    >
      <SummaryItem
        inset
        slotLabel="Work"
        slotValue={consumptionWork.toLocaleString("en-US")}
      />
      <SummaryItem
        inset
        slotLabel="Idle"
        slotValue={consumptionIdle.toLocaleString("en-US")}
      />
    </List>
  );
};
