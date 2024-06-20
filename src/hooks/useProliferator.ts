import { Proliferator } from "@eurydos/dsp-item-registry";
import { useState } from "react";
import { proliferatorKey } from "~database/local";

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
			proliferatorKey,
			next.label,
		);
	};

	return [item, handleChange];
};
