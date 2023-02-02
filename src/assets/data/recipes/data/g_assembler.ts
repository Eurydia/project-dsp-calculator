import { Recipe } from "../recipe";
import { GroupEnumRecipe, ItemEnum } from "../enums";

const makeAssemblerRecipe = (
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
    GroupEnumRecipe.ASSEMBLER,
    speedup_only,
  );
};

export const G_ASSEMBLER: Recipe[] = [
  makeAssemblerRecipe(
    "Proliferator Mk.I",
    0.5,
    { [ItemEnum.COAL]: 1 },
    { [ItemEnum.PROLIFERATOR_ONE]: 1 },
  ),
  makeAssemblerRecipe(
    "Proliferator Mk.II",
    1,
    { [ItemEnum.DIAMOND]: 1, [ItemEnum.PROLIFERATOR_ONE]: 2 },
    { [ItemEnum.PROLIFERATOR_TWO]: 1 },
  ),
  makeAssemblerRecipe(
    "Proliferator Mk.III",
    2,
    { [ItemEnum.CARBON_NANOTUBE]: 1, [ItemEnum.PROLIFERATOR_TWO]: 2 },
    { [ItemEnum.PROLIFERATOR_THREE]: 1 },
  ),
  makeAssemblerRecipe(
    "Magnetic Coil",
    1,
    { [ItemEnum.COPPER_INGOT]: 1, [ItemEnum.IRON_INGOT]: 2 },
    { [ItemEnum.MAGNETIC_COIL]: 2 },
  ),
  makeAssemblerRecipe(
    "Hydrogen Fuel Rod",
    6,
    { [ItemEnum.TITANIUM_INGOT]: 1, [ItemEnum.HYDROGEN]: 10 },
    { [ItemEnum.HYDORGEN_FUEL_ROD]: 2 },
  ),
  makeAssemblerRecipe(
    "Deuterium Fuel Rod",
    12,
    {
      [ItemEnum.TITANIUM_ALLOY]: 1,
      [ItemEnum.SUPER_MAGNETIC_RING]: 1,
      [ItemEnum.DEUTERIUM]: 20,
    },
    { [ItemEnum.DEUTERIUM_FUEL_ROD]: 2 },
  ),
  makeAssemblerRecipe(
    "Antimatter Fuel Rod",
    24,
    {
      [ItemEnum.TITANIUM_ALLOY]: 1,
      [ItemEnum.ANNIHILATION_CONSTRAINT_SPHERE]: 1,
      [ItemEnum.HYDROGEN]: 12,
      [ItemEnum.ANTIMATTER]: 12,
    },
    { [ItemEnum.ANTIMATTER_FUEL_ROD]: 2 },
    true,
  ),
  makeAssemblerRecipe(
    "Magnetic Motor",
    2,
    {
      [ItemEnum.MAGNETIC_COIL]: 1,
      [ItemEnum.GEAR]: 1,
      [ItemEnum.IRON_INGOT]: 2,
    },
    { [ItemEnum.MAGNETIC_MOTOR]: 1 },
  ),
  makeAssemblerRecipe(
    "Crystal Silicon (advanced)",
    1.5,
    { [ItemEnum.FRACTAL_SILICON]: 1 },
    { [ItemEnum.CRYSTAL_SILICON]: 2 },
  ),
  makeAssemblerRecipe(
    "Titanium Glass",
    5,
    {
      [ItemEnum.GLASS]: 2,
      [ItemEnum.WATER]: 2,
      [ItemEnum.TITANIUM_INGOT]: 2,
    },
    { [ItemEnum.TITANIUM_GLASS]: 2 },
  ),
  makeAssemblerRecipe(
    "Prism",
    2,
    { [ItemEnum.GLASS]: 3 },
    { [ItemEnum.PRISM]: 2 },
  ),
  makeAssemblerRecipe(
    "Titanium Crystal",
    4,
    { [ItemEnum.ORGANIC_CRYSTAL]: 1, [ItemEnum.TITANIUM_INGOT]: 3 },
    { [ItemEnum.TITANIUM_CRYSTAL]: 1 },
  ),
  makeAssemblerRecipe(
    "Gear",
    1,
    { [ItemEnum.IRON_INGOT]: 1 },
    { [ItemEnum.GEAR]: 1 },
  ),
  makeAssemblerRecipe(
    "Electromagnetic Turbine",
    2,
    { [ItemEnum.ELECTRIC_MOTOR]: 2, [ItemEnum.MAGNETIC_COIL]: 2 },
    { [ItemEnum.ELECTROMAGNETIC_TURBINE]: 1 },
  ),
  makeAssemblerRecipe(
    "Circuit Board",
    1,
    { [ItemEnum.COPPER_INGOT]: 1, [ItemEnum.IRON_INGOT]: 2 },
    { [ItemEnum.CIRCUIT_BOARD]: 2 },
  ),
  makeAssemblerRecipe(
    "Graviton Lens",
    6,
    { [ItemEnum.STRANGE_MATTER]: 1, [ItemEnum.DIAMOND]: 4 },
    { [ItemEnum.GRAVITON_LENS]: 1 },
  ),
  makeAssemblerRecipe(
    "Plane Filter",
    12,
    { [ItemEnum.CASIMIR_CRYSTAL]: 1, [ItemEnum.TITANIUM_GLASS]: 2 },
    { [ItemEnum.PLANE_FILTER]: 1 },
  ),
  makeAssemblerRecipe(
    "Small Carrier Rocket",
    6,
    {
      [ItemEnum.DYSON_SPHERE_COMPONENT]: 2,
      [ItemEnum.QUANTUM_CHIP]: 2,
      [ItemEnum.DEUTERIUM_FUEL_ROD]: 4,
    },
    { [ItemEnum.SMALL_CARRIER_ROCKET]: 1 },
  ),
  makeAssemblerRecipe(
    "Plasma Exciter",
    2,
    { [ItemEnum.PRISM]: 2, [ItemEnum.MAGNETIC_COIL]: 4 },
    { [ItemEnum.PLASMA_EXCITER]: 1 },
  ),
  makeAssemblerRecipe(
    "Super-Magnetic Ring",
    3,
    {
      [ItemEnum.GRAPHITE]: 1,
      [ItemEnum.ELECTROMAGNETIC_TURBINE]: 2,
      [ItemEnum.MAGNET]: 3,
    },
    { [ItemEnum.SUPER_MAGNETIC_RING]: 1 },
  ),
  makeAssemblerRecipe(
    "Particle Broadband",
    8,
    {
      [ItemEnum.PLASTIC]: 1,
      [ItemEnum.CRYSTAL_SILICON]: 2,
      [ItemEnum.CARBON_NANOTUBE]: 2,
    },
    { [ItemEnum.PARTICLE_BROADBAND]: 1 },
  ),
  makeAssemblerRecipe(
    "Processor",
    3,
    {
      [ItemEnum.CIRCUIT_BOARD]: 2,
      [ItemEnum.MICROCRYSTALLINE_COMPONENT]: 2,
    },
    { [ItemEnum.PROCESSOR]: 1 },
  ),
  makeAssemblerRecipe(
    "Casimir Crystal",
    4,
    {
      [ItemEnum.TITANIUM_CRYSTAL]: 1,
      [ItemEnum.GRAPHENE]: 2,
      [ItemEnum.HYDROGEN]: 12,
    },
    { [ItemEnum.CASIMIR_CRYSTAL]: 1 },
  ),
  makeAssemblerRecipe(
    "Particle Container",
    4,
    {
      [ItemEnum.ELECTROMAGNETIC_TURBINE]: 2,
      [ItemEnum.GRAPHENE]: 2,
      [ItemEnum.COPPER_INGOT]: 2,
    },
    { [ItemEnum.PARTICLE_CONTAINER]: 1 },
  ),
  makeAssemblerRecipe(
    "Annihilation Constraint Sphere",
    20,
    { [ItemEnum.PARTICLE_CONTAINER]: 1, [ItemEnum.PROCESSOR]: 1 },
    { [ItemEnum.ANNIHILATION_CONSTRAINT_SPHERE]: 1 },
  ),
  makeAssemblerRecipe(
    "Solar Sail",
    4,
    { [ItemEnum.GRAPHENE]: 1, [ItemEnum.PHOTON_COMBINER]: 1 },
    { [ItemEnum.SOLAR_SAIL]: 2 },
  ),
  makeAssemblerRecipe(
    "Frame Material",
    6,
    {
      [ItemEnum.HIGH_PURITY_SILICON]: 1,
      [ItemEnum.TITANIUM_INGOT]: 1,
      [ItemEnum.CARBON_NANOTUBE]: 4,
    },
    { [ItemEnum.FRAME_MATERIAL]: 1 },
  ),
  makeAssemblerRecipe(
    "Dyson Sphere Component",
    8,
    {
      [ItemEnum.FRAME_MATERIAL]: 3,
      [ItemEnum.PROCESSOR]: 3,
      [ItemEnum.SOLAR_SAIL]: 3,
    },
    { [ItemEnum.DYSON_SPHERE_COMPONENT]: 1 },
  ),
  makeAssemblerRecipe(
    "Photon Combiner",
    3,
    { [ItemEnum.CIRCUIT_BOARD]: 1, [ItemEnum.PRISM]: 2 },
    { [ItemEnum.PHOTON_COMBINER]: 1 },
  ),
  makeAssemblerRecipe(
    "Photon Combiner (advanced)",
    3,
    {
      [ItemEnum.CIRCUIT_BOARD]: 1,
      [ItemEnum.OPTICAL_GRATING_CRYSTAL]: 1,
    },
    { [ItemEnum.PHOTON_COMBINER]: 1 },
  ),
  makeAssemblerRecipe(
    "Microcrystalline Component",
    2,
    { [ItemEnum.COPPER_INGOT]: 1, [ItemEnum.HIGH_PURITY_SILICON]: 2 },
    { [ItemEnum.MICROCRYSTALLINE_COMPONENT]: 1 },
  ),
  makeAssemblerRecipe(
    "Quantum Chip",
    6,
    { [ItemEnum.PROCESSOR]: 2, [ItemEnum.PLANE_FILTER]: 2 },
    { [ItemEnum.QUANTUM_CHIP]: 1 },
  ),
  makeAssemblerRecipe(
    "Casimir Crystal (advanced)",
    4,
    {
      [ItemEnum.GRAPHENE]: 2,
      [ItemEnum.OPTICAL_GRATING_CRYSTAL]: 8,
      [ItemEnum.HYDROGEN]: 12,
    },
    { [ItemEnum.CASIMIR_CRYSTAL]: 1 },
  ),
  makeAssemblerRecipe(
    "Particle Container (advanced)",
    4,
    { [ItemEnum.COPPER_INGOT]: 2, [ItemEnum.UNIPOLAR_MAGNET]: 10 },
    { [ItemEnum.PARTICLE_CONTAINER]: 1 },
  ),
  makeAssemblerRecipe(
    "Space Warper",
    10,
    { [ItemEnum.GRAVITON_LENS]: 1 },
    { [ItemEnum.SPACE_WARPER]: 1 },
  ),
  makeAssemblerRecipe(
    "Space Warper (advanced)",
    10,
    { [ItemEnum.GRAVITY_MATRIX]: 1 },
    { [ItemEnum.SPACE_WARPER]: 8 },
  ),
  makeAssemblerRecipe(
    "Foundation",
    1,
    { [ItemEnum.STEEL]: 1, [ItemEnum.STONE_BRICK]: 3 },
    { [ItemEnum.FOUNDATION]: 1 },
  ),
];
