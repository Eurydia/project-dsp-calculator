import { Proliferator } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import { getProliferator } from "~database/get";

export const useProliferator = (
	key: string,
	init: Proliferator,
): [
	Proliferator,
	(next: Proliferator) => void,
] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		(async () => {
			const label = localStorage.getItem(key);
			let next = init;
			if (label !== null) {
				next =
					(await getProliferator(label)) ?? init;
			}
			setItem(next);
		})();
	}, []);

	const handleChange = (next: Proliferator) => {
		setItem(next);
		localStorage.setItem(key, next.label);
	};

	return [item, handleChange];
};
