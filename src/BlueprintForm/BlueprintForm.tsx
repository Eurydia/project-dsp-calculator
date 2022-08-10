import React, {
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";

import FACILITIES from "../data/facilities";
import RECIPES from "../data/recipes";
import SORTERS from "../data/sorter";
import { Facility, Recipe, Sorter } from "../types";
import FacilityAutocomplete from "../FacilityAutocomplete";
import RecipeAutocomplete from "../RecipeAutocomplete";
import SorterAutocomplete from "../SorterAutocomplete";
import ProliferatorModeSelector from "../ProliferatorModeSelect";
import ProliferatorLevelSelect from "../ProliferatorLevelSelect";
import {
  calculate_material_per_minute,
  calculate_max_facility,
  calculate_max_idle_consumption,
  calculate_max_work_consumption,
  calculate_product_per_minute,
  get_prolif,
} from "./helper";

interface CustomDetailsProps {
  label: string;
  value: string | number;
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

interface CustomNumberFieldProps {
  min_val: number;
  max_val: number;
  label: string;
  value: number | string;
  onChange: (value: number) => void;
}
const NumberField: FC<CustomNumberFieldProps> = (props) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let string_val: string = event.target.value;

    let value: number = props.min_val;
    if (Boolean(string_val)) {
      value = parseInt(string_val, 10);
    }

    if (value < props.min_val) {
      value = props.min_val;
    } else if (value > props.max_val) {
      value = props.max_val;
    }
    props.onChange(value);
  };

  return (
    <TextField
      type="number"
      variant="standard"
      label={props.label}
      value={props.value}
      onChange={handleChange}
    />
  );
};

interface BlueprintFormProps {}

const BlueprintForm: FC<BlueprintFormProps> = (props) => {
  const [f, setF] = useState<Facility>(FACILITIES[0]);
  const [r, setR] = useState<Recipe>(RECIPES[0]);
  const [sorter, setS] = useState<Sorter>(SORTERS[0]);

  const [pLevel, setPLevel] = useState(3);
  const [pMode, setPMode] = useState(0);

  const [inputFlow, setInputFlow] = useState(30);
  const [outputFlow, setOutputFlow] = useState(30);

  useEffect(() => {
    const prev_recipe_type = r.recipe_type;
    const next_recipe_type = f.recipe_type;

    if (next_recipe_type !== prev_recipe_type) {
      for (const recipe of RECIPES) {
        if (recipe.recipe_type === next_recipe_type) {
          setR(recipe);
          break;
        }
      }
    }
  }, [f, r, setR]);

  useEffect(() => {
    setPMode(Number(r.speedup_only));
  }, [r, setPMode]);

  const p = get_prolif(pLevel, pMode);

  const max_f_per_set = calculate_max_facility(
    f,
    r,
    p,
    inputFlow,
    outputFlow,
  );

  const material_per_minute = calculate_material_per_minute(
    max_f_per_set,
    f,
    r,
    p,
  );

  const product_per_minute = calculate_product_per_minute(
    max_f_per_set,
    f,
    r,
    p,
  );

  const max_work_consumption = calculate_max_work_consumption(
    max_f_per_set,
    f,
    r,
    sorter,
    p,
  );

  const max_idle_consumption = calculate_max_idle_consumption(
    max_f_per_set,
    f,
    r,
    sorter,
  );

  return (
    <Paper sx={{ padding: 4 }}>
      <Stack spacing={4} divider={<Divider />}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography fontWeight="medium">config</Typography>
          </Grid>
          <Grid container item md={12}>
            <Grid item md={4}>
              <FacilityAutocomplete value={f} onChange={setF} />
            </Grid>
          </Grid>
          <Grid container item md={12}>
            <Grid item md={4}>
              <RecipeAutocomplete
                recipe_type={f.recipe_type}
                value={r}
                onChange={setR}
              />
            </Grid>
          </Grid>
          <Grid item md={8}>
            <ProliferatorLevelSelect
              value={pLevel}
              onChange={setPLevel}
            />
          </Grid>
          <Grid item md={8}>
            <ProliferatorModeSelector
              speedup_only={r.speedup_only}
              value={pMode}
              onChange={setPMode}
            />
          </Grid>
          <Grid container item md={12}>
            <Grid item md={4}>
              <SorterAutocomplete value={sorter} onChange={setS} />
            </Grid>
          </Grid>
          <Grid container item md={12}>
            <Grid item md={4}>
              <NumberField
                min_val={0}
                max_val={120}
                label="input flowrate"
                value={inputFlow.toString()}
                onChange={setInputFlow}
              />
            </Grid>
          </Grid>
          <Grid container item md={12}>
            <Grid item md={4}>
              <NumberField
                min_val={0}
                max_val={120}
                label="output flowrate"
                value={outputFlow.toString()}
                onChange={setOutputFlow}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Typography fontWeight="medium">results</Typography>
          <Box padding={2} width={0.4} sx={{}}>
            <CustomDetail
              label="facilities per array"
              value={`${max_f_per_set}`}
            />
            <CustomDetail
              label="work consumption"
              value={`${max_work_consumption} MW`}
            />
            <CustomDetail
              label="idle consumption"
              value={`${max_idle_consumption} MW`}
            />
            <CustomList label="material">
              {Object.keys(material_per_minute).map((k) => (
                <CustomDetail
                  key={k}
                  label={k}
                  value={material_per_minute[k]}
                />
              ))}
            </CustomList>
            <CustomList label="product">
              {Object.keys(product_per_minute).map((k) => (
                <CustomDetail
                  key={k}
                  label={k}
                  value={product_per_minute[k]}
                />
              ))}
            </CustomList>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default BlueprintForm;
