import { Facility } from "@eurydos/dsp-item-registry";
import { useState } from "react";
import { facilityKey } from "~database/local";

export const useFacility = (
	init: Facility,
): [Facility, (next: Facility) => void] => {
	const [item, setItem] = useState(init);

	const onItemChange = (next: Facility) => {
		setItem(next);
		localStorage.setItem(facilityKey, next.label);
	};

	return [item, onItemChange];
};
