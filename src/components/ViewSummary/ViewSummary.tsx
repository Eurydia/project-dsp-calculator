import { ChangeEventHandler, FC, ReactNode, useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

type SummaryItemProps = {
  slotLabel: ReactNode;
  slotValue: ReactNode;
};
const SummaryItem: FC<SummaryItemProps> = (props) => {
  const { slotLabel, slotValue } = props;
  return (
    <Box>
      <Grid container columns={10} alignItems="end">
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Typography>{slotLabel}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography fontWeight="bold">{slotValue}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

type SummaryListProps = {
  subheader: ReactNode;
  children: ReactNode;
};

const SummaryList: FC<SummaryListProps> = (props) => {
  const { palette } = useTheme();
  const { subheader, children } = props;
  return (
    <Stack spacing={2}>
      <Typography fontSize="small" color={palette.text.secondary}>
        {subheader}
      </Typography>
      {children}
    </Stack>
  );
};

type ViewSummaryProps = {
  facilitiesNeeded: number;
  facilitiesPerArray: number;
  consumptionWorkPerFacility: number;
  consumptionIdlePerFacility: number;
  billMaterialPerFacility: { [K: string]: number };
  billProductPerFacility: { [K: string]: number };
};
export const ViewSummary: FC<ViewSummaryProps> = (props) => {
  const {
    facilitiesNeeded,
    facilitiesPerArray,
    consumptionIdlePerFacility,
    consumptionWorkPerFacility,
    billMaterialPerFacility,
    billProductPerFacility,
  } = props;

  const arraysNeeded: number =
    Math.floor(facilitiesNeeded / facilitiesPerArray) || 0;
  const facilitiesLeftover: number =
    facilitiesNeeded % facilitiesPerArray || 0;

  const [viewMode, setViewMode] = useState<number>(0);

  const handleViewModeChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const value_target: string = event.target.value;
    const value_parsed: number = Number.parseInt(value_target);
    if (Number.isNaN(value_parsed)) {
      return;
    }
    setViewMode(value_parsed);
  };

  const facilityCount = [facilitiesNeeded, facilitiesPerArray, 1][
    viewMode
  ];

  return (
    <Box>
      <Stack spacing={3}>
        <Typography fontWeight="bold" fontSize="x-large">
          Results
        </Typography>
        <SummaryList subheader="Facility">
          <SummaryItem
            slotLabel={
              facilitiesNeeded > 1
                ? "Facilities needed"
                : "Facility needed"
            }
            slotValue={
              facilitiesNeeded > 0
                ? facilitiesNeeded.toLocaleString("en-US")
                : 0
            }
          />
          <SummaryItem
            slotLabel={
              facilitiesPerArray > 1
                ? "Facilities per array"
                : "Facility per array"
            }
            slotValue={facilitiesPerArray.toLocaleString("en-US")}
          />
          <SummaryItem
            slotLabel={
              arraysNeeded > 1 ? "Arrays needed" : "Array needed"
            }
            slotValue={arraysNeeded.toLocaleString("en-US")}
          />
          <SummaryItem
            slotLabel={
              facilitiesLeftover > 1
                ? "Leftover facilities"
                : "Leftover facility"
            }
            slotValue={facilitiesLeftover.toLocaleString("en-US")}
          />
        </SummaryList>
        <Box>
          <TextField
            select
            size="small"
            value={viewMode}
            onChange={handleViewModeChange}
          >
            <MenuItem value={0}>Total</MenuItem>
            <MenuItem value={1}>Per Array</MenuItem>
            <MenuItem value={2}>Per Facility</MenuItem>
          </TextField>
        </Box>
        <SummaryList
          subheader={
            Object.values(billMaterialPerFacility).length > 1
              ? "Inputs (per minute)"
              : "Input (per minute)"
          }
        >
          {Object.entries(billMaterialPerFacility).map((entry) => {
            const [label, value] = entry;
            const v = value * facilityCount;
            return (
              <SummaryItem
                key={label}
                slotLabel={label}
                slotValue={v.toLocaleString("en-US")}
              />
            );
          })}
        </SummaryList>
        <SummaryList
          subheader={
            Object.values(billProductPerFacility).length > 1
              ? "Outputs (per minute)"
              : "Output (per minute)"
          }
        >
          {Object.entries(billProductPerFacility).map((entry) => {
            const [label, value] = entry;
            const v = facilityCount * value;
            return (
              <SummaryItem
                key={label}
                slotLabel={label}
                slotValue={v.toLocaleString("en-US")}
              />
            );
          })}
        </SummaryList>
        <SummaryList subheader="Power Usage">
          <SummaryItem
            slotLabel="Work"
            slotValue={(
              consumptionWorkPerFacility * facilityCount
            ).toLocaleString("en-US")}
          />
          <SummaryItem
            slotLabel="Idle"
            slotValue={(
              consumptionIdlePerFacility * facilityCount
            ).toLocaleString("en-US")}
          />
        </SummaryList>
      </Stack>
    </Box>
  );
};
