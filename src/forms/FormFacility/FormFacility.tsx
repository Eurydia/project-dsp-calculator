import { Box, Stack, useMediaQuery } from "@mui/material";
import { FC, useMemo } from "react";
import { Facility, GroupEnumRecipe } from "../../assets";
import {
  AutocompleteFacility,
  AutocompleteRecipe,
  AutocompleteSorter,
  useFacility,
  useRecipe,
  useSorter,
} from "../../components";

type FormFacilityProps = {};
export const FormFacility: FC<FormFacilityProps> = (props) => {
  const { facility, setFacility } = useFacility("facilitty");
  const { recipe, setRecipe } = useRecipe("recipe");
  const { sorter, setSorter } = useSorter("sorter");

  const recipe_type = useMemo((): GroupEnumRecipe => {
    return facility.recipe_type;
  }, [facility]);

  return (
    <Box>
      <Stack spacing={1}>
        <AutocompleteFacility
          facility={facility}
          onFacilityChange={setFacility}
        />
        <AutocompleteRecipe
          recipeType={recipe_type}
          recipe={recipe}
          onRecipeChange={setRecipe}
        />
        <AutocompleteSorter
          sorter={sorter}
          onSorterChange={setSorter}
        />
      </Stack>
    </Box>
  );
};
