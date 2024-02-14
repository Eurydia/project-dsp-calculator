export enum Ingredient {
	DEBUG = "DEBUG",

	//  Natural Resources
	IRON_ORE = "Iron Ore",
	COPPER_ORE = "Copper Ore",
	SILICON_ORE = "Silicon Ore",
	TITANIUM_ORE = "Titanium Ore",
	STONE = "Stone",
	COAL = "Coal",
	WATER = "Water",
	CRUDE_OIL = "Crude Oil",
	// Natural Resources (Rare)
	KIMBERLITE_ORE = "Kimberlite Ore",
	FRACTAL_SILICON = "Fractal Silicon",
	GRATING_CRYSTAL = "Grating Crystal",
	STALAGMITE_CRYSTAL = "Stalagmite Crystal",
	UNIPOLAR_MAGNET = "Unipolar Magnet",
	FIRE_ICE = "Fire Ice",
	LOG = "Log",
	PLANT_FUEL = "Plant Fuel",

	// Materials
	HYDROGEN = "Hydrogen",
	DEUTERIUM = "Deuterium",
	ANTIMATTER = "Antimatter",
	IRON_INGOT = "Iron Ingot",
	COPPER_INGOT = "Copper Ingot",
	STONE_BRICK = "Stone Brick",
	ENERGETIC_GRAPHITE = "Energetic Graphite",
	HIGH_PURITY_SILICON = "High-Purity Silicon",
	TITANIUM_INGOT = "Titanium Ingot",
	SULFURIC_ACID = "Sulfuric Acid",
	REFINED_OIL = "Refined Oil",
	CRITICAL_PHOTON = "Critical Photon",
	MAGNET = "Magnet",
	GLASS = "Glass",
	DIAMOND = "Diamond",
	CRYSTAL_SILICON = "Crystal Silicon",
	TITANIUM_ALLOY = "Titanium Alloy",
	PLASTIC = "Plastic",
	ORGANIC_CRYSTAL = "Organic Crystal",
	GRAPHENE = "Graphene",
	STEEL = "Steel",
	PRISM = "Prism",
	PROLIFERATOR_MK_I = "Proliferator Mk.I",
	PROLIFERATOR_MK_II = "Proliferator Mk.II",
	PROLIFERATOR_MK_III = "Proliferator Mk.III",
	STRANGE_MATTER = "Strange Matter",
	TITANIUM_CRYSTAL = "Titanium Crystal",
	CARBON_NANOTUBE = "Carbon Nanotube",
	CASIMIR_CRYSTAL = "Casimir Crystal",
	TITANIUM_GLASS = "Titanium Glass",
	FRAME_MATERIAL = "Frame Material",
	// Components
	MAGNETIC_COIL = "Magnetic Coil",
	COMBUSTIBLE_UNIT = "Combustible Unit",
	ANNIHILATION_CONSTRAINT_SPHERE = "Annihilation Constraint Sphere",
	CIRCUIT_BOARD = "Circuit Board",
	ELECTRIC_MOTOR = "Electric Motor",
	MICROCRYSTALLINE_COMPONENT = "Microcrystalline Component",
	EXPLOSIVE_UNIT = "Explosive Unit",
	PARTICLE_BROADBAND = "Particle Broadband",
	GEAR = "Gear",
	PLASMA_EXCITER = "Plasma Exciter",
	PHOTON_COMBINER = "Photon Combiner",
	ELECTROMAGNETIC_TURBINE = "Electromagnetic Turbine",
	PROCESSOR = "Processor",
	CRYSTAL_EXPLOSIVE_UNIT = "Crystal Explosive Unit",
	PLANE_FILTER = "Plane Filter",
	ENGINE = "Engine",
	THRUSTER = "Thruster",
	REINFORCED_THRUSTER = "Reinforced Thruster",
	SUPER_MAGNETIC_RING = "Super-magnetic Ring",
	GRAVITON_LENS = "Graviton Lens",
	SPACE_WARPER = "Space Warper",
	DYSON_SPHERE_COMPONENT = "Dyson Sphere Component",
	FOUNDATION = "Foundation",
	QUANTUM_CHIP = "Quantum Chip",
	PARTICLE_CONTAINER = "Particle Container",

	// End Products
	HYDORGEN_FUEL_ROD = "Hydrogen Fuel Rod",
	DEUTERON_FUEL_ROD = "Deuteron Fuel Rod",
	ANTIMATTER_FUEL_ROD = "Antimatter Fuel Rod",
	STRANGE_ANNIHILATION_FUEL_ROD = "Strange Matter Fuel Rod",
	MAGNUM_AMMO_BOX = "Magnum Ammo Box",
	MISSILE_SET = "Missile Set",
	TITANIUM_AMMO_BOX = "Titanium Ammo Box",
	SUPERSONIC_MISSILE_SET = "Supersonic Missile Set",
	SUPERALLOY_AMMO_BOX = "Superalloy Ammo Box",
	GRAVITY_MISSILE_SET = "Gravity Missile Set",
	PROTOTYPE = "Prototype",
	PRECISION_DRONE = "Precision Drone",
	ATTACK_DRONE = "Attack Drone",
	CORVETTE = "Corvette",
	DESTROYER = "Destroyer",
	PLASMA_CAPSULE = "Plasma Capsule",
	SHELL_SET = "Shell Set",
	JAMMING_CAPSULE = "Jamming Capsule",
	SUPPRESSING_CAPSULE = "Suppressing Capsule",
	HIGH_EXPLOSIVE_SHELL_SET = "High Explosive Shell Set",
	CRYSTAL_SHELL_SET = "Crystal Shell Set",
	SMALL_CARRIER_ROCKET = "Small Carrier Rocket",
	SOLAR_SAIL = "Solar Sail",

	// Logistics
	LOGISTICS_BOT = "Logistics Bot",
	LOGISTICS_DRONE = "Logistics Drone",
	LOGISTICS_VESSEL = "Logistics Vessel",

	// Dark fog
	ENERGY_SHARD = "Energy Shard",
	CORE_ELEMENT = "Core Element",
	SILICON_BASED_NEURON = "Silicon-based Neuron",
	NEGENTROPY_SINGULARITY = "Negentropy Singularity",
	MATTER_RECOMBINATOR = "Matter Recombinator",
	ANTIMATTER_CAPSULE = "Antimatter Capsule",

	// Science
	ELECTROMAGNETIC_MATRIX = "Electromagnetic Matrix",
	ENERGY_MATRIX = "Energy Matrix",
	STRUCTURE_MATRIX = "Structure Matrix",
	INFORMATION_MATRIX = "Information Matrix",
	GRAVITY_MATRIX = "Gravity Matrix",
	UNIVERSE_MATRIX = "Universe Matrix",
	DARK_FOG_MATRIX = "Dark Fog Matrix",

	// Buildings

	// Power transmission
	TESLA_TOWER = "Tesla Tower",
	WIRELESS_POWER_TOWER = "Wireless Power Tower",
	SATELLITE_SUBSTATION = "Statellite Substation",
	ENERGY_EXCHANGER = "Energy Exchanger",

	// Power facilities
	WIND_TURBINE = "Wind Turbine",
	THERMAL_POWER_PLANT = "Thermal Power Plant",
	SOLAR_PANEL = "Solar Panel",
	GEOTHERMAL_POWER_STATION = "Geothermal Power Station",
	MINI_FUSION_POWER_PLANT = "Mini Fusion Power Plant",
	RAY_RECEIVER = "Ray Receiver",
	ARTIFICIAL_STAR = "Artificial Star",

	// Power storage
	ACCUMULATOR_FULL = "Accumulator (Full)",
	ACCUMULATOR = "Accumulator",

	// Logistics
	CONVEYOR_BELT_MK_I = "Conveyor Belt Mk.I",
	CONVEYOR_BELT_MK_II = "Conveyor Belt Mk.II",
	CONVEYOR_BELT_MK_III = "Conveyor Belt Mk.III",
	SORTER_MK_I = "Sorter Mk.I",
	SORTER_MK_II = "Sorter Mk.II",
	SORTER_MK_III = "Sorter Mk.III",
	PILE_SORTER = "Pile Sorter",
	TRAFFIC_MONITOR = "Traffic Monitor",
	SPLITTER = "Splitter",
	AUTOMATIC_PILER = "Automatic Piler",
	LOGISTICS_DISTRIBUTOR = "Logistics Distributor",
	PLANETARY_LOGISTICS_SYSTEM = "Planetary Logistics System",
	INTERSTELLAR_LOGISTICS_SYSTEM = "Interstellar Logistics System",
	ORBITAL_COLLECTOR = "Orbital Collector",
	STORAGE_MK_I = "Storage Mk. I",
	STORAGE_MK_II = "Storage Mk. II",
	STORAGE_TANK = "Storage TANK",

	// Mining facilities
	MINING_MACHINE = "Mining Machine",
	ADVANCED_MINING_MACHINE = "Advanced Mining Machine",

	// Fluid pumping facilities
	WATER_PUMP = "Water Pump",

	// Oil extraction facilities
	OIL_EXTRACTOR = "Oil Extractor",

	// Refining facilities
	OIL_REFINERY = "Oil Refinery",

	// Fractionation facilities
	FRACTIONATOR = "Fractionator",

	// Chemical facilities
	CHEMICAL_PLANT = "Chemical Plant",
	QUANTUM_CHEMICAL_PLANT = "Quantum Chemical Plant",

	// Particle collider
	MINIATURE_PARTICLE_COLLIDER = "Miniature Particle Collider",

	// Smelting facilities
	ARC_SMELTER = "Arc Smelter",
	PLANE_SMELTER = "Plane Smelter",
	NEGENTROPY_SMELTER = "Negentropy Smelter",

	// Assemblers
	ASSEMBLING_MACHINE_MK_I = "Assembling Machine Mk.I",
	ASSEMBLING_MACHINE_MK_II = "Assembling Machine Mk.II",
	ASSEMBLING_MACHINE_MK_III = "Assembling Machine Mk.III",
	RE_COMPOSING_ASSMEBLER = "Re-composing Assembler",

	// Research facilities
	MATRIX_LAB = "Matrix Lab",
	SELF_EVOLUTION_LAB = "Self-evolution Lab",

	// Production facilities
	SPRAY_COATER = "Spray Coater",
	EM_RAIL_EJECTOR = "EM-Rail Ejector",
	VERTICAL_LAUNCHING_SILO = "Vertical Launching Silo",

	// Turrets
	GAUSS_TURRET = "Gauss Turret",
	MISSLE_TURRET = "Missile Turret",
	IMPLOSION_CANNON = "Implosion Cannon",
	LASER_TURRET = "Laser Turret",
	PLASMA_TURRET = "Plasma Turret",
	SR_PLASMA_TURRET = "SR Plasma Turret",

	// Defense facilities
	BATTLEFIELD_ANALYSIS_BASE = "Battlefield Analysis Base",
	SIGNAL_TOWER = "Signal Tower",
	PLANETARY_SHIELD_GENERATOR = "Planetary Shield Generator",
	JAMMER_TOWER = "Jammer Tower",
}

export const ingredientIconFromLabel = (
	label: string,
) => {
	const filename =
		`./src/assets/images/${label}.webp`
			.replaceAll(" ", "_")
			.toLowerCase();
	return filename;
	// return INGREDIENT_ICON_REGISTRY[filename];
};
