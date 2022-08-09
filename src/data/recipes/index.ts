// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Recipe } from "../../types";
import SMELTING_RECIPES from "./smelting";
import ASSEMBLER_RECIPE from "./assembler";
import REFINING_RECIPES from "./refining";
import CHEMICAL_RECIPES from "./chemical";

const sortByAlphabet = (a: Recipe, b: Recipe): number => {
  if (a.label > b.label) {
    return 1;
  } else if (a.label < b.label) {
    return -1;
  }
  return 0;
};

const RECIPES = [
  ...SMELTING_RECIPES.sort(sortByAlphabet),
  ...ASSEMBLER_RECIPE.sort(sortByAlphabet),
  ...REFINING_RECIPES.sort(sortByAlphabet),
  ...CHEMICAL_RECIPES.sort(sortByAlphabet),
];

export default RECIPES;
