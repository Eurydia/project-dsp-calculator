// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RecipeType } from "../enums";

export interface BOM {
  [key: string]: number;
}

export interface Recipe {
  label: string;
  cycle_time: number;
  material: BOM;
  product: BOM;
  recipe_type: RecipeType;
  speedup_only: boolean;
}
