import { Recipe, RecipeEnum, ItemEnum } from "../../types";

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
    RecipeEnum.ASSEMBLER,
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
  makeAssemblerRecipe(
    "Thruster",
    4,
    {
      [ItemEnum.STEEL]: 2,
      [ItemEnum.COPPER_INGOT]: 1,
    },
    { [ItemEnum.THRUSTER]: 1 },
  ),
  makeAssemblerRecipe(
    "Reinforced Thruster",
    6,
    {
      [ItemEnum.TITANIUM_ALLOY]: 5,
      [ItemEnum.ELECTROMAGNETIC_TURBINE]: 5,
    },
    { [ItemEnum.THRUSTER]: 1 },
  ),
  makeAssemblerRecipe(
    "Logistics Bot",
    2,
    {
      [ItemEnum.IRON_INGOT]: 2,
      [ItemEnum.ELECTROMAGNETIC_TURBINE]: 1,
      [ItemEnum.PROCESSOR]: 1,
    },
    { [ItemEnum.LOGISTICS_BOT]: 1 },
  ),
  makeAssemblerRecipe(
    "Logistics Drone",
    4,
    {
      [ItemEnum.IRON_INGOT]: 5,
      [ItemEnum.PROCESSOR]: 2,
      [ItemEnum.THRUSTER]: 2,
    },
    { [ItemEnum.LOGISTICS_DRONE]: 1 },
  ),
  makeAssemblerRecipe(
    "Logistics Vessel",
    6,
    {
      [ItemEnum.TITANIUM_ALLOY]: 10,
      [ItemEnum.PROCESSOR]: 10,
      [ItemEnum.REINFORCED_THRUSTER]: 2,
    },
    { [ItemEnum.LOGISTICS_VESSEL]: 1 },
  ),

  // building recipes
  makeAssemblerRecipe(
    "Tesla Tower",
    1,
    {
      [ItemEnum.IRON_INGOT]: 2,
      [ItemEnum.MAGNETIC_COIL]: 1,
    },
    {
      [ItemEnum.TESLA_TOWER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Wireless Power Tower",
    3,
    {
      [ItemEnum.PLASMA_EXCITER]: 3,
      [ItemEnum.TESLA_TOWER]: 1,
    },
    {
      [ItemEnum.WIRELESS_POWER_TOWER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Satellite Substation",
    5,
    {
      [ItemEnum.SUPER_MAGNETIC_RING]: 10,
      [ItemEnum.FRAME_MATERIAL]: 2,
      [ItemEnum.WIRELESS_POWER_TOWER]: 1,
    },
    {
      [ItemEnum.SATELLITE_SUBSTATION]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Wind Turbine",
    4,
    {
      [ItemEnum.IRON_INGOT]: 6,
      [ItemEnum.MAGNETIC_COIL]: 3,
      [ItemEnum.GEAR]: 1,
    },
    {
      [ItemEnum.WIND_TURBINE]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Thermal Power Plant",
    5,
    {
      [ItemEnum.IRON_INGOT]: 10,
      [ItemEnum.STONE_BRICK]: 4,
      [ItemEnum.GEAR]: 4,
      [ItemEnum.MAGNETIC_COIL]: 4,
    },
    {
      [ItemEnum.THERMAL_POWER_PLANT]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Geothermal Power Station",
    6,
    {
      [ItemEnum.COPPER_INGOT]: 20,
      [ItemEnum.STEEL]: 15,
      [ItemEnum.PHOTON_COMBINER]: 4,
      [ItemEnum.SUPER_MAGNETIC_RING]: 1,
    },
    {
      [ItemEnum.GEOTHERMAL_POWER_STATION]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Mini Fusion Power Plant",
    10,
    {
      [ItemEnum.TITANIUM_ALLOY]: 12,
      [ItemEnum.SUPER_MAGNETIC_RING]: 10,
      [ItemEnum.CARBON_NANOTUBE]: 8,
      [ItemEnum.PROCESSOR]: 4,
    },
    {
      [ItemEnum.MINI_FUSION_POWER_PLANT]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Energy Exchanger",
    15,
    {
      [ItemEnum.TITANIUM_ALLOY]: 40,
      [ItemEnum.STEEL]: 40,
      [ItemEnum.PROCESSOR]: 40,
      [ItemEnum.PARTICLE_CONTAINER]: 8,
    },
    {
      [ItemEnum.ENERGY_EXCHANGER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Ray Receiver",
    8,
    {
      [ItemEnum.STEEL]: 20,
      [ItemEnum.HIGH_PURITY_SILICON]: 20,
      [ItemEnum.SUPER_MAGNETIC_RING]: 20,
      [ItemEnum.PHOTON_COMBINER]: 10,
      [ItemEnum.PROCESSOR]: 5,
    },
    {
      [ItemEnum.RAY_RECEIVER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Artificial Star",
    30,
    {
      [ItemEnum.TITANIUM_ALLOY]: 20,
      [ItemEnum.FRAME_MATERIAL]: 20,
      [ItemEnum.ANNIHILATION_CONSTRAINT_SPHERE]: 10,
      [ItemEnum.QUANTUM_CHIP]: 10,
    },
    {
      [ItemEnum.ARTIFICIAL_STAR]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Conveyor Belt MK.I",
    1,
    {
      [ItemEnum.IRON_INGOT]: 2,
      [ItemEnum.GEAR]: 1,
    },
    {
      [ItemEnum.CONVEYOR_BELT_MK_I]: 3,
    },
  ),
  makeAssemblerRecipe(
    "Conveyor Belt MK.II",
    1,
    {
      [ItemEnum.CONVEYOR_BELT_MK_I]: 3,
      [ItemEnum.ELECTROMAGNETIC_TURBINE]: 1,
    },
    {
      [ItemEnum.CONVEYOR_BELT_MK_II]: 3,
    },
  ),
  makeAssemblerRecipe(
    "Conveyor Belt MK.III",
    1,
    {
      [ItemEnum.CONVEYOR_BELT_MK_II]: 3,
      [ItemEnum.SUPER_MAGNETIC_RING]: 1,
      [ItemEnum.GRAPHENE]: 1,
    },
    {
      [ItemEnum.CONVEYOR_BELT_MK_III]: 3,
    },
  ),
  makeAssemblerRecipe(
    "Splitter",
    2,
    {
      [ItemEnum.IRON_INGOT]: 3,
      [ItemEnum.GEAR]: 2,
      [ItemEnum.CIRCUIT_BOARD]: 1,
    },
    {
      [ItemEnum.SPLITTER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Automatic Piler",
    4,
    {
      [ItemEnum.GEAR]: 4,
      [ItemEnum.STEEL]: 3,
      [ItemEnum.PROCESSOR]: 2,
      [ItemEnum.SUPER_MAGNETIC_RING]: 1,
    },
    {
      [ItemEnum.AUTOMATIC_PILER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Storage Mk.I",
    2,
    {
      [ItemEnum.IRON_INGOT]: 4,
      [ItemEnum.STONE_BRICK]: 4,
    },
    {
      [ItemEnum.STORAGE_MK_I]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Storage Mk.II",
    4,
    {
      [ItemEnum.STEEL]: 8,
      [ItemEnum.STONE_BRICK]: 8,
    },
    {
      [ItemEnum.STORAGE_MK_II]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Storage Tank",
    2,
    {
      [ItemEnum.IRON_INGOT]: 8,
      [ItemEnum.STONE_BRICK]: 4,
      [ItemEnum.GLASS]: 4,
    },
    {
      [ItemEnum.STORAGE_TANK]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Logistics Distributor",
    8,
    {
      [ItemEnum.IRON_INGOT]: 8,
      [ItemEnum.PLASMA_EXCITER]: 4,
      [ItemEnum.PROCESSOR]: 4,
    },
    {
      [ItemEnum.LOGISTICS_DISTRIBUTOR]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Planetary Logistics Station",
    20,
    {
      [ItemEnum.STEEL]: 40,
      [ItemEnum.TITANIUM_INGOT]: 40,
      [ItemEnum.PROCESSOR]: 40,
      [ItemEnum.PARTICLE_CONTAINER]: 20,
    },
    {
      [ItemEnum.PLANETARY_LOGISTICS_SYSTEM]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Interstellar Logistics Station",
    30,
    {
      [ItemEnum.TITANIUM_INGOT]: 40,
      [ItemEnum.PARTICLE_CONTAINER]: 20,
      [ItemEnum.PLANETARY_LOGISTICS_SYSTEM]: 1,
    },
    {
      [ItemEnum.INTERSTELLAR_LOGISTICS_SYSTEM]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Orbital Collector",
    30,
    {
      [ItemEnum.INTERSTELLAR_LOGISTICS_SYSTEM]: 1,
      [ItemEnum.SUPER_MAGNETIC_RING]: 50,
      [ItemEnum.REINFORCED_THRUSTER]: 20,
      [ItemEnum.ACCUMULATOR_FULL]: 20,
    },
    {
      [ItemEnum.ORBITAL_COLLECTOR]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Sorter Mk.I",
    1,
    {
      [ItemEnum.IRON_INGOT]: 1,
      [ItemEnum.CIRCUIT_BOARD]: 1,
    },
    {
      [ItemEnum.SORTER_MK_I]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Sorter Mk.II",
    1,
    {
      [ItemEnum.SORTER_MK_I]: 2,
      [ItemEnum.ELECTRIC_MOTOR]: 1,
    },
    {
      [ItemEnum.SORTER_MK_II]: 2,
    },
  ),
  makeAssemblerRecipe(
    "Sorter Mk.III",
    1,
    {
      [ItemEnum.SORTER_MK_II]: 2,
      [ItemEnum.ELECTROMAGNETIC_TURBINE]: 1,
    },
    {
      [ItemEnum.SORTER_MK_III]: 2,
    },
  ),
  makeAssemblerRecipe(
    "Traffic Monitor",
    2,
    {
      [ItemEnum.IRON_INGOT]: 3,
      [ItemEnum.GEAR]: 2,
      [ItemEnum.CIRCUIT_BOARD]: 2,
      [ItemEnum.GLASS]: 1,
    },
    {
      [ItemEnum.TRAFFIC_MONITOR]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Mining Machine",
    3,
    {
      [ItemEnum.IRON_INGOT]: 4,
      [ItemEnum.CIRCUIT_BOARD]: 2,
      [ItemEnum.GEAR]: 2,
      [ItemEnum.MAGNETIC_COIL]: 2,
    },
    {
      [ItemEnum.MINING_MACHINE]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Advanced Mining Machine",
    20,
    {
      [ItemEnum.OPTICAL_GRATING_CRYSTAL]: 40,
      [ItemEnum.TITANIUM_ALLOY]: 20,
      [ItemEnum.FRAME_MATERIAL]: 10,
      [ItemEnum.SUPER_MAGNETIC_RING]: 10,
      [ItemEnum.QUANTUM_CHIP]: 4,
    },
    {
      [ItemEnum.ADVANCED_MINING_MACHINE]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Water Pump",
    4,
    {
      [ItemEnum.IRON_INGOT]: 8,
      [ItemEnum.STONE_BRICK]: 4,
      [ItemEnum.ELECTRIC_MOTOR]: 4,
      [ItemEnum.CIRCUIT_BOARD]: 2,
    },
    {
      [ItemEnum.WATER_PUMP]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Oil Extractor",
    8,
    {
      [ItemEnum.STEEL]: 12,
      [ItemEnum.STONE_BRICK]: 12,
      [ItemEnum.CIRCUIT_BOARD]: 6,
      [ItemEnum.PLASMA_EXCITER]: 4,
    },
    {
      [ItemEnum.OIL_EXTRACTOR]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Oil Refinery",
    6,
    {
      [ItemEnum.STEEL]: 10,
      [ItemEnum.STONE_BRICK]: 10,
      [ItemEnum.CIRCUIT_BOARD]: 6,
      [ItemEnum.PLASMA_EXCITER]: 6,
    },
    {
      [ItemEnum.OIL_REFINERY]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Miniature Particle Collider",
    15,
    {
      [ItemEnum.SUPER_MAGNETIC_RING]: 25,
      [ItemEnum.TITANIUM_ALLOY]: 20,
      [ItemEnum.FRAME_MATERIAL]: 20,
      [ItemEnum.GRAPHENE]: 10,
      [ItemEnum.PROCESSOR]: 8,
    },
    {
      [ItemEnum.MINIATURE_PARTICLE_COLLIDER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "EM-Rail Ejector",
    6,
    {
      [ItemEnum.STEEL]: 20,
      [ItemEnum.GEAR]: 20,
      [ItemEnum.SUPER_MAGNETIC_RING]: 10,
      [ItemEnum.PROCESSOR]: 5,
    },
    {
      [ItemEnum.EM_RAIL_EJECTOR]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Vertical Launching Silo",
    30,
    {
      [ItemEnum.TITANIUM_ALLOY]: 80,
      [ItemEnum.FRAME_MATERIAL]: 30,
      [ItemEnum.GRAVITON_LENS]: 20,
      [ItemEnum.QUANTUM_CHIP]: 10,
    },
    {
      [ItemEnum.VERTICAL_LAUNCHING_SILO]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Assembling Machine Mk.I",
    2,
    {
      [ItemEnum.GEAR]: 8,
      [ItemEnum.IRON_INGOT]: 4,
      [ItemEnum.CIRCUIT_BOARD]: 4,
    },
    {
      [ItemEnum.ASSEMBLING_MACHINE_MK_I]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Assembling Machine Mk.II",
    3,
    {
      [ItemEnum.GRAPHENE]: 8,
      [ItemEnum.PROCESSOR]: 4,
      [ItemEnum.ASSEMBLING_MACHINE_MK_I]: 1,
    },
    {
      [ItemEnum.ASSEMBLING_MACHINE_MK_II]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Assembling Machine Mk.III",
    4,
    {
      [ItemEnum.PARTICLE_BROADBAND]: 8,
      [ItemEnum.QUANTUM_CHIP]: 2,
      [ItemEnum.ASSEMBLING_MACHINE_MK_II]: 1,
    },
    {
      [ItemEnum.ASSEMBLING_MACHINE_MK_III]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Arc Smelter",
    3,
    {
      [ItemEnum.IRON_INGOT]: 4,
      [ItemEnum.CIRCUIT_BOARD]: 4,
      [ItemEnum.STONE_BRICK]: 2,
      [ItemEnum.MAGNETIC_COIL]: 2,
    },
    {
      [ItemEnum.ARC_SMELTER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Plane Smelter",
    5,
    {
      [ItemEnum.UNIPOLAR_MAGNET]: 15,
      [ItemEnum.FRAME_MATERIAL]: 5,
      [ItemEnum.PLANE_FILTER]: 4,
      [ItemEnum.ARC_SMELTER]: 1,
    },
    {
      [ItemEnum.PLANE_SMELTER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Matrix Lab",
    3,
    {
      [ItemEnum.IRON_INGOT]: 8,
      [ItemEnum.GLASS]: 4,
      [ItemEnum.CIRCUIT_BOARD]: 4,
      [ItemEnum.MAGNETIC_COIL]: 4,
    },
    {
      [ItemEnum.MATRIX_LAB]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Spray Coater",
    3,
    {
      [ItemEnum.STEEL]: 4,
      [ItemEnum.MICROCRYSTALLINE_COMPONENT]: 4,
      [ItemEnum.PLASMA_EXCITER]: 2,
      [ItemEnum.CIRCUIT_BOARD]: 2,
    },
    {
      [ItemEnum.SPRAY_COATER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Fractioner",
    3,
    {
      [ItemEnum.STEEL]: 8,
      [ItemEnum.STONE_BRICK]: 4,
      [ItemEnum.GLASS]: 4,
      [ItemEnum.PROCESSOR]: 1,
    },
    {
      [ItemEnum.FRACTIONER]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Chemical Plant",
    5,
    {
      [ItemEnum.STEEL]: 8,
      [ItemEnum.STONE_BRICK]: 8,
      [ItemEnum.GLASS]: 8,
      [ItemEnum.CIRCUIT_BOARD]: 2,
    },
    {
      [ItemEnum.CHEMICAL_PLANT]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Quantum Chemical Plant",
    10,
    {
      [ItemEnum.TITANIUM_GLASS]: 10,
      [ItemEnum.QUANTUM_CHIP]: 3,
      [ItemEnum.STRANGE_MATTER]: 3,
      [ItemEnum.CHEMICAL_PLANT]: 1,
    },
    {
      [ItemEnum.QUANTUM_CHEMICAL_PLANT]: 1,
    },
  ),
  makeAssemblerRecipe(
    "Accumulator",
    5,
    {
      [ItemEnum.IRON_INGOT]: 6,
      [ItemEnum.CRYSTAL_SILICON]: 6,
      [ItemEnum.SUPER_MAGNETIC_RING]: 1,
    },
    {
      [ItemEnum.ACCUMULATOR]: 1,
    },
  ),
];