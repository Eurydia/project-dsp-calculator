import { FC } from "react";
import { List, ListSubheader } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryPowerProps = {
  facilityCount: number;
  consumptionWork: number;
  consumptionIdle: number;
};
export const SummaryPower: FC<SummaryPowerProps> = (props) => {
  const { facilityCount, consumptionIdle, consumptionWork } = props;

  const work = facilityCount * consumptionWork;
  const idle = facilityCount * consumptionIdle;

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
        slotValue={work.toLocaleString("en-US")}
      />
      <SummaryItem
        inset
        slotLabel="Idle"
        slotValue={idle.toLocaleString("en-US")}
      />
    </List>
  );
};
