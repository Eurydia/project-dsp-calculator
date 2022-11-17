import { Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface LayoutConfigProlifProps {
  slotMode: ReactNode;
  slotLevel: ReactNode;
}
const LayoutConfigProlif: FC<LayoutConfigProlifProps> = (props) => {
  return (
    <Grid container columns={{ xs: 1, md: 2 }}>
      <Grid item xs={1}>
        {props.slotMode}
      </Grid>
      <Grid item xs={1}>
        {props.slotLevel}
      </Grid>
    </Grid>
  );
};

export default LayoutConfigProlif;
