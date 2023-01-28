import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  SummaryFacility,
  SummaryMaterial,
  SummaryPower,
  SummaryProduct,
} from "./Summaries";

type ViewSummaryProps = {
  facilityNeeded: number;
  facilityMax: number;
  consumptionWork: number;
  consumptionIdle: number;
  billMaterial: { [K: string]: number };
  billProduct: { [K: string]: number };
};
export const ViewSummary: FC<ViewSummaryProps> = (props) => {
  const {
    facilityNeeded,
    facilityMax,
    consumptionIdle,
    consumptionWork,
    billMaterial,
    billProduct,
  } = props;

  const facilitySetNeeded: number = Math.floor(
    facilityNeeded / facilityMax,
  );
  const facilityLeftover: number = facilityNeeded % facilityMax;

  return (
    <Box>
      <Stack spacing={2}>
        <Typography fontWeight="bold" fontSize="x-large">
          Results
        </Typography>
        <Box>
          <SummaryFacility
            facilityNeeded={facilityNeeded}
            facilitySetNeeded={facilitySetNeeded}
            facilityMax={facilityMax}
            facilityLeftover={facilityLeftover}
          />
          <SummaryPower
            consumptionWork={consumptionWork}
            consumptionIdle={consumptionIdle}
          />
          <SummaryMaterial billMaterial={billMaterial} />
          <SummaryProduct billProduct={billProduct} />
        </Box>
      </Stack>
    </Box>
  );
};
