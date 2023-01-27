import { FC, ReactNode } from "react";
import {
  Box,
  Stack,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FacilitySummary } from "./Summaries";

type ViewSummaryProps = {
  facilityNeeded: number;
  facilityMax: number;
};
export const ViewSummary: FC<ViewSummaryProps> = (props) => {
  const { facilityNeeded, facilityMax } = props;

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
        <FacilitySummary
          facilityNeeded={facilityNeeded}
          facilitySetNeeded={facilitySetNeeded}
          facilityMax={facilityMax}
          facilityLeftover={facilityLeftover}
        />
      </Stack>
    </Box>
  );
};
