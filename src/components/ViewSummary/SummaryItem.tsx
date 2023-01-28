import { FC, ReactNode } from "react";
import {
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

type SummaryItemProps = {
  inset?: boolean;
  slotLabel: ReactNode;
  slotValue: ReactNode;
};
export const SummaryItem: FC<SummaryItemProps> = (props) => {
  const { inset, slotLabel, slotValue } = props;
  return (
    <ListItem dense>
      <ListItemText>
        <Grid container columns={{ xs: 2, sm: 3 }} alignItems="end">
          <Grid item xs={1} sm={1}>
            <Typography paddingLeft={inset ? 4 : 0}>
              {slotLabel}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography textAlign="right" fontWeight="bold">
              {slotValue}
            </Typography>
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  );
};
