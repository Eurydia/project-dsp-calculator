import { Box, Grid, Stack } from "@mui/material";
import { FC, ReactNode } from "react";

type AppLayoutProps = {
  slotSideTop: ReactNode;
  slotMainTop: ReactNode;
  slotMainBottom: ReactNode;
};
export const AppLayout: FC<AppLayoutProps> = (props) => {
  const { slotSideTop, slotMainBottom, slotMainTop } = props;

  return (
    <Box paddingY={2}>
      <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 3 }}>
        <Grid item xs={1} sm={1} md={1}>
          <Stack spacing={2}>{slotSideTop}</Stack>
        </Grid>
        <Grid item xs={1} sm={1} md={2}>
          <Stack spacing={2}>
            {slotMainTop}
            {slotMainBottom}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
