import { RecipeType } from "../../enums";
import { Recipe, BOM } from "../../types";
import { makeRecipe } from "./_base";

const makeAssemblerRecipe = (
  label: string,
  cycle_time: number,
  material: BOM,
  product: BOM,
  speedup_only: boolean = false,
): Recipe => {
  return makeRecipe(
    label,
    cycle_time,
    material,
    product,
    RecipeType.ASSEMBLER,
    speedup_only,
  );
};

const RECIPES = [
  makeAssemblerRecipe(
    "proliferator (1)",
    0.5,
    { coal: 1 },
    { "proliferator (1)": 1 },
  ),
  makeAssemblerRecipe(
    "proliferator (2)",
    1,
    { "diamond": 1, "proliferator (1)": 2 },
    { "proliferator (2)": 1 },
  ),
  makeAssemblerRecipe(
    "proliferator (3)",
    2,
    { "carbon nanotube": 1, "proliferator (2)": 2 },
    { "proliferator (3)": 1 },
  ),
  makeAssemblerRecipe(
    "magnetic coil",
    1,
    { "copper ingot": 1, "iron ingot": 2 },
    { "magnetic coil": 2 },
  ),
  makeAssemblerRecipe(
    "hydrogen fuel rod",
    6,
    { "titanium ingot": 1, "hydrogen": 10 },
    { "hydrogen fuel rod": 2 },
  ),
  makeAssemblerRecipe(
    "deuteriumn fuel rod",
    12,
    {
      "titanium alloy": 1,
      "super-magnetic ring": 1,
      "deuterium": 20,
    },
    { "deuterium fuel rod": 2 },
  ),
  makeAssemblerRecipe(
    "antimatter fuel rod",
    24,
    {
      "titanium alloy": 1,
      "annihilation constraint sphere": 1,
      "hydrogen": 12,
      "anitmatter": 12,
    },
    { "antimatter fuel rod": 2 },
    true,
  ),
  makeAssemblerRecipe(
    "magnetic motor",
    2,
    { "magnetic coil": 1, "gear": 1, "iron ingot": 2 },
    { "magnetic motor": 1 },
  ),
  makeAssemblerRecipe(
    "crystal silicon (advanced)",
    1.5,
    { "fractal silicon": 1 },
    { "crystal silicon": 2 },
  ),
  makeAssemblerRecipe(
    "titanium glass",
    5,
    { "glass": 2, "water": 2, "titanium ingot": 2 },
    { "titanium glass": 2 },
  ),
  makeAssemblerRecipe("prism", 2, { glass: 3 }, { prism: 2 }),
  makeAssemblerRecipe(
    "titanium crystal",
    4,
    { "organic crystal": 1, "titanium ingot": 3 },
    { "titanium crystal": 1 },
  ),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe(
    "electromagnetic turbine",
    2,
    { "electric motor": 2, "magnetic coil": 2 },
    { "electromagnetic turbine": 1 },
  ),
  makeAssemblerRecipe(
    "circuit board",
    1,
    { "copper ingot": 1, "iron ingot": 2 },
    { "circuit board": 2 },
  ),
  makeAssemblerRecipe(
    "graviton lens",
    6,
    { "strange matter": 1, "diamond": 4 },
    { "graviton lens": 1 },
  ),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
  makeAssemblerRecipe("gear", 1, { "iron ingot": 1 }, { gear: 1 }),
];

export default RECIPES;
