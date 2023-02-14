import { FC, ReactNode } from "react";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

type SummaryItemProps = {
  slotLabel: ReactNode;
  slotValue: ReactNode;
};
const SummaryItem: FC<SummaryItemProps> = (props) => {
  const { slotLabel, slotValue } = props;
  return (
    <Box>
      <Grid container columns={3} alignItems="end">
        <Grid item xs={1}>
          <Typography>{slotLabel}</Typography>
        </Grid>
        <Grid item xs sm={1}>
          <Typography fontWeight="bold" textAlign="right">
            {slotValue}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

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

  const { palette } = useTheme();

  const arraysNeeded: number =
    Math.floor(facilitiesNeeded / facilitiesPerArray) || 0;
  const facilitiesLeftover: number =
    facilitiesNeeded % facilitiesPerArray || 0;

  return (
    <Box>
      <Stack spacing={3}>
        <Typography
          fontWeight="bold"
          fontSize="x-large"
          color={palette.text.secondary}
        >
          3. Results
        </Typography>
        <Stack spacing={2}>
          <SummaryItem
            slotLabel={
              facilitiesNeeded > 1
                ? "Facilities needed"
                : "Facility needed"
            }
            slotValue={
              facilitiesNeeded > 0
                ? facilitiesNeeded.toLocaleString("en-US")
                : 0
            }
          />
          <SummaryItem
            slotLabel={
              facilitiesPerArray > 1
                ? "Facilities per array"
                : "Facility per array"
            }
            slotValue={facilitiesPerArray.toLocaleString("en-US")}
          />
          <SummaryItem
            slotLabel={
              arraysNeeded > 1 ? "Arrays needed" : "Array needed"
            }
            slotValue={arraysNeeded.toLocaleString("en-US")}
          />
          <SummaryItem
            slotLabel={
              facilitiesLeftover > 1
                ? "Leftover facilities"
                : "Leftover facility"
            }
            slotValue={facilitiesLeftover.toLocaleString("en-US")}
          />
        </Stack>
        <TableContainer component={Box} overflow="auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} />
                <TableCell colSpan={1} align="right">
                  <Typography fontWeight="medium" fontSize="inherit">
                    Total
                  </Typography>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  <Typography fontWeight="medium" fontSize="inherit">
                    Per array
                  </Typography>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  <Typography fontWeight="medium" fontSize="inherit">
                    Per facility
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography fontSize="small" fontWeight="medium">
                    {Object.values(billMaterialPerFacility).length > 1
                      ? "Inputs (per minute)"
                      : "Input (per minute)"}
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
              {Object.entries(billMaterialPerFacility).map(
                (entry) => {
                  const [label, value] = entry;

                  const bill_per_facility = value;
                  const bill_per_array = value * facilitiesPerArray;
                  const bill_total = value * facilitiesNeeded;

                  return (
                    <TableRow key={label}>
                      <TableCell colSpan={3}>
                        <Typography paddingLeft={4}>
                          {label}
                        </Typography>
                      </TableCell>
                      <TableCell colSpan={1} align="right">
                        {bill_total.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell colSpan={1} align="right">
                        {bill_per_array.toLocaleString("en-US")}
                      </TableCell>
                      <TableCell colSpan={1} align="right">
                        {bill_per_facility.toLocaleString("en-US")}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography fontSize="small" fontWeight="medium">
                    {Object.values(billProductPerFacility).length > 1
                      ? "Outputs (per minute)"
                      : "Output (per minute)"}
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
              {Object.entries(billProductPerFacility).map((entry) => {
                const [label, value] = entry;

                const bill_per_facility = value;
                const bill_per_array = value * facilitiesPerArray;
                const bill_total = value * facilitiesNeeded;

                return (
                  <TableRow key={label}>
                    <TableCell colSpan={3}>
                      <Typography paddingLeft={4}>{label}</Typography>
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {bill_total.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {bill_per_array.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {bill_per_facility.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography fontSize="small" fontWeight="medium">
                    Power usage (MW)
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography paddingLeft={4}>Work</Typography>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {(
                    consumptionWorkPerFacility * facilitiesNeeded
                  ).toLocaleString("en-US")}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {(
                    consumptionWorkPerFacility * facilitiesPerArray
                  ).toLocaleString("en-US")}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {consumptionWorkPerFacility.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography paddingLeft={4}>Idle</Typography>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {(
                    consumptionIdlePerFacility * facilitiesNeeded
                  ).toLocaleString("en-US")}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {(
                    consumptionIdlePerFacility * facilitiesPerArray
                  ).toLocaleString("en-US")}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {consumptionIdlePerFacility.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};
