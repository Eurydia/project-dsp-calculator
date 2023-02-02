import { Recipe } from "../recipe";
import { RecipeEnum, ItemEnum } from "../enums";

const makeParticleRecipe = (
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
    RecipeEnum.PARTICLE_COLLIDER,
    speedup_only,
  );
};

export const G_PARTICLE: Recipe[] = [
  makeParticleRecipe(
    "Strange Matter",
    8,
    {
      [ItemEnum.PARTICLE_CONTAINER]: 2,
      [ItemEnum.IRON_INGOT]: 2,
      [ItemEnum.DEUTERIUM]: 10,
    },
    { [ItemEnum.STRANGE_MATTER]: 1 },
  ),
  makeParticleRecipe(
    "Deuterium",
    2.5,
    { [ItemEnum.HYDROGEN]: 10 },
    { [ItemEnum.DEUTERIUM]: 5 },
    true,
  ),
  makeParticleRecipe(
    "Antimatter",
    2,
    { [ItemEnum.CRITICAL_PHOTON]: 2 },
    { [ItemEnum.HYDROGEN]: 2, [ItemEnum.ANTIMATTER]: 2 },
    true,
  ),
];
