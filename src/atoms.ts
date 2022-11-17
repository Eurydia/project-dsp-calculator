import { atomWithStorage } from "jotai/utils";
import FACILITIES from "./assets/data/facilities";
import RECIPES from "./assets/data/recipes";
import SORTERS from "./assets/data/sorters";
import { PROLIF_EXTRA_PRODUCTS } from "./enums";
import { Flag } from "./types";

export const facilityAtom = atomWithStorage("f", FACILITIES[0]);
export const recipeAtom = atomWithStorage("r", RECIPES[0]);
export const sorterAtom = atomWithStorage("s", SORTERS[2]);
export const prolifLevelAtom = atomWithStorage("p-level", 3);
export const prolifModeAtom = atomWithStorage(
  "p-mode",
  PROLIF_EXTRA_PRODUCTS,
);

export const inputFlowRateAtom = atomWithStorage(
  "flowrate-input",
  "30",
);
export const outputFlowRateAtom = atomWithStorage(
  "flowrate-output",
  "30",
);

export const productionTargetAtom = atomWithStorage<{
  [key: string]: string;
}>("production-target", { "copper ingot": "" });

export const flagsAtom = atomWithStorage<{
  [key: string]: boolean;
}>("flags", {
  "0": true,
  "1": true,
  "2": true,
});
