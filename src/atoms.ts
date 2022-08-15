import { atomWithStorage } from "jotai/utils";
import FACILITIES from "./assets/data/facilities";
import RECIPES from "./assets/data/recipes";
import SORTERS from "./assets/data/sorter";
import { PROLIF_EXTRA_PRODUCTS } from "./enums";

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

interface Flag {
  label: string;
  tooltip: string;
  state: boolean;
}
export const flagsAtom = atomWithStorage<{
  [key: string]: Flag;
}>("flags", {
  "0": {
    label: "Keep belt under max load.",
    tooltip:
      "If turned on, remove facilities until belts are under 100% flow rate.",
    state: true,
  },
  "1": {
    label: "Prefer even facility.",
    tooltip:
      "If turned on, odd number of facility will be subtracted by one.",
    state: true,
  },
  "2": {
    label: "Count sorters consumption.",
    tooltip: "If turned on, also count power consumption by sorters.",
    state: true,
  },
});
