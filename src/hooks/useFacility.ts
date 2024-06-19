import { Facility } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import { getFacility } from "~database/get";

export const useFacility = (
	key: string,
	init: Facility,
): [Facility, (next: Facility) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		(async () => {
			const label = localStorage.getItem(key);
			if (label !== null) {
				const next =
					(await getFacility(label)) ?? init;
				setItem(next);
			}
		})();
	}, []);

	const onItemChange = (next: Facility) => {
		setItem(next);
		localStorage.setItem(key, next.label);
	};

	return [item, onItemChange];
};
