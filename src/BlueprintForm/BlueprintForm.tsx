import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import FACILITIES from "../data/facilities";
import RECIPES from "../data/recipes";
import { Facility, Recipe } from "../types";
import FacilityAutocomplete from "../FacilityAutocomplete";
import RecipeAutocomplete from "../RecipeAutocomplete";
import { RecipeType } from "../enums";

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

  const [inputFlow, setInputFlow] = useState(30);
  const [outputFlow, setOutputFlow] = useState(30);

  const [prolifLevel, setProlifLevel] = useState(3);
  const [prolifEffect, setProlifEffect] = useState<null | number>(
    null,
  );

  useEffect(() => {
    for (const r of RECIPES) {
      if (r.recipe_type === facility.recipe_type) {
        setRecipe(r);
        break;
      }
    }
  }, [facility, setRecipe]);

  const recipes = RECIPES.filter(
    (r) => r.recipe_type === facility.recipe_type,
  );

  return (
    <Stack>
      <FacilityAutocomplete value={facility} onChange={setFacility} />
      <RecipeAutocomplete
        options={recipes}
        value={recipe}
        onChange={setRecipe}
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
      <Select value={prolifLevel}>
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </Select>
      {/* <ToggleButtonGroup
        exclusive
        disabled={!Boolean(r)}
        value={prolifEffect}
        onChange={handleProlifEffectChange}
        color="primary"
      >
        <ToggleButton
          disabled={Boolean(r) && r!.speedup_only}
          value={0}
        >
          exta products
        </ToggleButton>
        <ToggleButton value={1}>production speedup</ToggleButton>
      </ToggleButtonGroup> */}
    </Stack>
  );
};

export default BlueprintForm;
