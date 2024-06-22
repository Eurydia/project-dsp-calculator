import { useState } from "react";
import {
	COMPUTE_MODE_KEY,
	setLocalString,
} from "~database/local";

export const useComputeMode = (
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		setLocalString(COMPUTE_MODE_KEY, next);
	};

	return [item, handleChange];
};
