import { Facility } from "@eurydos/dsp-item-registry";
import { useState } from "react";
import { FACILITY_KEY } from "~database/local";

export const useFacility = (
	init: Facility,
): [Facility, (next: Facility) => void] => {
	const [item, setItem] = useState(init);

	const onItemChange = (next: Facility) => {
		setItem(next);
		localStorage.setItem(
			FACILITY_KEY,
			next.label,
		);
	};

	return [item, onItemChange];
};
