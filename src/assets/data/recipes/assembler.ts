import { RecipeType } from "../../../enums";
import { Recipe, BOM } from "../../../types";
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
  makeAssemblerRecipe(
    "plane filter",
    12,
    { "casimir crystal": 1, "titanium glass": 2 },
    { "plane fitler": 1 },
  ),
  makeAssemblerRecipe(
    "small carrier rocket",
    6,
    {
      "dyson sphere component": 2,
      "quantum chip": 2,
      "deuterium fuel rod": 4,
    },
    { "small carrier rocket": 1 },
  ),
  makeAssemblerRecipe(
    "plasma exciter",
    2,
    { "prism": 2, "magnetic coil": 4 },
    { "plasma exciter": 1 },
  ),
  makeAssemblerRecipe(
    "super-magnetic ring",
    3,
    { "gtaphite": 1, "electromagnetic turbine": 2, "magnet": 3 },
    { "super-magnetic ring": 1 },
  ),
  makeAssemblerRecipe(
    "particle broadband",
    8,
    { "plastic": 1, "crystal silicon": 2, "carbon nanotube": 2 },
    { "particle broadband": 1 },
  ),
  makeAssemblerRecipe(
    "processor",
    3,
    { "circuit board": 2, "microcrystalline component": 2 },
    { processor: 1 },
  ),
  makeAssemblerRecipe(
    "casimir crystal",
    4,
    { "titanium crystal": 1, "graphene": 2, "hydrogen": 12 },
    { "casimir crystal": 1 },
  ),
  makeAssemblerRecipe(
    "particle container",
    4,
    {
      "electromagnetic turbine": 2,
      "graphene": 2,
      "copper ingot": 2,
    },
    { gear: 1 },
  ),
  makeAssemblerRecipe(
    "annihilation constraint sphere",
    20,
    { "particle container": 1, "processor": 1 },
    { "annihilation coinstraint sphere": 1 },
  ),
  makeAssemblerRecipe(
    "solar sail",
    4,
    { "graphene": 1, "photon combiner": 1 },
    { "solar sail": 2 },
  ),
  makeAssemblerRecipe(
    "frame material",
    6,
    {
      "high-purity silicon": 1,
      "titanium ingot": 1,
      "carbon nanotube": 4,
    },
    { "frame material": 1 },
  ),
  makeAssemblerRecipe(
    "dyson sphere component",
    8,
    { "frame material": 3, "processor": 3, "solar sail": 3 },
    { "dyson sphere component": 1 },
  ),
  makeAssemblerRecipe(
    "photon combiner",
    3,
    { "circuist board": 1, "prism": 2 },
    { "photon combiner": 1 },
  ),
  makeAssemblerRecipe(
    "photon combiner (advanced)",
    3,
    { "circuit board": 1, "optical grating crystal": 1 },
    { "photon combiner": 1 },
  ),
  makeAssemblerRecipe(
    "microcrystalline component",
    2,
    { "copper ingot": 1, "high-purity silicon": 2 },
    { "microcrystalline component": 1 },
  ),
  makeAssemblerRecipe(
    "quantum chip",
    6,
    { "processor": 2, "plane filter": 2 },
    { "quantum chip": 1 },
  ),
  makeAssemblerRecipe(
    "casimir crystal (advanced)",
    4,
    { "graphene": 2, "optical grating crystal": 8, "hydrogen": 12 },
    { "casimir crystal": 1 },
  ),
  makeAssemblerRecipe(
    "particle container (advanced)",
    4,
    { "copper ingot": 2, "unipolar magnet": 10 },
    { "particle container": 1 },
  ),
  makeAssemblerRecipe(
    "space warper",
    10,
    { "graviton lens": 1 },
    { "space warper": 1 },
  ),
  makeAssemblerRecipe(
    "space warper (advanced)",
    10,
    { "gravity matrix": 1 },
    { "space warper": 8 },
  ),
  makeAssemblerRecipe(
    "foundation",
    1,
    { "steel": 1, "stone brick": 3 },
    { foundation: 1 },
  ),
];

export default RECIPES;
