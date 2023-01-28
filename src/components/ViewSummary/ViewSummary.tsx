import { FC } from "react";
import { Box, Stack, Grid, Typography } from "@mui/material";
import { FacilitySummary, PowerSummary } from "./Summaries";

type ViewSummaryProps = {
  facilityNeeded: number;
  facilityMax: number;
  consumptionWork: number;
  consumptionIdle: number;
};
export const ViewSummary: FC<ViewSummaryProps> = (props) => {
  const {
    facilityNeeded,
    facilityMax,
    consumptionIdle,
    consumptionWork,
  } = props;

  const facilitySetNeeded: number = Math.floor(
    facilityNeeded / facilityMax,
  );
  const facilityLeftover: number = facilityNeeded % facilityMax;

  return (
    <Box>
      <Stack spacing={1}>
        <Typography fontWeight="bold" fontSize="large">
          Results
        </Typography>
        <Box>
          <FacilitySummary
            facilityNeeded={facilityNeeded}
            facilitySetNeeded={facilitySetNeeded}
            facilityMax={facilityMax}
            facilityLeftover={facilityLeftover}
          />
          <PowerSummary
            consumptionWork={consumptionWork}
            consumptionIdle={consumptionIdle}
          />
        </Box>
      </Stack>
    </Box>
  );
};
