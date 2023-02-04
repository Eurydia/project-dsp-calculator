import { FC } from "react";
import { Box, Grid } from "@mui/material";

import { Facility, Recipe } from "../../assets";

import { AutocompleteFacility } from "../AutocompleteFacility";
import { AutocompleteRecipe } from "../AutocompleteRecipe";

type FormRecipeProps = {
  facility: Facility;
  recipe: Recipe;
  onFacilityChange: (next_facility: Facility) => void;
  onRecipeChange: (next_recipe: Recipe) => void;
};
export const FormRecipe: FC<FormRecipeProps> = (props) => {
  const { facility, recipe, onFacilityChange, onRecipeChange } =
    props;

  const { recipe_type } = facility;

  // const [demands, setDemands] = useState(
  //   (): { [K: string]: number } => {
  //     const state: { [K: string]: number } = {};
  //     for (const label of Object.keys(recipe.products)) {
  //       state[label] = 0;
  //     }
  //     return state;
  //   },
  // );

  // const handleTargetChange = (
  //   label: string,
  //   next_value: number,
  // ): void => {
  //   setDemands((prev) => {
  //     const next = { ...prev };
  //     next[label] = next_value;
  //     return next;
  //   });
  // };

  // const {
  //   speed_multiplier: prolifSpeedMultiplier,
  //   product_multiplier: prolifProductMultiplier,
  //   power_multiplier: prolifPowerMultiplier,
  // } = useMemo(() => {
  //   return Proliferator.getMultiplier({
  //     level: prolifLevel,
  //     mode:
  //       prolifMode === 0
  //         ? ProliferatorMode.EXTRA_PRODUCTS
  //         : ProliferatorMode.EXTRA_SPEED,
  //   });
  // }, [prolifLevel, prolifMode]);

  // const cycles_per_minute = ((): number => {
  //   const { cycle_time } = recipe;
  //   const { speedup_multiplier } = facility;
  //   return (
  //     (60 / cycle_time) * speedup_multiplier * prolifSpeedMultiplier
  //   );
  // })();

  // const facility_max_supportable = ((): number => {
  //   const { materials, products } = recipe;

  //   const input_supportable: number = getSupportableFacility(
  //     inFlow * 60,
  //     Math.max(...Object.values(materials)) * cycles_per_minute,
  //     flags,
  //   );

  //   const output_supportable: number = getSupportableFacility(
  //     outFlow * 60,
  //     Math.max(...Object.values(products)) *
  //       cycles_per_minute *
  //       prolifProductMultiplier,
  //     flags,
  //   );

  //   const supportable: number = Math.min(
  //     input_supportable,
  //     output_supportable,
  //   );
  //   if (
  //     flags.preferEven &&
  //     supportable > 0 &&
  //     supportable % 2 === 1
  //   ) {
  //     return supportable - 1;
  //   }
  //   return supportable;
  // })();

  // const facility_needed = ((): number => {
  //   if (Object.values(demands).every((value) => value === 0)) {
  //     return 0;
  //   }
  //   const { products: ratios } = recipe;
  //   return Math.max(
  //     ...Object.keys(demands).map((key) => {
  //       return Math.ceil(
  //         demands[key] /
  //           (ratios[key] *
  //             cycles_per_minute *
  //             prolifProductMultiplier),
  //       );
  //     }),
  //   );
  // })();

  // const consumptionIdle = ((): number => {
  //   const { idle_consumption: f } = facility;

  //   const f_consumption = f * facility_needed;
  //   if (!flags.accountForSortersConsumption) {
  //     return f_consumption;
  //   }
  //   const { idle_consumption: s } = sorter;
  //   const { products, materials } = recipe;
  //   const s_count =
  //     Object.keys(materials).length + Object.keys(products).length;
  //   const s_consumption = s_count * s;

  //   return s_consumption + f_consumption;
  // })();

  // const consumptionWork = ((): number => {
  //   const { work_consumption: f } = facility;

  //   const f_consumption = f * prolifPowerMultiplier * facility_needed;
  //   if (!flags.accountForSortersConsumption) {
  //     return f_consumption;
  //   }

  //   const { work_consumption: s } = sorter;
  //   const { products, materials } = recipe;
  //   const s_count =
  //     Object.keys(materials).length + Object.keys(products).length;
  //   const s_consumption = s * s_count;

  //   return f_consumption + s_consumption;
  // })();

  // const billMaterial = ((): { [K: string]: number } => {
  //   const bill: { [K: string]: number } = {};
  //   Object.entries(recipe.materials).map((entry) => {
  //     const [key, value] = entry;
  //     bill[key] = value * facility_needed * cycles_per_minute;
  //   });
  //   return bill;
  // })();

  // const billProduct = ((): { [K: string]: number } => {
  //   const bill: { [K: string]: number } = {};
  //   Object.entries(recipe.products).map((entry) => {
  //     const [key, value] = entry;
  //     bill[key] =
  //       value *
  //       facility_needed *
  //       cycles_per_minute *
  //       prolifProductMultiplier;
  //   });
  //   return bill;
  // })();

  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        <Grid item xs={1} sm={2}>
          <AutocompleteFacility
            facility={facility}
            onFacilityChange={onFacilityChange}
          />
        </Grid>
        <Grid item xs={1} sm={2}>
          <AutocompleteRecipe
            recipeType={recipe_type}
            recipe={recipe}
            onRecipeChange={onRecipeChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
