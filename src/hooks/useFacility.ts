import { Facility } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import {
	getFacility,
	getLocalFacility,
} from "~database/get";
import { setLocalFacility } from "~database/set";

export const useFacility = (
	init: Facility,
): [Facility, (next: Facility) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		(async () => {
			const label = getLocalFacility();
			if (label === null) {
				return;
			}
			const next =
				(await getFacility(label)) ?? init;
			setItem(next);
		})();
	}, []);

	const onItemChange = (next: Facility) => {
		setItem(next);
		setLocalFacility(next);
	};

	return [item, onItemChange];
};
