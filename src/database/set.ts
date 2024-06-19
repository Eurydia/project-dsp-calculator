import { Facility } from "@eurydos/dsp-item-registry";
import { facilityKey } from "./keys";

export const setLocalFacility = (f: Facility) => {
	localStorage.setItem(facilityKey, f.label);
};
