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

const formatNumber = (value: number): string => {
  return value.toLocaleString("en-US");
};

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
  powerWorkPerFacility: number;
  powerIdlePerFacility: number;
  billMaterialPerFacility: { [K: string]: number };
  billProductPerFacility: { [K: string]: number };
};
export const ViewSummary: FC<ViewSummaryProps> = (props) => {
  const {
    facilitiesNeeded,
    facilitiesPerArray,

    powerIdlePerFacility,
    powerWorkPerFacility,

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
        <Stack spacing={2}>
          <SummaryItem
            slotLabel={
              facilitiesNeeded > 1
                ? "Total facilities needed"
                : "Total facility needed"
            }
            slotValue={
              facilitiesNeeded > 0
                ? facilitiesNeeded.toLocaleString("en-US")
                : 0
            }
          />
          <SummaryItem
            slotLabel={
              arraysNeeded > 1 ? "Arrays needed" : "Array needed"
            }
            slotValue={arraysNeeded.toLocaleString("en-US")}
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
                  <Typography
                    color="primary"
                    fontWeight="medium"
                    fontSize="inherit"
                  >
                    Total
                  </Typography>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  <Typography
                    color="primary"
                    fontWeight="medium"
                    fontSize="inherit"
                  >
                    Per array
                  </Typography>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  <Typography
                    color="primary"
                    fontWeight="medium"
                    fontSize="inherit"
                  >
                    Per facility
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    fontSize="small"
                    color={palette.primary.main}
                    fontWeight="medium"
                  >
                    Consumption (per minute)
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
              {Object.entries(billMaterialPerFacility).map(
                (entry) => {
                  const [label, value] = entry;

                  return (
                    <TableRow key={label}>
                      <TableCell colSpan={3}>
                        <Typography paddingLeft={4}>
                          {label}
                        </Typography>
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        align="right"
                        sx={{
                          color: palette.text.primary,
                          fontWeight: "bold",
                        }}
                      >
                        {formatNumber(value * facilitiesNeeded)}
                      </TableCell>
                      <TableCell colSpan={1} align="right">
                        {formatNumber(value * facilitiesPerArray)}
                      </TableCell>
                      <TableCell colSpan={1} align="right">
                        {formatNumber(value)}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    fontSize="small"
                    color={palette.primary.main}
                    fontWeight="medium"
                  >
                    Production (per minute)
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
              {Object.entries(billProductPerFacility).map((entry) => {
                const [label, value] = entry;

                return (
                  <TableRow key={label}>
                    <TableCell colSpan={3}>
                      <Typography paddingLeft={4}>{label}</Typography>
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      align="right"
                      sx={{
                        color: palette.text.primary,
                        fontWeight: "bold",
                      }}
                    >
                      {formatNumber(value * facilitiesNeeded)}
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {formatNumber(value * facilitiesPerArray)}
                    </TableCell>
                    <TableCell colSpan={1} align="right">
                      {formatNumber(value)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    fontSize="small"
                    color={palette.primary.main}
                    fontWeight="medium"
                  >
                    Power usage (MW)
                  </Typography>
                </TableCell>
                <TableCell colSpan={3} />
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography paddingLeft={4}>Work</Typography>
                </TableCell>
                <TableCell
                  colSpan={1}
                  align="right"
                  sx={{
                    color: palette.text.primary,
                    fontWeight: "bold",
                  }}
                >
                  {formatNumber(
                    powerWorkPerFacility * facilitiesNeeded,
                  )}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {formatNumber(
                    powerWorkPerFacility * facilitiesPerArray,
                  )}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {formatNumber(powerWorkPerFacility)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography paddingLeft={4}>Idle</Typography>
                </TableCell>
                <TableCell
                  colSpan={1}
                  align="right"
                  sx={{
                    color: palette.text.primary,
                    fontWeight: "bold",
                  }}
                >
                  {formatNumber(
                    powerIdlePerFacility * facilitiesNeeded,
                  )}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {formatNumber(
                    powerIdlePerFacility * facilitiesPerArray,
                  )}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {formatNumber(powerIdlePerFacility)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};
