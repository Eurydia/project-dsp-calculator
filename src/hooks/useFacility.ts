import { Facility } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import { getFacility } from "~assets/get";
import {
	getLocalFacility,
	setLocalFacility,
} from "~database/local";

export const useFacility = (
	init: Facility,
): [Facility, (next: Facility) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		const label = getLocalFacility();
		if (label === null) {
			return;
		}
		const next = getFacility(label);
		if (next === undefined) {
			return;
		}
		setItem(next);
	}, []);

	const onItemChange = (next: Facility) => {
		setItem(next);
		setLocalFacility(next);
	};

	return [item, onItemChange];
};
