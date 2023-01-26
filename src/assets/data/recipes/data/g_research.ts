import { Recipe } from "../recipe";
import { GroupEnumRecipe, ItemEnum } from "../GroupEnums";

const makeResearchRecipe = (
  label: string,
  cycle_time: number,
  materials: { [K: string]: number },
  products: { [K: string]: number },
  speedup_only: boolean = false,
): Recipe => {
  return Recipe.create(
    label,
    cycle_time,
    materials,
    products,
    GroupEnumRecipe.RESEARCH_FACILITY,
    speedup_only,
  );
};

export const G_RESEARCH: Recipe[] = [
  makeResearchRecipe(
    "Electromagnetic Matrix",
    3,
    { [ItemEnum.CIRCUIT_BOARD]: 1, [ItemEnum.MAGNETIC_COIL]: 1 },
    { [ItemEnum.ELECTROMAGNETIC_MATRIX]: 1 },
  ),
  makeResearchRecipe(
    "Energy Matrix",
    6,
    { [ItemEnum.HYDROGEN]: 2, [ItemEnum.GRAPHITE]: 2 },
    { [ItemEnum.ENERGY_MATRIX]: 1 },
  ),
  makeResearchRecipe(
    "Structure Matrix",
    8,
    { [ItemEnum.DIAMOND]: 1, [ItemEnum.TITANIUM_CRYSTAL]: 1 },
    { [ItemEnum.STRUCTURE_MATRIX]: 1 },
  ),
  makeResearchRecipe(
    "Information Matrix",
    10,
    { [ItemEnum.PARTICLE_BROADBAND]: 1, [ItemEnum.PROCESSOR]: 2 },
    { [ItemEnum.INFORMATION_MATRIX]: 1 },
  ),
  makeResearchRecipe(
    "Gravity Matrix",
    10,
    { [ItemEnum.GRAVITON_LENS]: 1, [ItemEnum.QUANTUM_CHIP]: 1 },
    { [ItemEnum.GRAVITY_MATRIX]: 2 },
  ),
  makeResearchRecipe(
    "Universe Matrix",
    15,
    {
      [ItemEnum.ELECTROMAGNETIC_MATRIX]: 1,
      [ItemEnum.ENERGY_MATRIX]: 1,
      [ItemEnum.STRUCTURE_MATRIX]: 1,
      [ItemEnum.INFORMATION_MATRIX]: 1,
      [ItemEnum.GRAVITY_MATRIX]: 1,
      [ItemEnum.ANTIMATTER]: 1,
    },
    { [ItemEnum.UNIVERSE_MATRIX]: 1 },
  ),
];
