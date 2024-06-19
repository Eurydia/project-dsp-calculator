import { Proliferator } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import { getProliferator } from "~assets/get";
import {
	getLocalProliferator,
	setLocalProliferator,
} from "~database/local";

export const useProliferator = (
	init: Proliferator,
): [
	Proliferator,
	(next: Proliferator) => void,
] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		const label = getLocalProliferator();
		if (label === null) {
			return;
		}
		const next = getProliferator(label);
		if (next === undefined) {
			return;
		}
		setItem(next);
	}, []);

	const handleChange = (next: Proliferator) => {
		setItem(next);
		setLocalProliferator(next);
	};

	return [item, handleChange];
};
