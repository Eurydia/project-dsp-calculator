import { FC } from "react";
import { List } from "@mui/material";
import { SummaryItem } from "./SummaryItem";

type FacilitySummaryProps = {
  facilityNeeded: number;
  facilitySetNeeded: number;
  facilityMax: number;
  facilityLeftover: number;
};
export const FacilitySummary: FC<FacilitySummaryProps> = (props) => {
  const {
    facilityMax,
    facilityNeeded,
    facilityLeftover,
    facilitySetNeeded,
  } = props;

  return (
    <List dense disablePadding>
      <SummaryItem
        slotLabel={
          facilityNeeded > 1
            ? "No. facilities needed"
            : "No. facility needed"
        }
        slotValue={
          facilityNeeded > 0
            ? facilityNeeded.toLocaleString("en-US")
            : 0
        }
      />
      <List dense disablePadding>
        <SummaryItem
          inset
          slotLabel={
            facilityMax > 1
              ? "No. facilities per set"
              : "No. facility per set"
          }
          slotValue={facilityMax.toLocaleString("en-US")}
        />
        <SummaryItem
          inset
          slotLabel={
            facilitySetNeeded > 1
              ? "No. sets needed"
              : "No. set needed"
          }
          slotValue={facilitySetNeeded.toLocaleString("en-US")}
        />
        <SummaryItem
          inset
          slotLabel={
            facilityLeftover > 1
              ? "No. leftover facilities"
              : "No. leftover facility"
          }
          slotValue={facilityLeftover.toLocaleString("en-US")}
        />
      </List>
    </List>
  );
};
