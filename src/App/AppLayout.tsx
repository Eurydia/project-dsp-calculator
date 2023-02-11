import { Box, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

type AppLayoutProps = {
  slotSide: ReactNode;
  slotMainTop: ReactNode;
  slotMainBottom: ReactNode;
};
export const AppLayout: FC<AppLayoutProps> = (props) => {
  const { slotSide, slotMainBottom, slotMainTop } = props;

  return (
    <Box paddingY={2}>
      <Grid container spacing={2} columns={{ xs: 1, md: 3 }}>
        <Grid item xs={1}>
          {slotSide}
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={2} columns={1}>
            <Grid item xs={1}>
              {slotMainTop}
            </Grid>
            <Grid item xs={1}>
              {slotMainBottom}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
