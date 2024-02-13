import {
	RecipeType,
	recipeRegister,
} from "./recipe.mts";
import { Ingredient } from "assets/ingredient.mts";

recipeRegister(
	"Proliferator Mk.I",
	0.5,
	{ [Ingredient.COAL]: 1 },
	{ [Ingredient.PROLIFERATOR_MK_I]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Proliferator Mk.II",
	1,
	{
		[Ingredient.DIAMOND]: 1,
		[Ingredient.PROLIFERATOR_MK_I]: 2,
	},
	{ [Ingredient.PROLIFERATOR_MK_II]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Proliferator Mk.III",
	2,
	{
		[Ingredient.CARBON_NANOTUBE]: 1,
		[Ingredient.PROLIFERATOR_MK_II]: 2,
	},
	{ [Ingredient.PROLIFERATOR_MK_III]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Magnum Ammo Box",
	1,
	{
		[Ingredient.COPPER_INGOT]: 3,
	},
	{ [Ingredient.MAGNUM_AMMO_BOX]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Missile Set",
	2,
	{
		[Ingredient.ENGINE]: 1,
		[Ingredient.COMBUSTIBLE_UNIT]: 2,
		[Ingredient.CIRCUIT_BOARD]: 3,
		[Ingredient.COPPER_INGOT]: 6,
	},
	{
		[Ingredient.MISSILE_SET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Magnetic Coil",
	1,
	{
		[Ingredient.COPPER_INGOT]: 1,
		[Ingredient.IRON_INGOT]: 2,
	},
	{ [Ingredient.MAGNETIC_COIL]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Combustible Unit",
	3,
	{ [Ingredient.COAL]: 3 },
	{ [Ingredient.COMBUSTIBLE_UNIT]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Titanium Ammo Box",
	2,
	{
		[Ingredient.MAGNUM_AMMO_BOX]: 1,
		[Ingredient.TITANIUM_INGOT]: 2,
	},
	{ [Ingredient.TITANIUM_AMMO_BOX]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Supersonic Missile Set",
	4,
	{
		[Ingredient.THRUSTER]: 2,
		[Ingredient.MISSILE_SET]: 2,
		[Ingredient.EXPLOSIVE_UNIT]: 4,
		[Ingredient.PROCESSOR]: 4,
	},
	{ [Ingredient.SUPERSONIC_MISSILE_SET]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Electric Motor",
	2,
	{
		[Ingredient.MAGNETIC_COIL]: 1,
		[Ingredient.GEAR]: 1,
		[Ingredient.IRON_INGOT]: 2,
	},
	{ [Ingredient.ELECTRIC_MOTOR]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Crystal Silicon (advanced)",
	1.5,
	{ [Ingredient.FRACTAL_SILICON]: 1 },
	{ [Ingredient.CRYSTAL_SILICON]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Titanium Glass",
	5,
	{
		[Ingredient.GLASS]: 2,
		[Ingredient.WATER]: 2,
		[Ingredient.TITANIUM_INGOT]: 2,
	},
	{ [Ingredient.TITANIUM_GLASS]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Prism",
	2,
	{ [Ingredient.GLASS]: 3 },
	{ [Ingredient.PRISM]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Titanium Crystal",
	4,
	{
		[Ingredient.ORGANIC_CRYSTAL]: 1,
		[Ingredient.TITANIUM_INGOT]: 3,
	},
	{ [Ingredient.TITANIUM_CRYSTAL]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Organic Crystal (original)",
	6,
	{
		[Ingredient.WATER]: 10,
		[Ingredient.LOG]: 20,
		[Ingredient.PLANT_FUEL]: 30,
	},
	{
		[Ingredient.ORGANIC_CRYSTAL]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Engine",
	3,
	{
		[Ingredient.MAGNETIC_COIL]: 1,
		[Ingredient.COPPER_INGOT]: 2,
	},
	{ [Ingredient.ENGINE]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Thruster",
	4,
	{
		[Ingredient.STEEL]: 2,
		[Ingredient.COPPER_INGOT]: 3,
	},
	{ [Ingredient.THRUSTER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Reinforced Thruster",
	6,
	{
		[Ingredient.TITANIUM_ALLOY]: 5,
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 5,
	},
	{ [Ingredient.THRUSTER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Superalloy Ammo Box",
	3,
	{
		[Ingredient.TITANIUM_AMMO_BOX]: 1,
		[Ingredient.TITANIUM_ALLOY]: 2,
	},
	{ [Ingredient.SUPERALLOY_AMMO_BOX]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Gravity Missile Set",
	6,
	{
		[Ingredient.SUPERSONIC_MISSILE_SET]: 3,
		[Ingredient.STRANGE_MATTER]: 3,
		[Ingredient.CRYSTAL_EXPLOSIVE_UNIT]: 6,
	},
	{ [Ingredient.GRAVITY_MISSILE_SET]: 3 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Gear",
	1,
	{ [Ingredient.IRON_INGOT]: 1 },
	{ [Ingredient.GEAR]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Electromagnetic Turbine",
	2,
	{
		[Ingredient.ELECTRIC_MOTOR]: 2,
		[Ingredient.MAGNETIC_COIL]: 2,
	},
	{ [Ingredient.ELECTROMAGNETIC_TURBINE]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Circuit Board",
	1,
	{
		[Ingredient.COPPER_INGOT]: 1,
		[Ingredient.IRON_INGOT]: 2,
	},
	{ [Ingredient.CIRCUIT_BOARD]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Graviton Lens",
	6,
	{
		[Ingredient.STRANGE_MATTER]: 1,
		[Ingredient.DIAMOND]: 4,
	},
	{ [Ingredient.GRAVITON_LENS]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Logistics Bot",
	2,
	{
		[Ingredient.ENGINE]: 1,
		[Ingredient.PROCESSOR]: 1,
		[Ingredient.IRON_INGOT]: 2,
	},
	{ [Ingredient.LOGISTICS_BOT]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Logistics Drone",
	4,
	{
		[Ingredient.PROCESSOR]: 2,
		[Ingredient.THRUSTER]: 2,
		[Ingredient.IRON_INGOT]: 5,
	},
	{ [Ingredient.LOGISTICS_DRONE]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Logistics Vessel",
	6,
	{
		[Ingredient.REINFORCED_THRUSTER]: 2,
		[Ingredient.TITANIUM_ALLOY]: 10,
		[Ingredient.PROCESSOR]: 10,
	},
	{ [Ingredient.LOGISTICS_VESSEL]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Plasma Capsule",
	2,
	{
		[Ingredient.GRAPHENE]: 1,
		[Ingredient.MAGNET]: 2,
		[Ingredient.DEUTERIUM]: 10,
	},
	{ [Ingredient.PLASMA_CAPSULE]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Shell Set",
	1.5,
	{
		[Ingredient.COMBUSTIBLE_UNIT]: 2,
		[Ingredient.COPPER_INGOT]: 9,
	},
	{ [Ingredient.SHELL_SET]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Plasma Exciter",
	2,
	{
		[Ingredient.PRISM]: 2,
		[Ingredient.MAGNETIC_COIL]: 4,
	},
	{ [Ingredient.PLASMA_EXCITER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Super-magnetic Ring",
	3,
	{
		[Ingredient.ENERGETIC_GRAPHITE]: 1,
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 2,
		[Ingredient.MAGNET]: 3,
	},
	{ [Ingredient.SUPER_MAGNETIC_RING]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Particle Broadband",
	8,
	{
		[Ingredient.PLASTIC]: 1,
		[Ingredient.CRYSTAL_SILICON]: 2,
		[Ingredient.CARBON_NANOTUBE]: 2,
	},
	{ [Ingredient.PARTICLE_BROADBAND]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Processor",
	3,
	{
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.MICROCRYSTALLINE_COMPONENT]: 2,
	},
	{ [Ingredient.PROCESSOR]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Casimir Crystal",
	4,
	{
		[Ingredient.TITANIUM_CRYSTAL]: 1,
		[Ingredient.GRAPHENE]: 2,
		[Ingredient.HYDROGEN]: 12,
	},
	{ [Ingredient.CASIMIR_CRYSTAL]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Particle Container",
	4,
	{
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 2,
		[Ingredient.GRAPHENE]: 2,
		[Ingredient.COPPER_INGOT]: 2,
	},
	{ [Ingredient.PARTICLE_CONTAINER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Solar Sail",
	4,
	{
		[Ingredient.GRAPHENE]: 1,
		[Ingredient.PHOTON_COMBINER]: 1,
	},
	{ [Ingredient.SOLAR_SAIL]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Frame Material",
	6,
	{
		[Ingredient.HIGH_PURITY_SILICON]: 1,
		[Ingredient.TITANIUM_ALLOY]: 1,
		[Ingredient.CARBON_NANOTUBE]: 4,
	},
	{ [Ingredient.FRAME_MATERIAL]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Dyson Sphere Component",
	8,
	{
		[Ingredient.FRAME_MATERIAL]: 3,
		[Ingredient.PROCESSOR]: 3,
		[Ingredient.SOLAR_SAIL]: 3,
	},
	{ [Ingredient.DYSON_SPHERE_COMPONENT]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Small Carrier Rocket",
	6,
	{
		[Ingredient.DYSON_SPHERE_COMPONENT]: 2,
		[Ingredient.QUANTUM_CHIP]: 2,
		[Ingredient.DEUTERON_FUEL_ROD]: 4,
	},
	{ [Ingredient.SMALL_CARRIER_ROCKET]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Antimatter Capsule",
	2,
	{
		[Ingredient.PLASMA_CAPSULE]: 1,
		[Ingredient.PARTICLE_CONTAINER]: 1,
		[Ingredient.HYDROGEN]: 10,
		[Ingredient.ANTIMATTER]: 10,
	},
	{ [Ingredient.ANTIMATTER_CAPSULE]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"High-explosive Shell Set",
	3,
	{
		[Ingredient.SHELL_SET]: 1,
		[Ingredient.EXPLOSIVE_UNIT]: 2,
		[Ingredient.TITANIUM_INGOT]: 6,
	},
	{ [Ingredient.HIGH_EXPLOSIVE_SHELL_SET]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Photon Combiner",
	3,
	{
		[Ingredient.CIRCUIT_BOARD]: 1,
		[Ingredient.PRISM]: 2,
	},
	{ [Ingredient.PHOTON_COMBINER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Photon Combiner (advanced)",
	3,
	{
		[Ingredient.CIRCUIT_BOARD]: 1,
		[Ingredient.GRATING_CRYSTAL]: 1,
	},
	{ [Ingredient.PHOTON_COMBINER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Microcrystalline Component",
	2,
	{
		[Ingredient.COPPER_INGOT]: 1,
		[Ingredient.HIGH_PURITY_SILICON]: 2,
	},
	{
		[Ingredient.MICROCRYSTALLINE_COMPONENT]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Quantum Chip",
	6,
	{
		[Ingredient.PROCESSOR]: 2,
		[Ingredient.PLANE_FILTER]: 2,
	},
	{ [Ingredient.QUANTUM_CHIP]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Casimir Crystal (advanced)",
	4,
	{
		[Ingredient.GRAPHENE]: 2,
		[Ingredient.GRATING_CRYSTAL]: 8,
		[Ingredient.HYDROGEN]: 12,
	},
	{ [Ingredient.CASIMIR_CRYSTAL]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Particle Container (advanced)",
	4,
	{
		[Ingredient.COPPER_INGOT]: 2,
		[Ingredient.UNIPOLAR_MAGNET]: 10,
	},
	{ [Ingredient.PARTICLE_CONTAINER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Plane Filter",
	12,
	{
		[Ingredient.CASIMIR_CRYSTAL]: 1,
		[Ingredient.TITANIUM_GLASS]: 2,
	},
	{ [Ingredient.PLANE_FILTER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Annihilation Constraint Sphere",
	20,
	{
		[Ingredient.PARTICLE_CONTAINER]: 1,
		[Ingredient.PROCESSOR]: 1,
	},
	{
		[Ingredient.ANNIHILATION_CONSTRAINT_SPHERE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Hydrogen Fuel Rod",
	6,
	{
		[Ingredient.TITANIUM_INGOT]: 1,
		[Ingredient.HYDROGEN]: 10,
	},
	{ [Ingredient.HYDORGEN_FUEL_ROD]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Deuteron Fuel Rod",
	12,
	{
		[Ingredient.TITANIUM_ALLOY]: 1,
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.DEUTERIUM]: 20,
	},
	{ [Ingredient.DEUTERON_FUEL_ROD]: 2 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Antimatter Fuel Rod",
	24,
	{
		[Ingredient.TITANIUM_ALLOY]: 1,
		[Ingredient.ANNIHILATION_CONSTRAINT_SPHERE]: 1,
		[Ingredient.HYDROGEN]: 12,
		[Ingredient.ANTIMATTER]: 12,
	},
	{ [Ingredient.ANTIMATTER_FUEL_ROD]: 2 },
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Strange Annihilation Fuel Rod",
	32,
	{
		[Ingredient.FRAME_MATERIAL]: 1,
		[Ingredient.CORE_ELEMENT]: 1,
		[Ingredient.STRANGE_MATTER]: 2,
		[Ingredient.ANTIMATTER_FUEL_ROD]: 8,
	},
	{
		[Ingredient.STRANGE_ANNIHILATION_FUEL_ROD]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Jamming Capsule",
	2,
	{
		[Ingredient.PLASMA_EXCITER]: 1,
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 1,
		[Ingredient.HYDROGEN]: 3,
	},
	{
		[Ingredient.JAMMING_CAPSULE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Crystal Shell Set",
	6,
	{
		[Ingredient.HIGH_EXPLOSIVE_SHELL_SET]: 1,
		[Ingredient.CRYSTAL_EXPLOSIVE_UNIT]: 2,
		[Ingredient.TITANIUM_ALLOY]: 3,
	},
	{
		[Ingredient.CRYSTAL_SHELL_SET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Prototype",
	2,
	{
		[Ingredient.PLASMA_EXCITER]: 1,
		[Ingredient.ENGINE]: 1,
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.IRON_INGOT]: 3,
	},
	{
		[Ingredient.PROTOTYPE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Precision Drone",
	4,
	{
		[Ingredient.PROTOTYPE]: 1,
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 1,
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.PHOTON_COMBINER]: 2,
	},
	{
		[Ingredient.PRECISION_DRONE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Attack Drone",
	4,
	{
		[Ingredient.PROTOTYPE]: 1,
		[Ingredient.PARTICLE_CONTAINER]: 1,
		[Ingredient.PROCESSOR]: 1,
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 1,
	},
	{
		[Ingredient.ATTACK_DRONE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Corvette",
	5,
	{
		[Ingredient.REINFORCED_THRUSTER]: 1,
		[Ingredient.PROCESSOR]: 2,
		[Ingredient.PARTICLE_CONTAINER]: 3,
		[Ingredient.TITANIUM_ALLOY]: 5,
	},
	{
		[Ingredient.CORVETTE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Destroyer",
	8,
	{
		[Ingredient.STRANGE_MATTER]: 1,
		[Ingredient.PROCESSOR]: 4,
		[Ingredient.REINFORCED_THRUSTER]: 4,
		[Ingredient.FRAME_MATERIAL]: 20,
	},
	{
		[Ingredient.DESTROYER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Space Warper",
	10,
	{ [Ingredient.GRAVITON_LENS]: 1 },
	{ [Ingredient.SPACE_WARPER]: 1 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Space Warper (advanced)",
	10,
	{ [Ingredient.GRAVITY_MATRIX]: 1 },
	{ [Ingredient.SPACE_WARPER]: 8 },
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Suppressing Capsule",
	8,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.TITANIUM_GLASS]: 2,
		[Ingredient.JAMMING_CAPSULE]: 2,
	},
	{
		[Ingredient.SUPPRESSING_CAPSULE]: 2,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Foundation",
	1,
	{
		[Ingredient.STEEL]: 1,
		[Ingredient.STONE_BRICK]: 3,
	},
	{ [Ingredient.FOUNDATION]: 1 },
	RecipeType.ASSEMBLER,
);

// building recipes
recipeRegister(
	"Tesla Tower",
	1,
	{
		[Ingredient.IRON_INGOT]: 2,
		[Ingredient.MAGNETIC_COIL]: 1,
	},
	{
		[Ingredient.TESLA_TOWER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Wireless Power Tower",
	3,
	{
		[Ingredient.TESLA_TOWER]: 1,
		[Ingredient.PLASMA_EXCITER]: 3,
	},
	{
		[Ingredient.WIRELESS_POWER_TOWER]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Satellite Substation",
	5,
	{
		[Ingredient.WIRELESS_POWER_TOWER]: 1,
		[Ingredient.FRAME_MATERIAL]: 2,
		[Ingredient.SUPER_MAGNETIC_RING]: 10,
	},
	{
		[Ingredient.SATELLITE_SUBSTATION]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Wind Turbine",
	4,
	{
		[Ingredient.GEAR]: 1,
		[Ingredient.MAGNETIC_COIL]: 3,
		[Ingredient.IRON_INGOT]: 6,
	},
	{
		[Ingredient.WIND_TURBINE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Thermal Power Plant",
	5,
	{
		[Ingredient.STONE_BRICK]: 4,
		[Ingredient.GEAR]: 4,
		[Ingredient.MAGNETIC_COIL]: 4,
		[Ingredient.IRON_INGOT]: 10,
	},
	{
		[Ingredient.THERMAL_POWER_PLANT]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Solar Panel",
	6,
	{
		[Ingredient.CIRCUIT_BOARD]: 5,
		[Ingredient.COPPER_INGOT]: 10,
		[Ingredient.HIGH_PURITY_SILICON]: 10,
	},
	{
		[Ingredient.SOLAR_PANEL]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Accumulator",
	3,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.CRYSTAL_SILICON]: 3,
		[Ingredient.IRON_INGOT]: 6,
	},
	{
		[Ingredient.ACCUMULATOR]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Geothermal Power Station",
	6,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.PHOTON_COMBINER]: 4,
		[Ingredient.STEEL]: 15,
		[Ingredient.COPPER_INGOT]: 20,
	},
	{
		[Ingredient.GEOTHERMAL_POWER_STATION]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Mini Fusion Power Plant",
	10,
	{
		[Ingredient.PROCESSOR]: 4,
		[Ingredient.CARBON_NANOTUBE]: 8,
		[Ingredient.SUPER_MAGNETIC_RING]: 10,
		[Ingredient.TITANIUM_ALLOY]: 12,
	},
	{
		[Ingredient.MINI_FUSION_POWER_PLANT]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Energy Exchanger",
	15,
	{
		[Ingredient.PARTICLE_CONTAINER]: 8,
		[Ingredient.TITANIUM_ALLOY]: 40,
		[Ingredient.STEEL]: 40,
		[Ingredient.PROCESSOR]: 40,
	},
	{
		[Ingredient.ENERGY_EXCHANGER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Ray Receiver",
	8,
	{
		[Ingredient.PROCESSOR]: 5,
		[Ingredient.PHOTON_COMBINER]: 10,
		[Ingredient.STEEL]: 20,
		[Ingredient.HIGH_PURITY_SILICON]: 20,
		[Ingredient.SUPER_MAGNETIC_RING]: 20,
	},
	{
		[Ingredient.RAY_RECEIVER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Artificial Star",
	30,
	{
		[Ingredient.ANNIHILATION_CONSTRAINT_SPHERE]: 10,
		[Ingredient.QUANTUM_CHIP]: 10,
		[Ingredient.TITANIUM_ALLOY]: 20,
		[Ingredient.FRAME_MATERIAL]: 20,
	},
	{
		[Ingredient.ARTIFICIAL_STAR]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Conveyor Belt MK.I",
	1,
	{
		[Ingredient.GEAR]: 1,
		[Ingredient.IRON_INGOT]: 2,
	},
	{
		[Ingredient.CONVEYOR_BELT_MK_I]: 3,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Conveyor Belt MK.II",
	1,
	{
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 1,
		[Ingredient.CONVEYOR_BELT_MK_I]: 3,
	},
	{
		[Ingredient.CONVEYOR_BELT_MK_II]: 3,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Conveyor Belt MK.III",
	1,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.GRAPHENE]: 1,
		[Ingredient.CONVEYOR_BELT_MK_II]: 3,
	},
	{
		[Ingredient.CONVEYOR_BELT_MK_III]: 3,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Splitter",
	2,
	{
		[Ingredient.CIRCUIT_BOARD]: 1,
		[Ingredient.GEAR]: 2,
		[Ingredient.IRON_INGOT]: 3,
	},
	{
		[Ingredient.SPLITTER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Automatic Piler",
	4,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.PROCESSOR]: 2,
		[Ingredient.STEEL]: 3,
		[Ingredient.GEAR]: 4,
	},
	{
		[Ingredient.AUTOMATIC_PILER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Traffic Monitor",
	2,
	{
		[Ingredient.GLASS]: 1,
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.GEAR]: 2,
		[Ingredient.IRON_INGOT]: 3,
	},
	{
		[Ingredient.TRAFFIC_MONITOR]: 1,
	},
	RecipeType.ASSEMBLER,
);

recipeRegister(
	"Spray Coater",
	3,
	{
		[Ingredient.MICROCRYSTALLINE_COMPONENT]: 2,
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.PLASMA_EXCITER]: 2,
		[Ingredient.STEEL]: 4,
	},
	{
		[Ingredient.SPRAY_COATER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Storage Mk.I",
	2,
	{
		[Ingredient.IRON_INGOT]: 4,
		[Ingredient.STONE_BRICK]: 4,
	},
	{
		[Ingredient.STORAGE_MK_I]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Storage Mk.II",
	4,
	{
		[Ingredient.STEEL]: 8,
		[Ingredient.STONE_BRICK]: 8,
	},
	{
		[Ingredient.STORAGE_MK_II]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Storage Tank",
	2,
	{
		[Ingredient.STONE_BRICK]: 4,
		[Ingredient.GLASS]: 4,
		[Ingredient.IRON_INGOT]: 8,
	},
	{
		[Ingredient.STORAGE_TANK]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Logistics Distributor",
	8,
	{
		[Ingredient.PLASMA_EXCITER]: 4,
		[Ingredient.PROCESSOR]: 4,
		[Ingredient.IRON_INGOT]: 8,
	},
	{
		[Ingredient.LOGISTICS_DISTRIBUTOR]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Planetary Logistics Station",
	20,
	{
		[Ingredient.PARTICLE_CONTAINER]: 20,
		[Ingredient.STEEL]: 40,
		[Ingredient.TITANIUM_INGOT]: 40,
		[Ingredient.PROCESSOR]: 40,
	},
	{
		[Ingredient.PLANETARY_LOGISTICS_SYSTEM]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Interstellar Logistics Station",
	30,
	{
		[Ingredient.PLANETARY_LOGISTICS_SYSTEM]: 1,
		[Ingredient.PARTICLE_CONTAINER]: 20,
		[Ingredient.TITANIUM_INGOT]: 40,
	},
	{
		[Ingredient.INTERSTELLAR_LOGISTICS_SYSTEM]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Orbital Collector",
	30,
	{
		[Ingredient.INTERSTELLAR_LOGISTICS_SYSTEM]: 1,
		[Ingredient.REINFORCED_THRUSTER]: 20,
		[Ingredient.ACCUMULATOR_FULL]: 20,
		[Ingredient.SUPER_MAGNETIC_RING]: 50,
	},
	{
		[Ingredient.ORBITAL_COLLECTOR]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Sorter Mk.I",
	1,
	{
		[Ingredient.IRON_INGOT]: 1,
		[Ingredient.CIRCUIT_BOARD]: 1,
	},
	{
		[Ingredient.SORTER_MK_I]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Sorter Mk.II",
	1,
	{
		[Ingredient.ELECTRIC_MOTOR]: 1,
		[Ingredient.SORTER_MK_I]: 2,
	},
	{
		[Ingredient.SORTER_MK_II]: 2,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Sorter Mk.III",
	1,
	{
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 1,
		[Ingredient.SORTER_MK_II]: 2,
	},
	{
		[Ingredient.SORTER_MK_III]: 2,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Pile Sorter",
	1,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 1,
		[Ingredient.PROCESSOR]: 1,
		[Ingredient.SORTER_MK_III]: 2,
	},
	{
		[Ingredient.PILE_SORTER]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Mining Machine",
	3,
	{
		[Ingredient.GEAR]: 2,
		[Ingredient.MAGNETIC_COIL]: 2,
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.IRON_INGOT]: 4,
	},
	{
		[Ingredient.MINING_MACHINE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Advanced Mining Machine",
	20,
	{
		[Ingredient.QUANTUM_CHIP]: 4,
		[Ingredient.SUPER_MAGNETIC_RING]: 10,
		[Ingredient.FRAME_MATERIAL]: 10,
		[Ingredient.TITANIUM_ALLOY]: 20,
		[Ingredient.GRATING_CRYSTAL]: 40,
	},
	{
		[Ingredient.ADVANCED_MINING_MACHINE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Water Pump",
	4,
	{
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.ELECTRIC_MOTOR]: 4,
		[Ingredient.STONE_BRICK]: 4,
		[Ingredient.IRON_INGOT]: 8,
	},
	{
		[Ingredient.WATER_PUMP]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Oil Extractor",
	8,
	{
		[Ingredient.PLASMA_EXCITER]: 4,
		[Ingredient.CIRCUIT_BOARD]: 6,
		[Ingredient.STEEL]: 12,
		[Ingredient.STONE_BRICK]: 12,
	},
	{
		[Ingredient.OIL_EXTRACTOR]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Oil Refinery",
	6,
	{
		[Ingredient.CIRCUIT_BOARD]: 6,
		[Ingredient.PLASMA_EXCITER]: 6,
		[Ingredient.STEEL]: 10,
		[Ingredient.STONE_BRICK]: 10,
	},
	{
		[Ingredient.OIL_REFINERY]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Fractionator",
	3,
	{
		[Ingredient.PROCESSOR]: 1,
		[Ingredient.GLASS]: 4,
		[Ingredient.STONE_BRICK]: 4,
		[Ingredient.STEEL]: 8,
	},
	{
		[Ingredient.FRACTIONATOR]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Chemical Plant",
	5,
	{
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.STEEL]: 8,
		[Ingredient.STONE_BRICK]: 8,
		[Ingredient.GLASS]: 8,
	},
	{
		[Ingredient.CHEMICAL_PLANT]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Quantum Chemical Plant",
	10,
	{
		[Ingredient.CHEMICAL_PLANT]: 1,
		[Ingredient.STRANGE_MATTER]: 3,
		[Ingredient.QUANTUM_CHIP]: 3,
		[Ingredient.TITANIUM_GLASS]: 10,
	},
	{
		[Ingredient.QUANTUM_CHEMICAL_PLANT]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Miniature Particle Collider",
	15,
	{
		[Ingredient.PROCESSOR]: 8,
		[Ingredient.GRAPHENE]: 10,
		[Ingredient.TITANIUM_ALLOY]: 20,
		[Ingredient.FRAME_MATERIAL]: 20,
		[Ingredient.SUPER_MAGNETIC_RING]: 25,
	},
	{
		[Ingredient.MINIATURE_PARTICLE_COLLIDER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Arc Smelter",
	3,
	{
		[Ingredient.STONE_BRICK]: 2,
		[Ingredient.MAGNETIC_COIL]: 2,
		[Ingredient.IRON_INGOT]: 4,
		[Ingredient.CIRCUIT_BOARD]: 4,
	},
	{
		[Ingredient.ARC_SMELTER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Plane Smelter",
	5,
	{
		[Ingredient.ARC_SMELTER]: 1,
		[Ingredient.PLANE_FILTER]: 4,
		[Ingredient.FRAME_MATERIAL]: 5,
		[Ingredient.UNIPOLAR_MAGNET]: 15,
	},
	{
		[Ingredient.PLANE_SMELTER]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Negentropy Smelter",
	6,
	{
		[Ingredient.PLANE_SMELTER]: 1,
		[Ingredient.QUANTUM_CHIP]: 4,
		[Ingredient.NEGENTROPY_SINGULARITY]: 10,
		[Ingredient.ENERGY_SHARD]: 30,
	},
	{
		[Ingredient.NEGENTROPY_SMELTER]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Assembling Machine Mk.I",
	2,
	{
		[Ingredient.IRON_INGOT]: 4,
		[Ingredient.CIRCUIT_BOARD]: 4,
		[Ingredient.GEAR]: 8,
	},
	{
		[Ingredient.ASSEMBLING_MACHINE_MK_I]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Assembling Machine Mk.II",
	3,
	{
		[Ingredient.ASSEMBLING_MACHINE_MK_I]: 1,
		[Ingredient.PROCESSOR]: 4,
		[Ingredient.GRAPHENE]: 8,
	},
	{
		[Ingredient.ASSEMBLING_MACHINE_MK_II]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Assembling Machine Mk.III",
	4,
	{
		[Ingredient.ASSEMBLING_MACHINE_MK_II]: 1,
		[Ingredient.QUANTUM_CHIP]: 2,
		[Ingredient.PARTICLE_BROADBAND]: 8,
	},
	{
		[Ingredient.ASSEMBLING_MACHINE_MK_III]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Re-composing Assembler",
	5,
	{
		[Ingredient.ASSEMBLING_MACHINE_MK_III]: 1,
		[Ingredient.QUANTUM_CHIP]: 4,
		[Ingredient.NEGENTROPY_SINGULARITY]: 10,
		[Ingredient.ENERGY_SHARD]: 30,
	},
	{
		[Ingredient.RE_COMPOSING_ASSMEBLER]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"Matrix Lab",
	3,
	{
		[Ingredient.GLASS]: 4,
		[Ingredient.CIRCUIT_BOARD]: 4,
		[Ingredient.MAGNETIC_COIL]: 4,
		[Ingredient.IRON_INGOT]: 8,
	},
	{
		[Ingredient.MATRIX_LAB]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Self-evolution Lab",
	4,
	{
		[Ingredient.MATRIX_LAB]: 1,
		[Ingredient.QUANTUM_CHIP]: 4,
		[Ingredient.SILICON_BASED_NEURON]: 10,
		[Ingredient.DARK_FOG_MATRIX]: 20,
	},
	{
		[Ingredient.SELF_EVOLUTION_LAB]: 1,
	},
	RecipeType.ASSEMBLER,
	true,
);
recipeRegister(
	"EM-Rail Ejector",
	6,
	{
		[Ingredient.PROCESSOR]: 5,
		[Ingredient.SUPER_MAGNETIC_RING]: 10,
		[Ingredient.STEEL]: 20,
		[Ingredient.GEAR]: 20,
	},
	{
		[Ingredient.EM_RAIL_EJECTOR]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Vertical Launching Silo",
	30,
	{
		[Ingredient.QUANTUM_CHIP]: 10,
		[Ingredient.GRAVITON_LENS]: 20,
		[Ingredient.FRAME_MATERIAL]: 30,
		[Ingredient.TITANIUM_ALLOY]: 80,
	},
	{
		[Ingredient.VERTICAL_LAUNCHING_SILO]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Gauss Turret",
	4,
	{
		[Ingredient.CIRCUIT_BOARD]: 2,
		[Ingredient.MAGNETIC_COIL]: 4,
		[Ingredient.IRON_INGOT]: 8,
		[Ingredient.GEAR]: 8,
	},
	{
		[Ingredient.GAUSS_TURRET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Missile Turret",
	6,
	{
		[Ingredient.ELECTRIC_MOTOR]: 6,
		[Ingredient.ENGINE]: 6,
		[Ingredient.STEEL]: 8,
		[Ingredient.CIRCUIT_BOARD]: 12,
	},
	{
		[Ingredient.MISSLE_TURRET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Implosion Cannon",
	5,
	{
		[Ingredient.SUPER_MAGNETIC_RING]: 2,
		[Ingredient.ELECTRIC_MOTOR]: 8,
		[Ingredient.STEEL]: 10,
		[Ingredient.CIRCUIT_BOARD]: 10,
	},
	{
		[Ingredient.IMPLOSION_CANNON]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Laser Turret",
	6,
	{
		[Ingredient.PLASMA_EXCITER]: 6,
		[Ingredient.CIRCUIT_BOARD]: 6,
		[Ingredient.PHOTON_COMBINER]: 9,
		[Ingredient.STEEL]: 9,
	},
	{
		[Ingredient.LASER_TURRET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Plasma Turret",
	10,
	{
		[Ingredient.PROCESSOR]: 5,
		[Ingredient.PLASMA_EXCITER]: 5,
		[Ingredient.SUPER_MAGNETIC_RING]: 10,
		[Ingredient.TITANIUM_GLASS]: 10,
		[Ingredient.TITANIUM_ALLOY]: 20,
	},
	{
		[Ingredient.PLASMA_TURRET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"SR Plasma Turret",
	6,
	{
		[Ingredient.PROCESSOR]: 5,
		[Ingredient.PLASMA_EXCITER]: 5,
		[Ingredient.SUPER_MAGNETIC_RING]: 5,
		[Ingredient.STEEL]: 15,
	},
	{
		[Ingredient.SR_PLASMA_TURRET]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Battlefield Analysis Base",
	6,
	{
		[Ingredient.MICROCRYSTALLINE_COMPONENT]: 6,
		[Ingredient.ENGINE]: 12,
		[Ingredient.STEEL]: 12,
		[Ingredient.CIRCUIT_BOARD]: 18,
	},
	{
		[Ingredient.BATTLEFIELD_ANALYSIS_BASE]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Jammer Tower",
	6,
	{
		[Ingredient.PROCESSOR]: 3,
		[Ingredient.DIAMOND]: 6,
		[Ingredient.PLASMA_EXCITER]: 9,
		[Ingredient.COPPER_INGOT]: 12,
	},
	{
		[Ingredient.JAMMER_TOWER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Signal Tower",
	6,
	{
		[Ingredient.WIRELESS_POWER_TOWER]: 2,
		[Ingredient.CRYSTAL_SILICON]: 6,
		[Ingredient.STEEL]: 12,
	},
	{
		[Ingredient.SIGNAL_TOWER]: 1,
	},
	RecipeType.ASSEMBLER,
);
recipeRegister(
	"Planetary Shield Generator",
	10,
	{
		[Ingredient.PARTICLE_CONTAINER]: 5,
		[Ingredient.SUPER_MAGNETIC_RING]: 5,
		[Ingredient.ELECTROMAGNETIC_TURBINE]: 20,
		[Ingredient.STEEL]: 20,
	},
	{
		[Ingredient.PLANETARY_SHIELD_GENERATOR]: 1,
	},
	RecipeType.ASSEMBLER,
);
