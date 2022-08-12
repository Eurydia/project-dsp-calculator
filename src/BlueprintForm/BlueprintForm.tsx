import { FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Stack,
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
import CustomNumberField from "../CustomNumberField";
import CustomSwitch from "../CustomSwitch";
import CustomDisplay from "../CustomDisplay";
import ConfigA from "../ConfigA";
import ConfigB from "../ConfigB";
import {
  calculate_material_per_minute,
  calculate_max_facility,
  calculate_idle_consumption,
  calculate_work_consumption,
  calculate_product_per_minute,
  get_prolif,
} from "../helper";

interface ConfigGProps {}
const BlueprintForm: FC<ConfigGProps> = (props) => {
  const [f, setF] = useState<Facility>(FACILITIES[0]);
  const [r, setR] = useState<Recipe>(RECIPES[0]);
  const [s, setS] = useState<Sorter>(SORTERS[3]);
  const [inputFlow, setInputFlow] = useState("30");
  const [outputFlow, setOutputFlow] = useState("30");

  const [pLevel, setPLevel] = useState(3);
  const [pMode, setPMode] = useState(0);

  const [keepBeltUnderMaxLoad, setKeepBeltUnderMaxLoad] =
    useState(true);
  const [preferEven, setPreferEven] = useState(true);
  const [countSorterConsumption, setCountSorterConsumption] =
    useState(true);

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

  let n_facility = 0;
  if (!isNaN(in_flow) && !isNaN(out_flow)) {
    n_facility = calculate_max_facility(
      f,
      r,
      p,
      in_flow,
      out_flow,
      keepBeltUnderMaxLoad,
      preferEven,
    );
  }

  return (
    <Stack spacing={4}>
      <Card raised>
        <CardHeader title="calculate facility per set" />
        <CardContent>
          <Stack spacing={4} divider={<Divider flexItem />}>
            <Grid container spacing={2} columns={{ md: 10 }}>
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
                <CustomNumberField
                  min_value={0}
                  max_value={120}
                  suffix="/s"
                  label="input transport speed"
                  value={inputFlow}
                  onChange={setInputFlow}
                />
              </Grid>
              <Grid item md={5}>
                <CustomNumberField
                  min_value={0}
                  max_value={120}
                  suffix="/s"
                  label="output transport speed"
                  value={outputFlow}
                  onChange={setOutputFlow}
                />
              </Grid>
              <Grid item md={5}>
                <Stack spacing={2}>
                  <ProliferatorLevelSelect
                    value={pLevel}
                    onChange={setPLevel}
                  />
                  <ProliferatorModeSelector
                    speedup_only={r.speedup_only}
                    value={pMode}
                    onChange={setPMode}
                  />
                </Stack>
              </Grid>
              <Grid item md={5}>
                <FormControl>
                  <FormLabel>flags</FormLabel>
                  <CustomSwitch
                    label="keep belt under max load"
                    tooltip="remove facilities until belts are under 100% flow rate."
                    checked={keepBeltUnderMaxLoad}
                    onChange={setKeepBeltUnderMaxLoad}
                  />
                  <CustomSwitch
                    label="prefer even facility"
                    tooltip="remove one facility if the result is odd."
                    checked={preferEven}
                    onChange={setPreferEven}
                  />
                  <CustomSwitch
                    label="count sorter power consumption"
                    tooltip="also take power consumed by sorters into calculation."
                    checked={countSorterConsumption}
                    onChange={setCountSorterConsumption}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box width={0.6}>
              <CustomDisplay
                nFacility={n_facility}
                facility={f}
                recipe={r}
                sorter={s}
                proliferator={p}
                countSorterFlag={countSorterConsumption}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
      {/* <ConfigA
        facility={f}
        recipe={r}
        sorter={s}
        proliferator={p}
        countSorterFlag={countSorterConsumption}
      /> */}
      <ConfigB
        nFacilityPerSet={n_facility}
        facility={f}
        recipe={r}
        sorter={s}
        proliferator={p}
        countSorterFlag={countSorterConsumption}
      />
    </Stack>
  );
};

export default BlueprintForm;
