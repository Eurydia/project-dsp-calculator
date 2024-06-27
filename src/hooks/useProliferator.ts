import { Proliferator } from "@eurydos/dsp-item-registry";
import { PROLIFERATOR_KEY } from "~database/local";
import { useString } from "./useString";

export const useProliferator = (
	key: string,
	init: Proliferator,
): [
	Proliferator,
	(next: Proliferator) => void,
] => {
	const [item, setItem] = useString(key, init);

	const handleChange = (next: Proliferator) => {
		setItem(next);
		localStorage.setItem(
			PROLIFERATOR_KEY,
			next.label,
		);
	};

	return [item, handleChange];
};
