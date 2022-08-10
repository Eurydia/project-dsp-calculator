// Copyright (c) 2022 Eurydia
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RecipeType } from "./enums";

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

export interface Sorter {
  label: string;
  work_consumption: number;
  idle_consumption: number;
}

export interface Proliferator {
  product_multiplier: number;
  cycle_multiplier: number;
  work_consumption_multiplier: number;
}
