import { FC } from "react";
import { List, ListSubheader, Typography } from "@mui/material";
import { SummaryItem } from "../SummaryItem";

type SummaryFacilityProps = {
  facilityNeeded: number;
  facilitySetNeeded: number;
  facilityMax: number;
  facilityLeftover: number;
};
export const SummaryFacility: FC<SummaryFacilityProps> = (props) => {
  const {
    facilityMax,
    facilityNeeded,
    facilityLeftover,
    facilitySetNeeded,
  } = props;

  return (
    <List
      dense
      disablePadding
      subheader={
        <ListSubheader>
          <Typography>Facilities</Typography>
        </ListSubheader>
      }
    >
      <SummaryItem
        inset
        slotLabel={
          facilityNeeded > 1 ? "Facilities needed" : "Facility needed"
        }
        slotValue={
          facilityNeeded > 0
            ? facilityNeeded.toLocaleString("en-US")
            : 0
        }
      />
      <SummaryItem
        inset
        slotLabel={
          facilityMax > 1
            ? "Facilities per array"
            : "Facility per array"
        }
        slotValue={facilityMax.toLocaleString("en-US")}
      />
      <SummaryItem
        inset
        slotLabel={
          facilitySetNeeded > 1 ? "Arrays needed" : "Array needed"
        }
        slotValue={facilitySetNeeded.toLocaleString("en-US")}
      />
      <SummaryItem
        inset
        slotLabel={
          facilityLeftover > 1
            ? "Leftover facilities"
            : "Leftover facility"
        }
        slotValue={facilityLeftover.toLocaleString("en-US")}
      />
    </List>
  );
};
