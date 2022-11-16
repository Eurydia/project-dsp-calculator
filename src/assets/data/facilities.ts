import { RecipeType } from "../../enums";
import { Facility } from "../../types";

const FACILITIES: Facility[] = [
  {
    label: "arc smelter",
    speedup_multiplier: 1,
    work_consumption: 0.36,
    idle_consumption: 0.012,
    recipe_type: RecipeType.SMELTING_FACILITY,
  },
  {
    label: "plane smelter",
    speedup_multiplier: 2,
    work_consumption: 1.44,
    idle_consumption: 0.048,
    recipe_type: RecipeType.SMELTING_FACILITY,
  },
  {
    label: "assembler mk. 1",
    speedup_multiplier: 0.75,
    work_consumption: 0.27,
    idle_consumption: 0.012,
    recipe_type: RecipeType.ASSEMBLER,
  },
  {
    label: "assembler mk. 2",
    speedup_multiplier: 1,
    work_consumption: 0.54,
    idle_consumption: 0.015,
    recipe_type: RecipeType.ASSEMBLER,
  },
  {
    label: "assembler mk. 3",
    speedup_multiplier: 1.5,
    work_consumption: 1.08,
    idle_consumption: 0.018,
    recipe_type: RecipeType.ASSEMBLER,
  },
  {
    label: "oil refinery",
    speedup_multiplier: 1,
    work_consumption: 0.96,
    idle_consumption: 0.024,
    recipe_type: RecipeType.REFINING_FACILITY,
  },
  {
    label: "chemical plant",
    speedup_multiplier: 1,
    work_consumption: 0.72,
    idle_consumption: 0.024,
    recipe_type: RecipeType.CHEMICAL_FACILITY,
  },
  {
    label: "quantum chemical plant",
    speedup_multiplier: 2,
    work_consumption: 2.16,
    idle_consumption: 0.036,
    recipe_type: RecipeType.CHEMICAL_FACILITY,
  },
  {
    label: "miniature particle collider",
    speedup_multiplier: 1,
    work_consumption: 12,
    idle_consumption: 0.12,
    recipe_type: RecipeType.PARTICLE_COLLIDER,
  },
  {
    label: "matrix lab",
    speedup_multiplier: 1,
    work_consumption: 0.48,
    idle_consumption: 0.012,
    recipe_type: RecipeType.RESEARCH_FACILITY,
  },
];

export default FACILITIES;
