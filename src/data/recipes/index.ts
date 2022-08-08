// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ASSEMBLER_RECIPE from "./assembler";
import SMELTING_RECIPES from "./smelting";

const RECIPES = [...SMELTING_RECIPES, ...ASSEMBLER_RECIPE];

export default RECIPES;
