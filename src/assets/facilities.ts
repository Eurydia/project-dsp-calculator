import { Facility, RecipeEnum } from "../types";

const compareAlphabet = (a: Facility, b: Facility): number => {
  if (a.label > b.label) {
    return 1;
  }
  if (a.label < b.label) {
    return -1;
  }
  return 0;
};

export const AssetFacilities: Facility[] = [
  Facility.create(
    "Arc Smelter",
    1,
    0.36,
    0.012,
    RecipeEnum.SMELTING_FACILITY,
  ),
  Facility.create(
    "Plane Smelter",
    2,
    1.44,
    0.048,
    RecipeEnum.SMELTING_FACILITY,
  ),
  Facility.create(
    "Assembler Mk.I",
    0.75,
    0.27,
    0.012,
    RecipeEnum.ASSEMBLER,
  ),
  Facility.create(
    "Assembler Mk.II",
    1,
    0.54,
    0.015,
    RecipeEnum.ASSEMBLER,
  ),
  Facility.create(
    "Assembler Mk.III",
    1.5,
    1.08,
    0.018,
    RecipeEnum.ASSEMBLER,
  ),
  Facility.create(
    "Oil Refinery",
    1,
    0.96,
    0.024,
    RecipeEnum.REFINING_FACILITY,
  ),
  Facility.create(
    "Chemical Plant",
    1,
    0.72,
    0.024,
    RecipeEnum.CHEMICAL_FACILITY,
  ),
  Facility.create(
    "Quantum Chemical Plant",
    2,
    2.16,
    0.036,
    RecipeEnum.CHEMICAL_FACILITY,
  ),
  Facility.create(
    "Miniature Particle Collider",
    1,
    12,
    0.12,
    RecipeEnum.PARTICLE_COLLIDER,
  ),
  Facility.create(
    "Matrix Lab",
    1,
    0.48,
    0.012,
    RecipeEnum.RESEARCH_FACILITY,
  ),
].sort(compareAlphabet);
