import { FC } from "react";
import { List } from "@mui/material";
import { SummaryItem } from "./SummaryItem";

type PowerSummaryProps = {
  consumptionWork: number;
  consumptionIdle: number;
};
export const PowerSummary: FC<PowerSummaryProps> = (props) => {
  const { consumptionIdle, consumptionWork } = props;

  return (
    <List dense disablePadding>
      <SummaryItem
        slotLabel="Work comsumption (MW)"
        slotValue={consumptionWork}
      />
      <SummaryItem
        slotLabel="Idle comsumption (MW)"
        slotValue={consumptionIdle}
      />
    </List>
  );
};
