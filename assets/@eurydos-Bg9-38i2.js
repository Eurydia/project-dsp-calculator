var S;(function(R){R.EXTRA_PRODUCTS="Extra Products",R.PRODUCTION_SPEEDUP="Production Speedup"})(S||(S={}));var I;(function(R){R.ASSEMBLER="Assembler",R.SMELTING_FACILITY="Smelting Facility",R.CHEMICAL_FACILITY="Chemical Facility",R.REFINING_FACILITY="Refining Facility",R.RESEARCH_FACILITY="Research Facility",R.PARTICLE_COLLIDER="Particle Collider"})(I||(I={}));const o={},A=(R,_,L,N,C,M)=>{o[R]={label:R,cycleMultiplier:_,workConsumptionMW:L,idleConsumptionMW:N,recipeType:C,connectionCount:M}};A("Arc Smelter",1,.36,.012,I.SMELTING_FACILITY,12);A("Plane Smelter",2,1.44,.048,I.SMELTING_FACILITY,12);A("Negentropy Smelter",3,2.88,.096,I.SMELTING_FACILITY,12);A("Assembling Machine Mk.I",.75,.27,.012,I.ASSEMBLER,12);A("Assembling Machine Mk.II",1,.54,.015,I.ASSEMBLER,12);A("Assembling Machine Mk.III",1.5,1.08,.018,I.ASSEMBLER,12);A("Re-composing Assembler",3,2.7,.054,I.ASSEMBLER,12);A("Oil Refinery",1,.96,.024,I.REFINING_FACILITY,9);A("Chemical Plant",1,.72,.024,I.CHEMICAL_FACILITY,8);A("Quantum Chemical Plant",2,2.16,.036,I.CHEMICAL_FACILITY,8);A("Miniature Particle Collider",1,12,.12,I.PARTICLE_COLLIDER,9);A("Matrix Lab",1,.48,.012,I.RESEARCH_FACILITY,12);A("Self-evolution Lab",3,1.92,.048,I.RESEARCH_FACILITY,12);const U={},O=(R,_,L,N,C,M)=>{const a={label:R,mode:_,workConsumptionMultiplier:L,productMultiplier:N,cycleMultiplier:C,sprayCount:M};return U[R]=a,a};O("None",S.PRODUCTION_SPEEDUP,1,1,1,0);O("Cycle Speed +25%",S.PRODUCTION_SPEEDUP,1.3,1,1.25,12);O("Cycle Speed +50%",S.PRODUCTION_SPEEDUP,1.7,1,1.5,24);O("Cycle Speed +100%",S.PRODUCTION_SPEEDUP,2.5,1,2,60);O("Extra Products +12.5%",S.EXTRA_PRODUCTS,1.3,1.125,1,12);O("Extra Products +20%",S.EXTRA_PRODUCTS,1.7,1.2,1,24);O("Extra Products +25%",S.EXTRA_PRODUCTS,2.5,1.25,1,60);var E;(function(R){R.IRON_ORE="Iron Ore",R.COPPER_ORE="Copper Ore",R.SILICON_ORE="Silicon Ore",R.TITANIUM_ORE="Titanium Ore",R.STONE="Stone",R.COAL="Coal",R.WATER="Water",R.CRUDE_OIL="Crude Oil",R.KIMBERLITE_ORE="Kimberlite Ore",R.FRACTAL_SILICON="Fractal Silicon",R.GRATING_CRYSTAL="Grating Crystal",R.STALAGMITE_CRYSTAL="Stalagmite Crystal",R.UNIPOLAR_MAGNET="Unipolar Magnet",R.FIRE_ICE="Fire Ice",R.LOG="Log",R.PLANT_FUEL="Plant Fuel",R.HYDROGEN="Hydrogen",R.DEUTERIUM="Deuterium",R.ANTIMATTER="Antimatter",R.IRON_INGOT="Iron Ingot",R.COPPER_INGOT="Copper Ingot",R.STONE_BRICK="Stone Brick",R.ENERGETIC_GRAPHITE="Energetic Graphite",R.HIGH_PURITY_SILICON="High-Purity Silicon",R.TITANIUM_INGOT="Titanium Ingot",R.SULFURIC_ACID="Sulfuric Acid",R.REFINED_OIL="Refined Oil",R.CRITICAL_PHOTON="Critical Photon",R.MAGNET="Magnet",R.GLASS="Glass",R.DIAMOND="Diamond",R.CRYSTAL_SILICON="Crystal Silicon",R.TITANIUM_ALLOY="Titanium Alloy",R.PLASTIC="Plastic",R.ORGANIC_CRYSTAL="Organic Crystal",R.GRAPHENE="Graphene",R.STEEL="Steel",R.PRISM="Prism",R.PROLIFERATOR_MK_I="Proliferator Mk.I",R.PROLIFERATOR_MK_II="Proliferator Mk.II",R.PROLIFERATOR_MK_III="Proliferator Mk.III",R.STRANGE_MATTER="Strange Matter",R.TITANIUM_CRYSTAL="Titanium Crystal",R.CARBON_NANOTUBE="Carbon Nanotube",R.CASIMIR_CRYSTAL="Casimir Crystal",R.TITANIUM_GLASS="Titanium Glass",R.FRAME_MATERIAL="Frame Material",R.MAGNETIC_COIL="Magnetic Coil",R.COMBUSTIBLE_UNIT="Combustible Unit",R.ANNIHILATION_CONSTRAINT_SPHERE="Annihilation Constraint Sphere",R.CIRCUIT_BOARD="Circuit Board",R.ELECTRIC_MOTOR="Electric Motor",R.MICROCRYSTALLINE_COMPONENT="Microcrystalline Component",R.EXPLOSIVE_UNIT="Explosive Unit",R.PARTICLE_BROADBAND="Particle Broadband",R.GEAR="Gear",R.PLASMA_EXCITER="Plasma Exciter",R.PHOTON_COMBINER="Photon Combiner",R.ELECTROMAGNETIC_TURBINE="Electromagnetic Turbine",R.PROCESSOR="Processor",R.CRYSTAL_EXPLOSIVE_UNIT="Crystal Explosive Unit",R.PLANE_FILTER="Plane Filter",R.ENGINE="Engine",R.THRUSTER="Thruster",R.REINFORCED_THRUSTER="Reinforced Thruster",R.SUPER_MAGNETIC_RING="Super-magnetic Ring",R.GRAVITON_LENS="Graviton Lens",R.SPACE_WARPER="Space Warper",R.DYSON_SPHERE_COMPONENT="Dyson Sphere Component",R.FOUNDATION="Foundation",R.QUANTUM_CHIP="Quantum Chip",R.PARTICLE_CONTAINER="Particle Container",R.HYDORGEN_FUEL_ROD="Hydrogen Fuel Rod",R.DEUTERON_FUEL_ROD="Deuteron Fuel Rod",R.ANTIMATTER_FUEL_ROD="Antimatter Fuel Rod",R.STRANGE_ANNIHILATION_FUEL_ROD="Strange Matter Fuel Rod",R.MAGNUM_AMMO_BOX="Magnum Ammo Box",R.MISSILE_SET="Missile Set",R.TITANIUM_AMMO_BOX="Titanium Ammo Box",R.SUPERSONIC_MISSILE_SET="Supersonic Missile Set",R.SUPERALLOY_AMMO_BOX="Superalloy Ammo Box",R.GRAVITY_MISSILE_SET="Gravity Missile Set",R.PROTOTYPE="Prototype",R.PRECISION_DRONE="Precision Drone",R.ATTACK_DRONE="Attack Drone",R.CORVETTE="Corvette",R.DESTROYER="Destroyer",R.PLASMA_CAPSULE="Plasma Capsule",R.SHELL_SET="Shell Set",R.JAMMING_CAPSULE="Jamming Capsule",R.SUPPRESSING_CAPSULE="Suppressing Capsule",R.HIGH_EXPLOSIVE_SHELL_SET="High Explosive Shell Set",R.CRYSTAL_SHELL_SET="Crystal Shell Set",R.SMALL_CARRIER_ROCKET="Small Carrier Rocket",R.SOLAR_SAIL="Solar Sail",R.LOGISTICS_BOT="Logistics Bot",R.LOGISTICS_DRONE="Logistics Drone",R.LOGISTICS_VESSEL="Logistics Vessel",R.ENERGY_SHARD="Energy Shard",R.CORE_ELEMENT="Core Element",R.SILICON_BASED_NEURON="Silicon-based Neuron",R.NEGENTROPY_SINGULARITY="Negentropy Singularity",R.MATTER_RECOMBINATOR="Matter Recombinator",R.ANTIMATTER_CAPSULE="Antimatter Capsule",R.ELECTROMAGNETIC_MATRIX="Electromagnetic Matrix",R.ENERGY_MATRIX="Energy Matrix",R.STRUCTURE_MATRIX="Structure Matrix",R.INFORMATION_MATRIX="Information Matrix",R.GRAVITY_MATRIX="Gravity Matrix",R.UNIVERSE_MATRIX="Universe Matrix",R.DARK_FOG_MATRIX="Dark Fog Matrix",R.TESLA_TOWER="Tesla Tower",R.WIRELESS_POWER_TOWER="Wireless Power Tower",R.SATELLITE_SUBSTATION="Statellite Substation",R.ENERGY_EXCHANGER="Energy Exchanger",R.WIND_TURBINE="Wind Turbine",R.THERMAL_POWER_PLANT="Thermal Power Plant",R.SOLAR_PANEL="Solar Panel",R.GEOTHERMAL_POWER_STATION="Geothermal Power Station",R.MINI_FUSION_POWER_PLANT="Mini Fusion Power Plant",R.RAY_RECEIVER="Ray Receiver",R.ARTIFICIAL_STAR="Artificial Star",R.ACCUMULATOR_FULL="Accumulator (Full)",R.ACCUMULATOR="Accumulator",R.CONVEYOR_BELT_MK_I="Conveyor Belt Mk.I",R.CONVEYOR_BELT_MK_II="Conveyor Belt Mk.II",R.CONVEYOR_BELT_MK_III="Conveyor Belt Mk.III",R.SORTER_MK_I="Sorter Mk.I",R.SORTER_MK_II="Sorter Mk.II",R.SORTER_MK_III="Sorter Mk.III",R.PILE_SORTER="Pile Sorter",R.TRAFFIC_MONITOR="Traffic Monitor",R.SPLITTER="Splitter",R.AUTOMATIC_PILER="Automatic Piler",R.LOGISTICS_DISTRIBUTOR="Logistics Distributor",R.PLANETARY_LOGISTICS_SYSTEM="Planetary Logistics System",R.INTERSTELLAR_LOGISTICS_SYSTEM="Interstellar Logistics System",R.ORBITAL_COLLECTOR="Orbital Collector",R.STORAGE_MK_I="Storage Mk. I",R.STORAGE_MK_II="Storage Mk. II",R.STORAGE_TANK="Storage TANK",R.MINING_MACHINE="Mining Machine",R.ADVANCED_MINING_MACHINE="Advanced Mining Machine",R.WATER_PUMP="Water Pump",R.OIL_EXTRACTOR="Oil Extractor",R.OIL_REFINERY="Oil Refinery",R.FRACTIONATOR="Fractionator",R.CHEMICAL_PLANT="Chemical Plant",R.QUANTUM_CHEMICAL_PLANT="Quantum Chemical Plant",R.MINIATURE_PARTICLE_COLLIDER="Miniature Particle Collider",R.ARC_SMELTER="Arc Smelter",R.PLANE_SMELTER="Plane Smelter",R.NEGENTROPY_SMELTER="Negentropy Smelter",R.ASSEMBLING_MACHINE_MK_I="Assembling Machine Mk.I",R.ASSEMBLING_MACHINE_MK_II="Assembling Machine Mk.II",R.ASSEMBLING_MACHINE_MK_III="Assembling Machine Mk.III",R.RE_COMPOSING_ASSMEBLER="Re-composing Assembler",R.MATRIX_LAB="Matrix Lab",R.SELF_EVOLUTION_LAB="Self-evolution Lab",R.SPRAY_COATER="Spray Coater",R.EM_RAIL_EJECTOR="EM-Rail Ejector",R.VERTICAL_LAUNCHING_SILO="Vertical Launching Silo",R.GAUSS_TURRET="Gauss Turret",R.MISSLE_TURRET="Missile Turret",R.IMPLOSION_CANNON="Implosion Cannon",R.LASER_TURRET="Laser Turret",R.PLASMA_TURRET="Plasma Turret",R.SR_PLASMA_TURRET="SR Plasma Turret",R.BATTLEFIELD_ANALYSIS_BASE="Battlefield Analysis Base",R.SIGNAL_TOWER="Signal Tower",R.PLANETARY_SHIELD_GENERATOR="Planetary Shield Generator",R.JAMMER_TOWER="Jammer Tower"})(E||(E={}));const G={},T=(R,_,L,N,C,M=!1)=>{G[R]={label:R,cycleTimeSecond:_,materialRecord:L,productRecord:N,recipeType:C,speedupOnly:M}};T("Proliferator Mk.I",.5,{[E.COAL]:1},{[E.PROLIFERATOR_MK_I]:1},I.ASSEMBLER);T("Proliferator Mk.II",1,{[E.DIAMOND]:1,[E.PROLIFERATOR_MK_I]:2},{[E.PROLIFERATOR_MK_II]:1},I.ASSEMBLER);T("Proliferator Mk.III",2,{[E.CARBON_NANOTUBE]:1,[E.PROLIFERATOR_MK_II]:2},{[E.PROLIFERATOR_MK_III]:1},I.ASSEMBLER);T("Magnum Ammo Box",1,{[E.COPPER_INGOT]:3},{[E.MAGNUM_AMMO_BOX]:1},I.ASSEMBLER);T("Missile Set",2,{[E.ENGINE]:1,[E.COMBUSTIBLE_UNIT]:2,[E.CIRCUIT_BOARD]:3,[E.COPPER_INGOT]:6},{[E.MISSILE_SET]:1},I.ASSEMBLER);T("Magnetic Coil",1,{[E.COPPER_INGOT]:1,[E.IRON_INGOT]:2},{[E.MAGNETIC_COIL]:2},I.ASSEMBLER);T("Combustible Unit",3,{[E.COAL]:3},{[E.COMBUSTIBLE_UNIT]:1},I.ASSEMBLER);T("Titanium Ammo Box",2,{[E.MAGNUM_AMMO_BOX]:1,[E.TITANIUM_INGOT]:2},{[E.TITANIUM_AMMO_BOX]:1},I.ASSEMBLER);T("Supersonic Missile Set",4,{[E.THRUSTER]:2,[E.MISSILE_SET]:2,[E.EXPLOSIVE_UNIT]:4,[E.PROCESSOR]:4},{[E.SUPERSONIC_MISSILE_SET]:2},I.ASSEMBLER);T("Electric Motor",2,{[E.MAGNETIC_COIL]:1,[E.GEAR]:1,[E.IRON_INGOT]:2},{[E.ELECTRIC_MOTOR]:1},I.ASSEMBLER);T("Crystal Silicon (advanced)",1.5,{[E.FRACTAL_SILICON]:1},{[E.CRYSTAL_SILICON]:2},I.ASSEMBLER);T("Titanium Glass",5,{[E.GLASS]:2,[E.WATER]:2,[E.TITANIUM_INGOT]:2},{[E.TITANIUM_GLASS]:2},I.ASSEMBLER);T("Prism",2,{[E.GLASS]:3},{[E.PRISM]:2},I.ASSEMBLER);T("Titanium Crystal",4,{[E.ORGANIC_CRYSTAL]:1,[E.TITANIUM_INGOT]:3},{[E.TITANIUM_CRYSTAL]:1},I.ASSEMBLER);T("Organic Crystal (original)",6,{[E.WATER]:10,[E.LOG]:20,[E.PLANT_FUEL]:30},{[E.ORGANIC_CRYSTAL]:1},I.ASSEMBLER);T("Engine",3,{[E.MAGNETIC_COIL]:1,[E.COPPER_INGOT]:2},{[E.ENGINE]:1},I.ASSEMBLER);T("Thruster",4,{[E.STEEL]:2,[E.COPPER_INGOT]:3},{[E.THRUSTER]:1},I.ASSEMBLER);T("Reinforced Thruster",6,{[E.TITANIUM_ALLOY]:5,[E.ELECTROMAGNETIC_TURBINE]:5},{[E.THRUSTER]:1},I.ASSEMBLER);T("Superalloy Ammo Box",3,{[E.TITANIUM_AMMO_BOX]:1,[E.TITANIUM_ALLOY]:2},{[E.SUPERALLOY_AMMO_BOX]:1},I.ASSEMBLER);T("Gravity Missile Set",6,{[E.SUPERSONIC_MISSILE_SET]:3,[E.STRANGE_MATTER]:3,[E.CRYSTAL_EXPLOSIVE_UNIT]:6},{[E.GRAVITY_MISSILE_SET]:3},I.ASSEMBLER);T("Gear",1,{[E.IRON_INGOT]:1},{[E.GEAR]:1},I.ASSEMBLER);T("Electromagnetic Turbine",2,{[E.ELECTRIC_MOTOR]:2,[E.MAGNETIC_COIL]:2},{[E.ELECTROMAGNETIC_TURBINE]:1},I.ASSEMBLER);T("Circuit Board",1,{[E.COPPER_INGOT]:1,[E.IRON_INGOT]:2},{[E.CIRCUIT_BOARD]:2},I.ASSEMBLER);T("Graviton Lens",6,{[E.STRANGE_MATTER]:1,[E.DIAMOND]:4},{[E.GRAVITON_LENS]:1},I.ASSEMBLER);T("Logistics Bot",2,{[E.ENGINE]:1,[E.PROCESSOR]:1,[E.IRON_INGOT]:2},{[E.LOGISTICS_BOT]:1},I.ASSEMBLER);T("Logistics Drone",4,{[E.PROCESSOR]:2,[E.THRUSTER]:2,[E.IRON_INGOT]:5},{[E.LOGISTICS_DRONE]:1},I.ASSEMBLER);T("Logistics Vessel",6,{[E.REINFORCED_THRUSTER]:2,[E.TITANIUM_ALLOY]:10,[E.PROCESSOR]:10},{[E.LOGISTICS_VESSEL]:1},I.ASSEMBLER);T("Plasma Capsule",2,{[E.GRAPHENE]:1,[E.MAGNET]:2,[E.DEUTERIUM]:10},{[E.PLASMA_CAPSULE]:1},I.ASSEMBLER);T("Shell Set",1.5,{[E.COMBUSTIBLE_UNIT]:2,[E.COPPER_INGOT]:9},{[E.SHELL_SET]:1},I.ASSEMBLER);T("Plasma Exciter",2,{[E.PRISM]:2,[E.MAGNETIC_COIL]:4},{[E.PLASMA_EXCITER]:1},I.ASSEMBLER);T("Super-magnetic Ring",3,{[E.ENERGETIC_GRAPHITE]:1,[E.ELECTROMAGNETIC_TURBINE]:2,[E.MAGNET]:3},{[E.SUPER_MAGNETIC_RING]:1},I.ASSEMBLER);T("Particle Broadband",8,{[E.PLASTIC]:1,[E.CRYSTAL_SILICON]:2,[E.CARBON_NANOTUBE]:2},{[E.PARTICLE_BROADBAND]:1},I.ASSEMBLER);T("Processor",3,{[E.CIRCUIT_BOARD]:2,[E.MICROCRYSTALLINE_COMPONENT]:2},{[E.PROCESSOR]:1},I.ASSEMBLER);T("Casimir Crystal",4,{[E.TITANIUM_CRYSTAL]:1,[E.GRAPHENE]:2,[E.HYDROGEN]:12},{[E.CASIMIR_CRYSTAL]:1},I.ASSEMBLER);T("Particle Container",4,{[E.ELECTROMAGNETIC_TURBINE]:2,[E.GRAPHENE]:2,[E.COPPER_INGOT]:2},{[E.PARTICLE_CONTAINER]:1},I.ASSEMBLER);T("Solar Sail",4,{[E.GRAPHENE]:1,[E.PHOTON_COMBINER]:1},{[E.SOLAR_SAIL]:2},I.ASSEMBLER);T("Frame Material",6,{[E.HIGH_PURITY_SILICON]:1,[E.TITANIUM_ALLOY]:1,[E.CARBON_NANOTUBE]:4},{[E.FRAME_MATERIAL]:1},I.ASSEMBLER);T("Dyson Sphere Component",8,{[E.FRAME_MATERIAL]:3,[E.PROCESSOR]:3,[E.SOLAR_SAIL]:3},{[E.DYSON_SPHERE_COMPONENT]:1},I.ASSEMBLER);T("Small Carrier Rocket",6,{[E.DYSON_SPHERE_COMPONENT]:2,[E.QUANTUM_CHIP]:2,[E.DEUTERON_FUEL_ROD]:4},{[E.SMALL_CARRIER_ROCKET]:1},I.ASSEMBLER);T("Antimatter Capsule",2,{[E.PLASMA_CAPSULE]:1,[E.PARTICLE_CONTAINER]:1,[E.HYDROGEN]:10,[E.ANTIMATTER]:10},{[E.ANTIMATTER_CAPSULE]:1},I.ASSEMBLER);T("High-explosive Shell Set",3,{[E.SHELL_SET]:1,[E.EXPLOSIVE_UNIT]:2,[E.TITANIUM_INGOT]:6},{[E.HIGH_EXPLOSIVE_SHELL_SET]:1},I.ASSEMBLER);T("Photon Combiner",3,{[E.CIRCUIT_BOARD]:1,[E.PRISM]:2},{[E.PHOTON_COMBINER]:1},I.ASSEMBLER);T("Photon Combiner (advanced)",3,{[E.CIRCUIT_BOARD]:1,[E.GRATING_CRYSTAL]:1},{[E.PHOTON_COMBINER]:1},I.ASSEMBLER);T("Microcrystalline Component",2,{[E.COPPER_INGOT]:1,[E.HIGH_PURITY_SILICON]:2},{[E.MICROCRYSTALLINE_COMPONENT]:1},I.ASSEMBLER);T("Quantum Chip",6,{[E.PROCESSOR]:2,[E.PLANE_FILTER]:2},{[E.QUANTUM_CHIP]:1},I.ASSEMBLER);T("Casimir Crystal (advanced)",4,{[E.GRAPHENE]:2,[E.GRATING_CRYSTAL]:8,[E.HYDROGEN]:12},{[E.CASIMIR_CRYSTAL]:1},I.ASSEMBLER);T("Particle Container (advanced)",4,{[E.COPPER_INGOT]:2,[E.UNIPOLAR_MAGNET]:10},{[E.PARTICLE_CONTAINER]:1},I.ASSEMBLER);T("Plane Filter",12,{[E.CASIMIR_CRYSTAL]:1,[E.TITANIUM_GLASS]:2},{[E.PLANE_FILTER]:1},I.ASSEMBLER);T("Annihilation Constraint Sphere",20,{[E.PARTICLE_CONTAINER]:1,[E.PROCESSOR]:1},{[E.ANNIHILATION_CONSTRAINT_SPHERE]:1},I.ASSEMBLER);T("Hydrogen Fuel Rod",6,{[E.TITANIUM_INGOT]:1,[E.HYDROGEN]:10},{[E.HYDORGEN_FUEL_ROD]:2},I.ASSEMBLER);T("Deuteron Fuel Rod",12,{[E.TITANIUM_ALLOY]:1,[E.SUPER_MAGNETIC_RING]:1,[E.DEUTERIUM]:20},{[E.DEUTERON_FUEL_ROD]:2},I.ASSEMBLER);T("Antimatter Fuel Rod",24,{[E.TITANIUM_ALLOY]:1,[E.ANNIHILATION_CONSTRAINT_SPHERE]:1,[E.HYDROGEN]:12,[E.ANTIMATTER]:12},{[E.ANTIMATTER_FUEL_ROD]:2},I.ASSEMBLER,!0);T("Strange Annihilation Fuel Rod",32,{[E.FRAME_MATERIAL]:1,[E.CORE_ELEMENT]:1,[E.STRANGE_MATTER]:2,[E.ANTIMATTER_FUEL_ROD]:8},{[E.STRANGE_ANNIHILATION_FUEL_ROD]:1},I.ASSEMBLER,!0);T("Jamming Capsule",2,{[E.PLASMA_EXCITER]:1,[E.ELECTROMAGNETIC_TURBINE]:1,[E.HYDROGEN]:3},{[E.JAMMING_CAPSULE]:1},I.ASSEMBLER);T("Crystal Shell Set",6,{[E.HIGH_EXPLOSIVE_SHELL_SET]:1,[E.CRYSTAL_EXPLOSIVE_UNIT]:2,[E.TITANIUM_ALLOY]:3},{[E.CRYSTAL_SHELL_SET]:1},I.ASSEMBLER);T("Prototype",2,{[E.PLASMA_EXCITER]:1,[E.ENGINE]:1,[E.CIRCUIT_BOARD]:2,[E.IRON_INGOT]:3},{[E.PROTOTYPE]:1},I.ASSEMBLER);T("Precision Drone",4,{[E.PROTOTYPE]:1,[E.ELECTROMAGNETIC_TURBINE]:1,[E.CIRCUIT_BOARD]:2,[E.PHOTON_COMBINER]:2},{[E.PRECISION_DRONE]:1},I.ASSEMBLER);T("Attack Drone",4,{[E.PROTOTYPE]:1,[E.PARTICLE_CONTAINER]:1,[E.PROCESSOR]:1,[E.ELECTROMAGNETIC_TURBINE]:1},{[E.ATTACK_DRONE]:1},I.ASSEMBLER);T("Corvette",5,{[E.REINFORCED_THRUSTER]:1,[E.PROCESSOR]:2,[E.PARTICLE_CONTAINER]:3,[E.TITANIUM_ALLOY]:5},{[E.CORVETTE]:1},I.ASSEMBLER);T("Destroyer",8,{[E.STRANGE_MATTER]:1,[E.PROCESSOR]:4,[E.REINFORCED_THRUSTER]:4,[E.FRAME_MATERIAL]:20},{[E.DESTROYER]:1},I.ASSEMBLER);T("Space Warper",10,{[E.GRAVITON_LENS]:1},{[E.SPACE_WARPER]:1},I.ASSEMBLER);T("Space Warper (advanced)",10,{[E.GRAVITY_MATRIX]:1},{[E.SPACE_WARPER]:8},I.ASSEMBLER);T("Suppressing Capsule",8,{[E.SUPER_MAGNETIC_RING]:1,[E.TITANIUM_GLASS]:2,[E.JAMMING_CAPSULE]:2},{[E.SUPPRESSING_CAPSULE]:2},I.ASSEMBLER);T("Foundation",1,{[E.STEEL]:1,[E.STONE_BRICK]:3},{[E.FOUNDATION]:1},I.ASSEMBLER);T("Tesla Tower",1,{[E.IRON_INGOT]:2,[E.MAGNETIC_COIL]:1},{[E.TESLA_TOWER]:1},I.ASSEMBLER);T("Wireless Power Tower",3,{[E.TESLA_TOWER]:1,[E.PLASMA_EXCITER]:3},{[E.WIRELESS_POWER_TOWER]:1},I.ASSEMBLER,!0);T("Satellite Substation",5,{[E.WIRELESS_POWER_TOWER]:1,[E.FRAME_MATERIAL]:2,[E.SUPER_MAGNETIC_RING]:10},{[E.SATELLITE_SUBSTATION]:1},I.ASSEMBLER,!0);T("Wind Turbine",4,{[E.GEAR]:1,[E.MAGNETIC_COIL]:3,[E.IRON_INGOT]:6},{[E.WIND_TURBINE]:1},I.ASSEMBLER);T("Thermal Power Plant",5,{[E.STONE_BRICK]:4,[E.GEAR]:4,[E.MAGNETIC_COIL]:4,[E.IRON_INGOT]:10},{[E.THERMAL_POWER_PLANT]:1},I.ASSEMBLER);T("Solar Panel",6,{[E.CIRCUIT_BOARD]:5,[E.COPPER_INGOT]:10,[E.HIGH_PURITY_SILICON]:10},{[E.SOLAR_PANEL]:1},I.ASSEMBLER);T("Accumulator",3,{[E.SUPER_MAGNETIC_RING]:1,[E.CRYSTAL_SILICON]:3,[E.IRON_INGOT]:6},{[E.ACCUMULATOR]:1},I.ASSEMBLER);T("Geothermal Power Station",6,{[E.SUPER_MAGNETIC_RING]:1,[E.PHOTON_COMBINER]:4,[E.STEEL]:15,[E.COPPER_INGOT]:20},{[E.GEOTHERMAL_POWER_STATION]:1},I.ASSEMBLER);T("Mini Fusion Power Plant",10,{[E.PROCESSOR]:4,[E.CARBON_NANOTUBE]:8,[E.SUPER_MAGNETIC_RING]:10,[E.TITANIUM_ALLOY]:12},{[E.MINI_FUSION_POWER_PLANT]:1},I.ASSEMBLER);T("Energy Exchanger",15,{[E.PARTICLE_CONTAINER]:8,[E.TITANIUM_ALLOY]:40,[E.STEEL]:40,[E.PROCESSOR]:40},{[E.ENERGY_EXCHANGER]:1},I.ASSEMBLER);T("Ray Receiver",8,{[E.PROCESSOR]:5,[E.PHOTON_COMBINER]:10,[E.STEEL]:20,[E.HIGH_PURITY_SILICON]:20,[E.SUPER_MAGNETIC_RING]:20},{[E.RAY_RECEIVER]:1},I.ASSEMBLER);T("Artificial Star",30,{[E.ANNIHILATION_CONSTRAINT_SPHERE]:10,[E.QUANTUM_CHIP]:10,[E.TITANIUM_ALLOY]:20,[E.FRAME_MATERIAL]:20},{[E.ARTIFICIAL_STAR]:1},I.ASSEMBLER);T("Conveyor Belt MK.I",1,{[E.GEAR]:1,[E.IRON_INGOT]:2},{[E.CONVEYOR_BELT_MK_I]:3},I.ASSEMBLER);T("Conveyor Belt MK.II",1,{[E.ELECTROMAGNETIC_TURBINE]:1,[E.CONVEYOR_BELT_MK_I]:3},{[E.CONVEYOR_BELT_MK_II]:3},I.ASSEMBLER,!0);T("Conveyor Belt MK.III",1,{[E.SUPER_MAGNETIC_RING]:1,[E.GRAPHENE]:1,[E.CONVEYOR_BELT_MK_II]:3},{[E.CONVEYOR_BELT_MK_III]:3},I.ASSEMBLER,!0);T("Splitter",2,{[E.CIRCUIT_BOARD]:1,[E.GEAR]:2,[E.IRON_INGOT]:3},{[E.SPLITTER]:1},I.ASSEMBLER);T("Automatic Piler",4,{[E.SUPER_MAGNETIC_RING]:1,[E.PROCESSOR]:2,[E.STEEL]:3,[E.GEAR]:4},{[E.AUTOMATIC_PILER]:1},I.ASSEMBLER);T("Traffic Monitor",2,{[E.GLASS]:1,[E.CIRCUIT_BOARD]:2,[E.GEAR]:2,[E.IRON_INGOT]:3},{[E.TRAFFIC_MONITOR]:1},I.ASSEMBLER);T("Spray Coater",3,{[E.MICROCRYSTALLINE_COMPONENT]:2,[E.CIRCUIT_BOARD]:2,[E.PLASMA_EXCITER]:2,[E.STEEL]:4},{[E.SPRAY_COATER]:1},I.ASSEMBLER);T("Storage Mk.I",2,{[E.IRON_INGOT]:4,[E.STONE_BRICK]:4},{[E.STORAGE_MK_I]:1},I.ASSEMBLER);T("Storage Mk.II",4,{[E.STEEL]:8,[E.STONE_BRICK]:8},{[E.STORAGE_MK_II]:1},I.ASSEMBLER);T("Storage Tank",2,{[E.STONE_BRICK]:4,[E.GLASS]:4,[E.IRON_INGOT]:8},{[E.STORAGE_TANK]:1},I.ASSEMBLER);T("Logistics Distributor",8,{[E.PLASMA_EXCITER]:4,[E.PROCESSOR]:4,[E.IRON_INGOT]:8},{[E.LOGISTICS_DISTRIBUTOR]:1},I.ASSEMBLER);T("Planetary Logistics Station",20,{[E.PARTICLE_CONTAINER]:20,[E.STEEL]:40,[E.TITANIUM_INGOT]:40,[E.PROCESSOR]:40},{[E.PLANETARY_LOGISTICS_SYSTEM]:1},I.ASSEMBLER);T("Interstellar Logistics Station",30,{[E.PLANETARY_LOGISTICS_SYSTEM]:1,[E.PARTICLE_CONTAINER]:20,[E.TITANIUM_INGOT]:40},{[E.INTERSTELLAR_LOGISTICS_SYSTEM]:1},I.ASSEMBLER,!0);T("Orbital Collector",30,{[E.INTERSTELLAR_LOGISTICS_SYSTEM]:1,[E.REINFORCED_THRUSTER]:20,[E.ACCUMULATOR_FULL]:20,[E.SUPER_MAGNETIC_RING]:50},{[E.ORBITAL_COLLECTOR]:1},I.ASSEMBLER,!0);T("Sorter Mk.I",1,{[E.IRON_INGOT]:1,[E.CIRCUIT_BOARD]:1},{[E.SORTER_MK_I]:1},I.ASSEMBLER);T("Sorter Mk.II",1,{[E.ELECTRIC_MOTOR]:1,[E.SORTER_MK_I]:2},{[E.SORTER_MK_II]:2},I.ASSEMBLER,!0);T("Sorter Mk.III",1,{[E.ELECTROMAGNETIC_TURBINE]:1,[E.SORTER_MK_II]:2},{[E.SORTER_MK_III]:2},I.ASSEMBLER,!0);T("Pile Sorter",1,{[E.SUPER_MAGNETIC_RING]:1,[E.PROCESSOR]:1,[E.SORTER_MK_III]:2},{[E.PILE_SORTER]:1},I.ASSEMBLER,!0);T("Mining Machine",3,{[E.GEAR]:2,[E.MAGNETIC_COIL]:2,[E.CIRCUIT_BOARD]:2,[E.IRON_INGOT]:4},{[E.MINING_MACHINE]:1},I.ASSEMBLER);T("Advanced Mining Machine",20,{[E.QUANTUM_CHIP]:4,[E.SUPER_MAGNETIC_RING]:10,[E.FRAME_MATERIAL]:10,[E.TITANIUM_ALLOY]:20,[E.GRATING_CRYSTAL]:40},{[E.ADVANCED_MINING_MACHINE]:1},I.ASSEMBLER);T("Water Pump",4,{[E.CIRCUIT_BOARD]:2,[E.ELECTRIC_MOTOR]:4,[E.STONE_BRICK]:4,[E.IRON_INGOT]:8},{[E.WATER_PUMP]:1},I.ASSEMBLER);T("Oil Extractor",8,{[E.PLASMA_EXCITER]:4,[E.CIRCUIT_BOARD]:6,[E.STEEL]:12,[E.STONE_BRICK]:12},{[E.OIL_EXTRACTOR]:1},I.ASSEMBLER);T("Oil Refinery",6,{[E.CIRCUIT_BOARD]:6,[E.PLASMA_EXCITER]:6,[E.STEEL]:10,[E.STONE_BRICK]:10},{[E.OIL_REFINERY]:1},I.ASSEMBLER);T("Fractionator",3,{[E.PROCESSOR]:1,[E.GLASS]:4,[E.STONE_BRICK]:4,[E.STEEL]:8},{[E.FRACTIONATOR]:1},I.ASSEMBLER);T("Chemical Plant",5,{[E.CIRCUIT_BOARD]:2,[E.STEEL]:8,[E.STONE_BRICK]:8,[E.GLASS]:8},{[E.CHEMICAL_PLANT]:1},I.ASSEMBLER);T("Quantum Chemical Plant",10,{[E.CHEMICAL_PLANT]:1,[E.STRANGE_MATTER]:3,[E.QUANTUM_CHIP]:3,[E.TITANIUM_GLASS]:10},{[E.QUANTUM_CHEMICAL_PLANT]:1},I.ASSEMBLER,!0);T("Miniature Particle Collider",15,{[E.PROCESSOR]:8,[E.GRAPHENE]:10,[E.TITANIUM_ALLOY]:20,[E.FRAME_MATERIAL]:20,[E.SUPER_MAGNETIC_RING]:25},{[E.MINIATURE_PARTICLE_COLLIDER]:1},I.ASSEMBLER);T("Arc Smelter",3,{[E.STONE_BRICK]:2,[E.MAGNETIC_COIL]:2,[E.IRON_INGOT]:4,[E.CIRCUIT_BOARD]:4},{[E.ARC_SMELTER]:1},I.ASSEMBLER);T("Plane Smelter",5,{[E.ARC_SMELTER]:1,[E.PLANE_FILTER]:4,[E.FRAME_MATERIAL]:5,[E.UNIPOLAR_MAGNET]:15},{[E.PLANE_SMELTER]:1},I.ASSEMBLER,!0);T("Negentropy Smelter",6,{[E.PLANE_SMELTER]:1,[E.QUANTUM_CHIP]:4,[E.NEGENTROPY_SINGULARITY]:10,[E.ENERGY_SHARD]:30},{[E.NEGENTROPY_SMELTER]:1},I.ASSEMBLER,!0);T("Assembling Machine Mk.I",2,{[E.IRON_INGOT]:4,[E.CIRCUIT_BOARD]:4,[E.GEAR]:8},{[E.ASSEMBLING_MACHINE_MK_I]:1},I.ASSEMBLER);T("Assembling Machine Mk.II",3,{[E.ASSEMBLING_MACHINE_MK_I]:1,[E.PROCESSOR]:4,[E.GRAPHENE]:8},{[E.ASSEMBLING_MACHINE_MK_II]:1},I.ASSEMBLER,!0);T("Assembling Machine Mk.III",4,{[E.ASSEMBLING_MACHINE_MK_II]:1,[E.QUANTUM_CHIP]:2,[E.PARTICLE_BROADBAND]:8},{[E.ASSEMBLING_MACHINE_MK_III]:1},I.ASSEMBLER,!0);T("Re-composing Assembler",5,{[E.ASSEMBLING_MACHINE_MK_III]:1,[E.QUANTUM_CHIP]:4,[E.NEGENTROPY_SINGULARITY]:10,[E.ENERGY_SHARD]:30},{[E.RE_COMPOSING_ASSMEBLER]:1},I.ASSEMBLER,!0);T("Matrix Lab",3,{[E.GLASS]:4,[E.CIRCUIT_BOARD]:4,[E.MAGNETIC_COIL]:4,[E.IRON_INGOT]:8},{[E.MATRIX_LAB]:1},I.ASSEMBLER);T("Self-evolution Lab",4,{[E.MATRIX_LAB]:1,[E.QUANTUM_CHIP]:4,[E.SILICON_BASED_NEURON]:10,[E.DARK_FOG_MATRIX]:20},{[E.SELF_EVOLUTION_LAB]:1},I.ASSEMBLER,!0);T("EM-Rail Ejector",6,{[E.PROCESSOR]:5,[E.SUPER_MAGNETIC_RING]:10,[E.STEEL]:20,[E.GEAR]:20},{[E.EM_RAIL_EJECTOR]:1},I.ASSEMBLER);T("Vertical Launching Silo",30,{[E.QUANTUM_CHIP]:10,[E.GRAVITON_LENS]:20,[E.FRAME_MATERIAL]:30,[E.TITANIUM_ALLOY]:80},{[E.VERTICAL_LAUNCHING_SILO]:1},I.ASSEMBLER);T("Gauss Turret",4,{[E.CIRCUIT_BOARD]:2,[E.MAGNETIC_COIL]:4,[E.IRON_INGOT]:8,[E.GEAR]:8},{[E.GAUSS_TURRET]:1},I.ASSEMBLER);T("Missile Turret",6,{[E.ELECTRIC_MOTOR]:6,[E.ENGINE]:6,[E.STEEL]:8,[E.CIRCUIT_BOARD]:12},{[E.MISSLE_TURRET]:1},I.ASSEMBLER);T("Implosion Cannon",5,{[E.SUPER_MAGNETIC_RING]:2,[E.ELECTRIC_MOTOR]:8,[E.STEEL]:10,[E.CIRCUIT_BOARD]:10},{[E.IMPLOSION_CANNON]:1},I.ASSEMBLER);T("Laser Turret",6,{[E.PLASMA_EXCITER]:6,[E.CIRCUIT_BOARD]:6,[E.PHOTON_COMBINER]:9,[E.STEEL]:9},{[E.LASER_TURRET]:1},I.ASSEMBLER);T("Plasma Turret",10,{[E.PROCESSOR]:5,[E.PLASMA_EXCITER]:5,[E.SUPER_MAGNETIC_RING]:10,[E.TITANIUM_GLASS]:10,[E.TITANIUM_ALLOY]:20},{[E.PLASMA_TURRET]:1},I.ASSEMBLER);T("SR Plasma Turret",6,{[E.PROCESSOR]:5,[E.PLASMA_EXCITER]:5,[E.SUPER_MAGNETIC_RING]:5,[E.STEEL]:15},{[E.SR_PLASMA_TURRET]:1},I.ASSEMBLER);T("Battlefield Analysis Base",6,{[E.MICROCRYSTALLINE_COMPONENT]:6,[E.ENGINE]:12,[E.STEEL]:12,[E.CIRCUIT_BOARD]:18},{[E.BATTLEFIELD_ANALYSIS_BASE]:1},I.ASSEMBLER);T("Jammer Tower",6,{[E.PROCESSOR]:3,[E.DIAMOND]:6,[E.PLASMA_EXCITER]:9,[E.COPPER_INGOT]:12},{[E.JAMMER_TOWER]:1},I.ASSEMBLER);T("Signal Tower",6,{[E.WIRELESS_POWER_TOWER]:2,[E.CRYSTAL_SILICON]:6,[E.STEEL]:12},{[E.SIGNAL_TOWER]:1},I.ASSEMBLER);T("Planetary Shield Generator",10,{[E.PARTICLE_CONTAINER]:5,[E.SUPER_MAGNETIC_RING]:5,[E.ELECTROMAGNETIC_TURBINE]:20,[E.STEEL]:20},{[E.PLANETARY_SHIELD_GENERATOR]:1},I.ASSEMBLER);T("Graphene",3,{[E.SULFURIC_ACID]:1,[E.ENERGETIC_GRAPHITE]:3},{[E.GRAPHENE]:2},I.CHEMICAL_FACILITY);T("Plastic",3,{[E.ENERGETIC_GRAPHITE]:1,[E.REFINED_OIL]:2},{[E.PLASTIC]:1},I.CHEMICAL_FACILITY);T("Graphene (advanced)",2,{[E.FIRE_ICE]:2},{[E.HYDROGEN]:1,[E.GRAPHENE]:2},I.CHEMICAL_FACILITY);T("Organic Crystal",6,{[E.WATER]:1,[E.REFINED_OIL]:1,[E.PLASTIC]:2},{[E.ORGANIC_CRYSTAL]:1},I.CHEMICAL_FACILITY);T("Explosive Unit",6,{[E.SULFURIC_ACID]:1,[E.PLASTIC]:2,[E.COMBUSTIBLE_UNIT]:2},{[E.EXPLOSIVE_UNIT]:2},I.CHEMICAL_FACILITY);T("Crystal Explosive Unit",24,{[E.CASIMIR_CRYSTAL]:1,[E.CRYSTAL_SILICON]:8,[E.EXPLOSIVE_UNIT]:8},{[E.CRYSTAL_EXPLOSIVE_UNIT]:8},I.CHEMICAL_FACILITY);T("Sulfuric Acid",6,{[E.WATER]:4,[E.REFINED_OIL]:6,[E.STONE]:8},{[E.SULFURIC_ACID]:4},I.CHEMICAL_FACILITY);T("Carbon Nanotube",4,{[E.TITANIUM_INGOT]:1,[E.GRAPHENE]:3},{[E.CARBON_NANOTUBE]:2},I.CHEMICAL_FACILITY);T("Carbon Nanotube (advanced)",4,{[E.STALAGMITE_CRYSTAL]:6},{[E.CARBON_NANOTUBE]:2},I.CHEMICAL_FACILITY);T("Strange Matter",8,{[E.PARTICLE_CONTAINER]:2,[E.IRON_INGOT]:2,[E.DEUTERIUM]:10},{[E.STRANGE_MATTER]:1},I.PARTICLE_COLLIDER);T("Deuterium",2.5,{[E.HYDROGEN]:10},{[E.DEUTERIUM]:5},I.PARTICLE_COLLIDER,!0);T("Mass-energy Storage",2,{[E.CRITICAL_PHOTON]:2},{[E.HYDROGEN]:2,[E.ANTIMATTER]:2},I.PARTICLE_COLLIDER,!0);T("Plasma Refining",4,{[E.CRUDE_OIL]:2},{[E.HYDROGEN]:1,[E.REFINED_OIL]:2},I.REFINING_FACILITY);T("X-ray Cracking",4,{[E.REFINED_OIL]:1,[E.HYDROGEN]:2},{[E.ENERGETIC_GRAPHITE]:1,[E.HYDROGEN]:3},I.REFINING_FACILITY,!0);T("Reformed Refinement",4,{[E.HYDROGEN]:1,[E.COAL]:1,[E.REFINED_OIL]:2},{[E.REFINED_OIL]:3},I.REFINING_FACILITY,!0);T("Electromagnetic Matrix",3,{[E.CIRCUIT_BOARD]:1,[E.MAGNETIC_COIL]:1},{[E.ELECTROMAGNETIC_MATRIX]:1},I.RESEARCH_FACILITY);T("Energy Matrix",6,{[E.HYDROGEN]:2,[E.ENERGETIC_GRAPHITE]:2},{[E.ENERGY_MATRIX]:1},I.RESEARCH_FACILITY);T("Structure Matrix",8,{[E.DIAMOND]:1,[E.TITANIUM_CRYSTAL]:1},{[E.STRUCTURE_MATRIX]:1},I.RESEARCH_FACILITY);T("Information Matrix",10,{[E.PARTICLE_BROADBAND]:1,[E.PROCESSOR]:2},{[E.INFORMATION_MATRIX]:1},I.RESEARCH_FACILITY);T("Gravity Matrix",24,{[E.GRAVITON_LENS]:1,[E.QUANTUM_CHIP]:1},{[E.GRAVITY_MATRIX]:2},I.RESEARCH_FACILITY);T("Universe Matrix",15,{[E.ELECTROMAGNETIC_MATRIX]:1,[E.ENERGY_MATRIX]:1,[E.STRUCTURE_MATRIX]:1,[E.INFORMATION_MATRIX]:1,[E.GRAVITY_MATRIX]:1,[E.ANTIMATTER]:1},{[E.UNIVERSE_MATRIX]:1},I.RESEARCH_FACILITY);T("Iron Ingot",1,{[E.IRON_ORE]:1},{[E.IRON_INGOT]:1},I.SMELTING_FACILITY);T("Copper Ingot",1,{[E.COPPER_ORE]:1},{[E.COPPER_INGOT]:1},I.SMELTING_FACILITY);T("High-Purity Silicon",2,{[E.SILICON_ORE]:2},{[E.HIGH_PURITY_SILICON]:1},I.SMELTING_FACILITY);T("Titanium Ingot",2,{[E.TITANIUM_ORE]:2},{[E.TITANIUM_INGOT]:1},I.SMELTING_FACILITY);T("Stone Brick",1,{[E.STONE]:1},{[E.STONE_BRICK]:1},I.SMELTING_FACILITY);T("Energetic Graphite",2,{[E.COAL]:2},{[E.ENERGETIC_GRAPHITE]:1},I.SMELTING_FACILITY);T("Magnet",1.5,{[E.IRON_ORE]:1},{[E.MAGNET]:1},I.SMELTING_FACILITY);T("Crystal Silicon",2,{[E.HIGH_PURITY_SILICON]:1},{[E.CRYSTAL_SILICON]:1},I.SMELTING_FACILITY);T("Titanium Alloy",12,{[E.TITANIUM_INGOT]:4,[E.STEEL]:4,[E.SULFURIC_ACID]:8},{[E.TITANIUM_ALLOY]:4},I.SMELTING_FACILITY);T("Glass",2,{[E.STONE]:2},{[E.GLASS]:1},I.SMELTING_FACILITY);T("Diamond",2,{[E.ENERGETIC_GRAPHITE]:1},{[E.DIAMOND]:1},I.SMELTING_FACILITY);T("Steel",3,{[E.IRON_INGOT]:3},{[E.STEEL]:1},I.SMELTING_FACILITY);T("Diamond (advanced)",1.5,{[E.KIMBERLITE_ORE]:1},{[E.DIAMOND]:2},I.SMELTING_FACILITY);T("Silicon Ore",10,{[E.STONE]:10},{[E.SILICON_ORE]:1},I.SMELTING_FACILITY);const B={},P=(R,_,L)=>{B[R]={label:R,workConsumptionMW:_,idleConsumptionMW:L}};P("Sorter Mk.I",.018,.009);P("Sorter Mk.II",.036,.009);P("Sorter Mk.III",.072,.009);P("Pile Sorter",.144,.009);const r="0.10.29.21950";console.debug(G);export{o as F,r as G,U as P,I as R,B as S,S as a,G as b};