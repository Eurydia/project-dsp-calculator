import { FC, ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import {
  facilityAtom,
  recipeAtom,
  sorterAtom,
  inputFlowRateAtom,
  outputFlowRateAtom,
  productionTargetAtom,
  prolifLevelAtom,
  prolifModeAtom,
  flagsAtom,
} from "../atoms";
import RECIPES from "../assets/data/recipes";
import { Facility, Recipe } from "../types";
import { PROLIF_PRODUCTION_SPEEDUP } from "../enums";

import FacilityAutocomplete from "../AutocompleteFacility";
import RecipeAutocomplete from "../AutocompleteRecipe";
import SorterAutocomplete from "../AutocompleteSorter";
import FieldNumber from "../FieldNumber";
import RadioProlifLevel from "../RadioProlifLevel";
import RadioProlifMode from "../RadioProlifMode";
import GroupFlags from "../GroupFlags";

import LayoutConfigMajor from "./layouts/LayoutConfigMajor";
import LayoutConfigProlif from "./layouts/LayoutConfigProlif";
import {
  get_prolif,
  calculate_idle_consumption,
  calculate_material_per_minute,
  calculate_product_per_minute,
  calculate_work_consumption,
  calculate_n_facility_from_flow_rate,
  calculate_n_facility_needed,
} from "./helper";
import { capitalizeAll } from "../utils";

interface CustomDetailsProps {
  label: string;
  value: string | number;
}
const CustomDetail: FC<CustomDetailsProps> = (props) => {
  const { label, value } = props;
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};

interface CustomListProps {
  label: string;
  children: ReactNode;
}
/**
 * For grouping materials demand and products supply per minute.
 */
const CustomList: FC<CustomListProps> = (props) => {
  const { label, children } = props;
  return (
    <Box sx={{ textTransform: "capitalize" }}>
      <Typography>{label}</Typography>
      <Box paddingLeft={2}>{children}</Box>
    </Box>
  );
};

interface BlueprintFormProps {}
const BlueprintForm: FC<BlueprintFormProps> = (props) => {
  const [facility, setFacility] = useAtom(facilityAtom);
  const [recipe, setRecipe] = useAtom(recipeAtom);
  const [sorter, setSorter] = useAtom(sorterAtom);

  const [inFlow, setInFlow] = useAtom(inputFlowRateAtom);
  const [outFlow, setOutFlow] = useAtom(outputFlowRateAtom);

  /**
   * This represent the production target object.
   * The keys are product names, and values are strings,
   * which will be converted to numbers.
   */

  const [prolifLevel, setProlifLevel] = useAtom(prolifLevelAtom);
  const [prolifMode, setProlifMode] = useAtom(prolifModeAtom);

  const [flags, setFlags] = useAtom(flagsAtom);

  const [prodTarget, setProdTarget] = useAtom(productionTargetAtom);
  /**
   * When facility changes, the recipe may also need to be change as well.
   * @param next_facility Facility to be set.
   */
  const handleFacilityChange = (next_facility: Facility) => {
    const prev_recipe_type = recipe.recipe_type;
    const next_recipe_type = next_facility.recipe_type;

    setFacility(next_facility);
    if (prev_recipe_type !== next_recipe_type) {
      /**
       * Set recipe to the first recipe with matching recipe type.
       * Note: This will not set new recipe if
       * it can't find a match.
       */
      for (const r of RECIPES) {
        if (r.recipe_type === next_recipe_type) {
          handleRecipeChange(r);
          break;
        }
      }
    }
  };
  /**
   * Some recipe only have speedup bonus available.
   * So I need to update the bonus.
   * Also, when recipe change, the
   * products may also change as well,
   * which is why I need to update
   * `prodTarget` as well.
   * @param next_recipe Recipe to be set.
   */
  const handleRecipeChange = (next_recipe: Recipe) => {
    setRecipe(next_recipe);

    if (next_recipe.speedup_only) {
      setProlifMode(PROLIF_PRODUCTION_SPEEDUP);
    }

    setProdTarget((prev) => {
      const next: { [key: string]: string } = {};
      for (const key of Object.keys(next_recipe.product)) {
        const prev_value: undefined | string = prev[key];

        let next_value = "";
        if (prev_value !== undefined) {
          next_value = prev_value;
        }

        next[key] = next_value;
      }
      return next;
    });
  };

  const handleProdTargetChange = (
    product_name: string,
    next_value: string,
  ) => {
    setProdTarget((prev) => {
      const next = { ...prev };
      next[product_name] = next_value;
      return next;
    });
  };

  const handleFlagChange = (
    flag_key: string,
    next_state: boolean,
  ) => {
    setFlags((prev) => {
      const next = { ...prev };
      next[flag_key] = next_state;
      return next;
    });
  };

  const proliferator = get_prolif(prolifLevel, prolifMode);
  const in_flow = parseInt(inFlow);
  const out_flow = parseInt(outFlow);

  let n_facility_per_set = 0;
  /**
   * Calculate the maximal number of facilities per set
   * using the given configuration.
   *
   * Skip if input capacity or output capacity
   * is `NaN`. (`parseInt` resolves to `NaN` when passed an empty string)
   */
  if (!isNaN(in_flow) && !isNaN(out_flow)) {
    n_facility_per_set = calculate_n_facility_from_flow_rate(
      facility,
      recipe,
      proliferator,
      in_flow,
      out_flow,
      flags["0"],
      flags["1"],
    );
  }
  /**
   * Calculate the minimal number of facilites needed to
   * satisfy the production target.
   *
   * If the production target is not set (empty string),
   * then display the "maximal number of facility per set" instead.
   */
  let n_facility = calculate_n_facility_needed(
    facility,
    recipe,
    proliferator,
    prodTarget,
  );
  if (n_facility === 0) {
    n_facility = n_facility_per_set;
  }
  /**
   * Calculate work power consumption, idle power consumption,
   * material needed per minute, and products produce per minute
   * using `n_facility`.
   *
   * For power consumption, if flag #2 (count sorters consumption) is active,
   * pass current sorter to the fuction as well.
   */
  const work_consumption = calculate_work_consumption(
    n_facility,
    facility,
    recipe,
    proliferator,
    flags["2"] ? sorter : null,
  );
  const idle_consumption = calculate_idle_consumption(
    n_facility,
    facility,
    recipe,
    flags["2"] ? sorter : null,
  );
  const material = calculate_material_per_minute(
    n_facility,
    facility,
    recipe,
    proliferator,
  );
  const product = calculate_product_per_minute(
    n_facility,
    facility,
    recipe,
    proliferator,
  );

  const n_sets = Math.floor(n_facility / n_facility_per_set);
  const n_leftover = n_facility % n_facility_per_set;

  return (
    <Paper sx={{ padding: 4 }} elevation={0}>
      <Stack spacing={{ xs: 1, md: 2 }}>
        <Typography fontSize="large" fontWeight="bold">
          Config
        </Typography>
        <LayoutConfigMajor
          slotFacility={
            <FacilityAutocomplete
              value={facility}
              onChange={handleFacilityChange}
            />
          }
          slotRecipe={
            <RecipeAutocomplete
              recipe_type={facility.recipe_type}
              value={recipe}
              onChange={handleRecipeChange}
            />
          }
          slotSorter={
            <SorterAutocomplete value={sorter} onChange={setSorter} />
          }
          slotInputFlow={
            <FieldNumber
              minValue={0}
              maxValue={120}
              suffix="/s"
              label="Input Belt Speed"
              value={inFlow}
              onChange={setInFlow}
            />
          }
          slotOutputFlow={
            <FieldNumber
              minValue={0}
              maxValue={120}
              suffix="/s"
              label="Output Belt Speed"
              value={outFlow}
              onChange={setOutFlow}
            />
          }
        />
        <LayoutConfigProlif
          slotLevel={
            <RadioProlifLevel
              value={prolifLevel}
              onChange={setProlifLevel}
            />
          }
          slotMode={
            <RadioProlifMode
              value={prolifMode}
              disableProductBonus={recipe.speedup_only}
              onChange={setProlifMode}
            />
          }
        />
        <GroupFlags flags={flags} onChange={handleFlagChange} />
        <Typography fontWeight="bold" fontSize="large">
          Production Target
        </Typography>
        <Box width={0.4}>
          <Stack spacing={1}>
            {Object.keys(prodTarget).map((key) => (
              <FieldNumber
                key={key}
                label={capitalizeAll(key)}
                minValue={0}
                suffix="/min"
                value={prodTarget[key]}
                onChange={(value) =>
                  handleProdTargetChange(key, value)
                }
              />
            ))}
          </Stack>
        </Box>
        <CustomDetail
          label="Number of Facility"
          value={`${n_facility}`}
        />
        <Typography>
          {`([${n_sets} * ${n_facility_per_set}] + ${n_leftover})`}
        </Typography>
        <CustomDetail
          label="Work Consumption"
          value={`${work_consumption} MW`}
        />
        <CustomDetail
          label="Idle Consumption"
          value={`${idle_consumption} MW`}
        />
        <CustomList label="Material">
          {Object.keys(material).map((k) => (
            <CustomDetail
              key={k}
              label={k}
              value={`- ${material[k]} /min`}
            />
          ))}
        </CustomList>
        <CustomList label="product">
          {Object.keys(product).map((k) => (
            <CustomDetail
              key={k}
              label={k}
              value={`+ ${product[k]} /min`}
            />
          ))}
        </CustomList>
      </Stack>
    </Paper>
  );
};

export default BlueprintForm;
