import {
  ChangeEvent,
  FC,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  AutocompleteFacility,
  AutocompleteRecipe,
  AutocompleteSorter,
  FieldNumber,
  useFacility,
  useNumber,
  useRecipe,
  useSorter,
} from "../../components";

import {
  get_prolif,
  calculate_idle_consumption,
  calculate_material_per_minute,
  calculate_product_per_minute,
  calculate_work_consumption,
  calculate_n_facility_from_flow_rate,
  calculate_n_facility_needed,
} from "./helper";
import { Recipe } from "../../assets";

type FormBlueprintProps = {};
export const FormBlueprint: FC<FormBlueprintProps> = (props) => {
  const { facility, setFacility } = useFacility("facilitty");
  const { recipe, setRecipe } = useRecipe("recipe");
  const { sorter, setSorter } = useSorter("sorter");

  const { value: inFlow, setValue: setInFlow } = useNumber("in-flow");
  const { value: outFlow, setValue: setOutFlow } =
    useNumber("out-flow");

  const { value: prolifMode, setValue: setProlifMode } =
    useNumber("prolif-mode");
  const { value: prolifLevel, setValue: setProlifLevel } =
    useNumber("prolif-level");

  const [products, setProducts] = useState(
    (): { [K: string]: number } => {
      const state: { [K: string]: number } = {};
      for (const label of Object.keys(recipe.products)) {
        state[label] = 0;
      }
      return state;
    },
  );
  const handleRecipeChange = useCallback(
    (next_recipe: Recipe): void => {
      if (next_recipe.speedup_only) {
        setProlifMode(1);
      }
      setRecipe(next_recipe);
      setProducts((prev) => {
        const next: { [K: string]: number } = {};
        for (const label of Object.keys(next_recipe.products)) {
          next[label] = 0;
        }
        return next;
      });
    },
    [],
  );
  const handleProlifModeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: string): void => {
      const next_mode: number = Number.parseInt(value);
      if (Number.isNaN(next_mode)) {
        return;
      }
      setProlifMode(next_mode);
    },
    [],
  );
  const handleProlifLevelChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: string): void => {
      const next_level: number = Number.parseInt(value);
      if (Number.isNaN(next_level)) {
        return;
      }
      setProlifLevel(next_level);
    },
    [],
  );
  const handleProductChange = useCallback(
    (label: string, next_value: number): void => {
      setProducts((prev) => {
        const next = { ...prev };
        next[label] = next_value;
        return next;
      });
    },
    [],
  );

  // const [flags, setFlags] = useAtom(flagsAtom);

  // const proliferator = get_prolif(prolifLevel, prolifMode);
  // const in_flow = parseInt(inFlow);
  // const out_flow = parseInt(outFlow);

  // let n_facility_per_set = 0;
  // /**
  //  * Calculate the maximal number of facilities per set
  //  * using the given configuration.
  //  *
  //  * Skip if input capacity or output capacity
  //  * is `NaN`. (`parseInt` resolves to `NaN` when passed an empty string)
  //  */
  // if (!isNaN(in_flow) && !isNaN(out_flow)) {
  //   n_facility_per_set = calculate_n_facility_from_flow_rate(
  //     facility,
  //     recipe,
  //     proliferator,
  //     in_flow,
  //     out_flow,
  //     flags["0"],
  //     flags["1"],
  //   );
  // }
  // /**
  //  * Calculate the minimal number of facilites needed to
  //  * satisfy the production target.
  //  *
  //  * If the production target is not set (empty string),
  //  * then display the "maximal number of facility per set" instead.
  //  */
  // let n_facility = calculate_n_facility_needed(
  //   facility,
  //   recipe,
  //   proliferator,
  //   prodTarget,
  // );
  // if (n_facility === 0) {
  //   n_facility = n_facility_per_set;
  // }
  // /**
  //  * Calculate work power consumption, idle power consumption,
  //  * material needed per minute, and products produce per minute
  //  * using `n_facility`.
  //  *
  //  * For power consumption, if flag #2 (count sorters consumption) is active,
  //  * pass current sorter to the fuction as well.
  //  */
  // const work_consumption = calculate_work_consumption(
  //   n_facility,
  //   facility,
  //   recipe,
  //   proliferator,
  //   flags["2"] ? sorter : null,
  // );
  // const idle_consumption = calculate_idle_consumption(
  //   n_facility,
  //   facility,
  //   recipe,
  //   flags["2"] ? sorter : null,
  // );
  // const materials = calculate_material_per_minute(
  //   n_facility,
  //   facility,
  //   recipe,
  //   proliferator,
  // );
  // const products = calculate_product_per_minute(
  //   n_facility,
  //   facility,
  //   recipe,
  //   proliferator,
  // );

  // const n_sets = Math.floor(n_facility / n_facility_per_set);
  // const n_leftover = n_facility % n_facility_per_set;

  return (
    <Card>
      <CardHeader
        title="Config Setup"
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: "x-large",
        }}
      />
      <CardContent>
        <Stack spacing={2}>
          <AutocompleteFacility
            facility={facility}
            onFacilityChange={setFacility}
          />
          <AutocompleteRecipe
            recipeType={facility.recipe_type}
            recipe={recipe}
            onRecipeChange={handleRecipeChange}
          />
          <AutocompleteSorter
            sorter={sorter}
            onSorterChange={setSorter}
          />
          <Box>
            <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
              <Grid item xs={1}>
                <FieldNumber
                  label="Input flowrate"
                  suffix="/s"
                  minValue={0}
                  maxValue={120}
                  value={inFlow}
                  onValueChange={setInFlow}
                />
              </Grid>
              <Grid item xs={1}>
                <FieldNumber
                  label="Output flowrate"
                  suffix="/s"
                  minValue={0}
                  maxValue={120}
                  value={outFlow}
                  onValueChange={setOutFlow}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
              <Grid item xs={1}>
                <FormControl>
                  <FormLabel>Proliferator Mode</FormLabel>
                  <RadioGroup
                    value={prolifMode}
                    onChange={handleProlifModeChange}
                  >
                    <FormControlLabel
                      value={0}
                      disabled={recipe.speedup_only}
                      control={<Radio />}
                      label="Extra Products"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Production Speedup"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <FormControl>
                  <FormLabel>Proliferator Level</FormLabel>
                  <RadioGroup
                    value={prolifLevel}
                    onChange={handleProlifLevelChange}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="No proliferator"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="1"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="2"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="3"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography
              gutterBottom
              fontWeight="bold"
              fontSize="large"
            >
              Production Targets
            </Typography>
            <Grid container columns={{ xs: 1, sm: 2 }}>
              <Grid item xs={1}>
                <Stack spacing={2}>
                  {Object.entries(products).map((entry) => {
                    const [label, value] = entry;
                    return (
                      <FieldNumber
                        key={label}
                        label={label}
                        suffix="/min"
                        minValue={0}
                        maxValue={Number.MAX_SAFE_INTEGER}
                        value={value}
                        onValueChange={(next_value) => {
                          handleProductChange(label, next_value);
                        }}
                      />
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
