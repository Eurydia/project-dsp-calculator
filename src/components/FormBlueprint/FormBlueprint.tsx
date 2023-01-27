import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
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

import { Recipe } from "../../assets";
import {
  getCyclesPerMinute,
  getMaxFacility,
  getMaxFacilitySatisfy,
} from "./helper";
import { Proliferator, ProliferatorMode } from "../../types";
import { FlagContext } from "../../contexts";
import { FormProductionTargets } from "../FormProductionTargets";
import { FormProliferator } from "../FormProliferator";
import { ViewSummary } from "../ViewSummary";

type FormBlueprintProps = {};
export const FormBlueprint: FC<FormBlueprintProps> = (props) => {
  const { flags } = useContext(FlagContext);

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

  const [targets, setTargets] = useState(
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
      setTargets((_) => {
        const next: { [K: string]: number } = {};
        for (const label of Object.keys(next_recipe.products)) {
          next[label] = 0;
        }
        return next;
      });
    },
    [],
  );

  const handleTargetChange = useCallback(
    (label: string, next_value: number): void => {
      setTargets((prev) => {
        const next = { ...prev };
        next[label] = next_value;
        return next;
      });
    },
    [],
  );

  const proliferator = useMemo((): Proliferator => {
    return {
      level: prolifLevel,
      mode:
        prolifMode === 0
          ? ProliferatorMode.EXTRA_PRODUCTS
          : ProliferatorMode.EXTRA_SPEED,
    };
  }, [prolifLevel, prolifMode]);

  const cycles_per_minute: number = useMemo((): number => {
    return getCyclesPerMinute(facility, recipe, proliferator);
  }, [facility, recipe, proliferator]);

  const facility_max = useMemo((): number => {
    return getMaxFacility(
      cycles_per_minute,
      recipe,
      inFlow * 60,
      outFlow * 60,
      flags,
    );
  }, [cycles_per_minute, recipe, inFlow, outFlow, flags]);

  const facility_needed = useMemo((): number => {
    if (
      Object.values(targets).every((value) => {
        return value === 0;
      })
    ) {
      return 0;
    }
    return getMaxFacilitySatisfy(targets, recipe, facility_max);
  }, [recipe, targets, facility_max]);

  return (
    <Paper>
      <Box padding={2}>
        <Stack spacing={3}>
          <Box>
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
            </Stack>
          </Box>
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
          <FormProliferator
            mode={prolifMode}
            level={prolifLevel}
            disableExtraProduct={recipe.speedup_only}
            onModeChange={setProlifMode}
            onLevelChange={setProlifLevel}
          />
          <FormProductionTargets
            targets={targets}
            onTargetChange={handleTargetChange}
          />

          <ViewSummary
            facilityMax={facility_max}
            facilityNeeded={facility_needed}
          />
        </Stack>
      </Box>
    </Paper>
  );
};
