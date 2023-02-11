import { FC, ReactNode } from "react";
import { Box, Grid, Typography } from "@mui/material";

type SummaryItemProps = {
  slotLabel: ReactNode;
  slotValue: ReactNode;
};
export const SummaryItem: FC<SummaryItemProps> = (props) => {
  const { slotLabel, slotValue } = props;
  return (
    <Box>
      <Grid container columns={10} alignItems="end">
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Typography>{slotLabel}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography textAlign="right" fontWeight="bold">
            {slotValue}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
