import { Proliferator } from "@eurydos/dsp-item-registry";
import { useState } from "react";
import { PROLIFERATOR_KEY } from "~database/local";

export const useProliferator = (
	init: Proliferator,
): [
	Proliferator,
	(next: Proliferator) => void,
] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: Proliferator) => {
		setItem(next);
		localStorage.setItem(
			PROLIFERATOR_KEY,
			next.label,
		);
	};

	return [item, handleChange];
};
