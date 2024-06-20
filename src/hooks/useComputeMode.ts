import { useState } from "react";
import {
	computeModeKey,
	setLocalString,
} from "~database/local";

export const useComputeMode = (
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		setLocalString(computeModeKey, next);
	};

	return [item, handleChange];
};
