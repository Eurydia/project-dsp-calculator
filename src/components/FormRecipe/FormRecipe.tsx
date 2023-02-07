import { FC } from "react";
import { Box, Grid } from "@mui/material";

import { Facility, Proliferator, Recipe } from "../../assets";

import { AutocompleteFacility } from "../AutocompleteFacility";
import { AutocompleteRecipe } from "../AutocompleteRecipe";
import { AutocompleteProliferator } from "../AutocompleteProliferator";

type FormRecipeProps = {
  facility: Facility;
  recipe: Recipe;
  proliferator: Proliferator;

  onFacilityChange: (next_facility: Facility) => void;
  onRecipeChange: (next_recipe: Recipe) => void;
  onProliferatorChange: (next_proliferator: Proliferator) => void;
};
export const FormRecipe: FC<FormRecipeProps> = (props) => {
  const {
    facility,
    recipe,
    proliferator,
    onFacilityChange,
    onRecipeChange,
    onProliferatorChange,
  } = props;

  const { recipe_type } = facility;

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
        <Grid item xs={2}>
          <AutocompleteProliferator
            disableExtraProducts={recipe.speedup_only}
            proliferator={proliferator}
            onProliferatorChange={onProliferatorChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
