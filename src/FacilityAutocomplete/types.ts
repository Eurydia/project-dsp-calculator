// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RecipeType } from "../enums";

export interface Facility {
  label: string;
  cycle_multiplier: number;
  /**
   * Working power draw in MW.
   */
  work_consumption: number;
  /**
   * Idle power draw in MW.
   */
  idle_consumption: number;
  recipe_type: RecipeType;
}
