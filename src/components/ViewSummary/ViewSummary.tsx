import { ChangeEventHandler, FC, useState } from "react";
import {
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  SummaryFacility,
  SummaryMaterial,
  SummaryPower,
  SummaryProduct,
} from "./Summaries";

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

  const arraysNeeded: number = Math.floor(
    facilitiesNeeded / facilitiesPerArray,
  );
  const facilitiesLeftover: number =
    facilitiesNeeded % facilitiesPerArray;

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
      <Stack spacing={2}>
        <Typography fontWeight="bold" fontSize="x-large">
          Results
        </Typography>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Display</Typography>
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
          </Stack>
        </Box>
        <SummaryFacility
          facilityNeeded={facilitiesNeeded}
          facilitySetNeeded={arraysNeeded}
          facilityMax={facilitiesPerArray}
          facilityLeftover={facilitiesLeftover}
        />
        <SummaryPower
          facilityCount={facilityCount}
          consumptionWork={consumptionWorkPerFacility}
          consumptionIdle={consumptionIdlePerFacility}
        />
        <SummaryMaterial
          facilityCount={facilityCount}
          billMaterial={billMaterialPerFacility}
        />
        <SummaryProduct
          facilityCount={facilityCount}
          billProduct={billProductPerFacility}
        />
      </Stack>
    </Box>
  );
};
