// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { FC, HTMLAttributes, ReactNode } from "react";
import {
  AutocompleteRenderOptionState,
  MenuItem,
  Tooltip,
  Box,
  Stack,
  Typography,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material";
import { Recipe, BOM } from "../types";
import { lightBlue, orange } from "@mui/material/colors";

const BOMToTypography = (bom: BOM) => {
  const res: JSX.Element[] = [];

  for (const key of Object.keys(bom)) {
    res.push(
      <Typography key={key}>{`- ${bom[key]}x ${key}`}</Typography>,
    );
  }

  return res;
};

interface CustomDetailsProps {
  label: string;
  value: string;
}
const CustomDetail: FC<CustomDetailsProps> = (props) => {
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Typography>{props.label}</Typography>
      <Typography>{props.value}</Typography>
    </Stack>
  );
};

interface CustomListProps {
  label: string;
  children: ReactNode;
}
const CustomList: FC<CustomListProps> = (props) => {
  return (
    <Box>
      <Typography>{props.label}</Typography>
      <Box paddingLeft={2}>{props.children}</Box>
    </Box>
  );
};

const color_theme = createTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  },
});

export const renderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: Recipe,
  state: AutocompleteRenderOptionState,
) => {
  return (
    <MenuItem {...props}>
      <ThemeProvider theme={color_theme}>
        <Tooltip
          placement="right-start"
          componentsProps={{
            tooltip: {
              sx: {
                background: alpha("#000000", 0.8),
              },
            },
          }}
          title={
            <Stack spacing={1} padding={1}>
              <CustomDetail
                label="cycle time"
                value={`${option.cycle_time}s`}
              />
              <CustomList label="material">
                {BOMToTypography(option.material)}
              </CustomList>
              <CustomList label="product">
                {BOMToTypography(option.product)}
              </CustomList>
              <CustomList label="bonus">
                {!option.speedup_only && (
                  <Typography
                    fontWeight="medium"
                    color="primary"
                    sx={{
                      textShadow: "0 0 10px",
                    }}
                  >
                    extra products
                  </Typography>
                )}
                <Typography
                  fontWeight="medium"
                  color="secondary"
                  sx={{
                    textShadow: "0 0 10px",
                  }}
                >
                  production speedup
                </Typography>
              </CustomList>
            </Stack>
          }
        >
          <Typography>{option.label}</Typography>
        </Tooltip>
      </ThemeProvider>
    </MenuItem>
  );
};
