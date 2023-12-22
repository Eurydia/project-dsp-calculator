import { Facility, RecipeType } from "../types";

export const FACILITY_DATA_LIST: Facility[] = [
	Facility.create(
		"Arc Smelter",
		1,
		0.36,
		0.012,
		RecipeType.SMELTING_FACILITY,
	),
	Facility.create(
		"Plane Smelter",
		2,
		1.44,
		0.048,
		RecipeType.SMELTING_FACILITY,
	),
	Facility.create(
		"Negentropy Smelter",
		3,
		2.88,
		0.096,
		RecipeType.SMELTING_FACILITY,
	),
	Facility.create(
		"Assembler Mk.I",
		0.75,
		0.27,
		0.012,
		RecipeType.ASSEMBLER,
	),
	Facility.create(
		"Assembler Mk.II",
		1,
		0.54,
		0.015,
		RecipeType.ASSEMBLER,
	),
	Facility.create(
		"Assembler Mk.III",
		1.5,
		1.08,
		0.018,
		RecipeType.ASSEMBLER,
	),
	Facility.create(
		"Re-composing Assembler",
		3,
		2.7,
		0.054,
		RecipeType.ASSEMBLER,
	),
	Facility.create(
		"Oil Refinery",
		1,
		0.96,
		0.024,
		RecipeType.REFINING_FACILITY,
	),
	Facility.create(
		"Chemical Plant",
		1,
		0.72,
		0.024,
		RecipeType.CHEMICAL_FACILITY,
	),
	Facility.create(
		"Quantum Chemical Plant",
		2,
		2.16,
		0.036,
		RecipeType.CHEMICAL_FACILITY,
	),
	Facility.create(
		"Miniature Particle Collider",
		1,
		12,
		0.12,
		RecipeType.PARTICLE_COLLIDER,
	),
	Facility.create(
		"Matrix Lab",
		1,
		0.48,
		0.012,
		RecipeType.RESEARCH_FACILITY,
	),
	Facility.create(
		"Self-evolution Lab",
		3,
		1.92,
		0.048,
		RecipeType.RESEARCH_FACILITY,
	),
].sort((a, b) => {
	if (a.label < b.label) {
		return -1;
	}
	if (a.label > b.label) {
		return 1;
	}
	return 0;
});
