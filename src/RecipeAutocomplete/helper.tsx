// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { HTMLAttributes } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Recipe, BOM } from "../types";
import { lightBlue, orange } from "@mui/material/colors";

const color_theme = createTheme({
  palette: { primary: lightBlue, secondary: orange },
});

const BOMToString = (bom: BOM): string[] => {
  const res: string[] = [];

  for (const key of Object.keys(bom)) {
    res.push(`${bom[key]}x ${key}`);
  }

  return res;
};

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Recipe,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <ThemeProvider theme={color_theme}>
      <MenuItem {...props}>
        <Tooltip
          arrow
          placement="right-start"
          title={
            <Stack>
              <Typography>
                cycle time: {option.cycle_time}s
              </Typography>
              <Typography>material:</Typography>
              {BOMToString(option.material).map((v) => (
                <Typography key={v} paddingLeft={2}>
                  {v}
                </Typography>
              ))}
              <Typography>product:</Typography>
              {BOMToString(option.product).map((v) => (
                <Typography key={v} paddingLeft={2}>
                  {v}
                </Typography>
              ))}
              <Typography>proliferator bonus:</Typography>
              <Box paddingLeft={2}>
                {!option.speedup_only && (
                  <Typography
                    fontWeight="bold"
                    color="primary"
                    sx={{
                      textShadow: "0 0 10px",
                    }}
                  >
                    extra products
                  </Typography>
                )}
                <Typography
                  fontWeight="bold"
                  color="secondary"
                  sx={{
                    textShadow: "0 0 10px",
                  }}
                >
                  production speedup
                </Typography>
              </Box>
            </Stack>
          }
        >
          <Typography>{option.label}</Typography>
        </Tooltip>
      </MenuItem>
    </ThemeProvider>
  );
};
