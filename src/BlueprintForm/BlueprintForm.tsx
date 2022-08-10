import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
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

interface CustomNumberFieldProps {
  min_val: number;
  max_val: number;
  label?: string;
  helperText?: string;
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

  let helper_text: string = " ";
  if (Boolean(props.helperText)) {
    helper_text = props.helperText!;
  }

  return (
    <TextField
      type="number"
      variant="filled"
      helperText={helper_text}
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
    <Stack spacing={1}>
      <FacilityAutocomplete value={f} onChange={setF} />
      <RecipeAutocomplete
        recipe_type={f.recipe_type}
        value={r}
        onChange={setR}
      />
      <ProliferatorLevelSelect value={pLevel} onChange={setPLevel} />
      <ProliferatorModeSelector
        speedup_only={r.speedup_only}
        value={pMode}
        onChange={setPMode}
      />
      <NumberField
        min_val={0}
        max_val={120}
        label="input flowrate"
        helperText="items per minute"
        value={inputFlow.toString()}
        onChange={setInputFlow}
      />
      <NumberField
        min_val={0}
        max_val={120}
        helperText="items per minute"
        label="output flowrate"
        value={outputFlow.toString()}
        onChange={setOutputFlow}
      />
      <SorterAutocomplete value={sorter} onChange={setS} />
      <Card>
        <CardContent>
          <Typography>{`max facilities per set: ${max_f_per_set}`}</Typography>
          <Typography>material demand per minute</Typography>
          <Box paddingLeft={2}>
            {Object.keys(material_per_minute).map((k) => (
              <Typography
                key={k}
              >{`${material_per_minute[k]}x ${k}`}</Typography>
            ))}
          </Box>
          <Typography>product supply per minute</Typography>
          <Box paddingLeft={2}>
            {Object.keys(product_per_minute).map((k) => (
              <Typography
                key={k}
              >{`${product_per_minute[k]}x ${k}`}</Typography>
            ))}
          </Box>
          <Typography>{`max work consumption: ${max_work_consumption} MW`}</Typography>
          <Typography>{`max idle consumption: ${max_idle_consumption} MW`}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default BlueprintForm;
