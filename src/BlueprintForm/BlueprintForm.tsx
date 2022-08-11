import {
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import FACILITIES from "../data/facilities";
import RECIPES from "../data/recipes";
import SORTERS from "../data/sorter";
import { BOM, Facility, Recipe, Sorter } from "../types";
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
  min_value?: number;
  max_value?: number;
  suffix?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}
const NumberField: FC<CustomNumberFieldProps> = (props) => {
  const { min_value, max_value } = props;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const string_val = event.target.value;
    const numeric_only = string_val.replace(/[^0-9]/, "");

    if (numeric_only !== "") {
      let val = parseInt(numeric_only);

      if (min_value !== undefined && val < min_value) {
        val = min_value;
      }

      if (max_value !== undefined && val > max_value) {
        val = max_value;
      }

      props.onChange(val.toString());
    } else {
      props.onChange("");
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={props.label}
      value={props.value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.suffix}
          </InputAdornment>
        ),
        inputProps: {
          style: { textAlign: "right" },
          inputMode: "numeric",
        },
      }}
    />
  );
};

interface BlueprintFormProps {}

const BlueprintForm: FC<BlueprintFormProps> = (props) => {
  const [f, setF] = useState<Facility>(FACILITIES[0]);
  const [r, setR] = useState<Recipe>(RECIPES[0]);
  const [s, setS] = useState<Sorter>(SORTERS[3]);

  const [pLevel, setPLevel] = useState(3);
  const [pMode, setPMode] = useState(0);

  const [inputFlow, setInputFlow] = useState("30");
  const [outputFlow, setOutputFlow] = useState("30");

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

  const in_flow = parseInt(inputFlow);
  const out_flow = parseInt(outputFlow);

  let max_f_per_set = 0;
  let material_per_minute: BOM = {};
  let product_per_minute: BOM = {};
  let max_work_consumption = 0;
  let max_idle_consumption = 0;
  if (!isNaN(in_flow) && !isNaN(out_flow)) {
    max_f_per_set = calculate_max_facility(
      f,
      r,
      p,
      in_flow,
      out_flow,
    );

    material_per_minute = calculate_material_per_minute(
      max_f_per_set,
      f,
      r,
      p,
    );

    product_per_minute = calculate_product_per_minute(
      max_f_per_set,
      f,
      r,
      p,
    );

    max_work_consumption = calculate_max_work_consumption(
      max_f_per_set,
      f,
      r,
      s,
      p,
    );
    max_idle_consumption = calculate_max_idle_consumption(
      max_f_per_set,
      f,
      r,
      s,
    );
  }

  return (
    <Paper sx={{ padding: 4 }}>
      <Stack spacing={4} divider={<Divider />}>
        <Grid container spacing={2} columns={{ md: 10 }}>
          <Grid item md={10}>
            <Typography fontWeight="medium">config</Typography>
          </Grid>
          <Grid item md={5}>
            <FacilityAutocomplete value={f} onChange={setF} />
          </Grid>
          <Grid item md={5}>
            <RecipeAutocomplete
              recipe_type={f.recipe_type}
              value={r}
              onChange={setR}
            />
          </Grid>
          <Grid item md={10}>
            <SorterAutocomplete value={s} onChange={setS} />
          </Grid>
          <Grid item md={5}>
            <NumberField
              min_value={0}
              max_value={120}
              suffix="/s"
              label="input transport speed"
              value={inputFlow}
              onChange={setInputFlow}
            />
          </Grid>
          <Grid item md={5}>
            <NumberField
              min_value={0}
              max_value={120}
              suffix="/s"
              label="output transport speed"
              value={outputFlow}
              onChange={setOutputFlow}
            />
          </Grid>
          <Grid item md={5}>
            <ProliferatorLevelSelect
              value={pLevel}
              onChange={setPLevel}
            />
          </Grid>
          <Grid item md={5}>
            <ProliferatorModeSelector
              speedup_only={r.speedup_only}
              value={pMode}
              onChange={setPMode}
            />
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
