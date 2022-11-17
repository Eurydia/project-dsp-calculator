import { FC } from "react";
import { Grid, Stack, Typography } from "@mui/material";

interface ResultDetailsProps {
  label: string;
  value: number | string;
  unit?: string;
}
const ResultDetails: FC<ResultDetailsProps> = (props) => {
  return (
    <Grid container columns={{ xs: 2, sm: 4 }}>
      <Grid item xs={2} md={2}>
        <Typography>{props.label}</Typography>
      </Grid>
      <Grid item xs={1} md={1}>
        <Typography>{props.value}</Typography>
      </Grid>
      <Grid item xs={1} md={1}>
        <Typography>{props.unit}</Typography>
      </Grid>
    </Grid>
  );
};

export default ResultDetails;
