import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import FACILITIES from "../data/facilities";
import RECIPES from "../data/recipes";
import { Facility, Recipe, Sorter } from "../types";
import FacilityAutocomplete from "../FacilityAutocomplete";
import RecipeAutocomplete from "../RecipeAutocomplete";
import { RecipeType } from "../enums";
import { blue } from "@mui/material/colors";
import SorterAutocomplete from "../SorterAutocomplete";
import SORTERS from "../data/sorter";
import {
  calculate_material_per_minute,
  calculate_max_facility,
  calculate_max_idle_consumption,
  calculate_max_work_consumption,
  calculate_product_per_minute,
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
  const [facility, setFacility] = useState<Facility>(FACILITIES[0]);
  const [recipe, setRecipe] = useState<Recipe>(RECIPES[0]);
  const [sorter, setSorter] = useState<Sorter>(SORTERS[3]);

  const [prolifLevel, setProlifLevel] = useState(3);
  const [prolifEffect, setProlifEffect] = useState(0);

  const [inputFlow, setInputFlow] = useState(30);
  const [outputFlow, setOutputFlow] = useState(30);

  const handleFacilityChange = (f: Facility) => {
    const next_recipe_type = f.recipe_type;
    const prev_recipe_type = facility.recipe_type;

    setFacility(f);
    if (next_recipe_type !== prev_recipe_type) {
      for (const r of RECIPES) {
        if (r.recipe_type === facility.recipe_type) {
          setRecipe(r);
          setProlifEffect(Number(r.speedup_only));
          break;
        }
      }
    }
  };

  const handleProlifLevelChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: null | number,
  ) => {
    if (value !== null) {
      setProlifLevel(value!);
    }
  };

  const handleProlifEffectChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: null | number,
  ) => {
    if (value !== null) {
      setProlifEffect(value!);
    }
  };

  const max_f_per_set = calculate_max_facility(
    facility,
    recipe,
    prolifLevel,
    prolifEffect,
    inputFlow,
    outputFlow,
  );

  const material_per_minute = calculate_material_per_minute(
    max_f_per_set,
    facility,
    recipe,
    prolifLevel,
    prolifEffect,
  );

  const product_per_minute = calculate_product_per_minute(
    max_f_per_set,
    facility,
    recipe,
    prolifLevel,
    prolifEffect,
  );

  const max_work_consumption = calculate_max_work_consumption(
    max_f_per_set,
    facility,
    recipe,
    sorter,
    prolifLevel,
    prolifEffect,
  );

  const max_idle_consumption = calculate_max_idle_consumption(
    max_f_per_set,
    facility,
    recipe,
    sorter,
  );

  return (
    <Stack spacing={1}>
      <FacilityAutocomplete
        value={facility}
        onChange={handleFacilityChange}
      />
      <RecipeAutocomplete
        recipe_type={facility.recipe_type}
        value={recipe}
        onChange={setRecipe}
      />
      <ToggleButtonGroup
        exclusive
        fullWidth
        color="primary"
        value={prolifLevel}
        onChange={handleProlifLevelChange}
      >
        <ToggleButton value={0}>0</ToggleButton>
        <ToggleButton value={1}>1</ToggleButton>
        <ToggleButton value={2}>2</ToggleButton>
        <ToggleButton value={3}>3</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        exclusive
        fullWidth
        color="primary"
        value={prolifEffect}
        onChange={handleProlifEffectChange}
      >
        <ToggleButton disabled={recipe!.speedup_only} value={0}>
          exta products
        </ToggleButton>
        <ToggleButton value={1}>production speedup</ToggleButton>
      </ToggleButtonGroup>
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
      <SorterAutocomplete value={sorter} onChange={setSorter} />
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
    </Stack>
  );
};

export default BlueprintForm;
