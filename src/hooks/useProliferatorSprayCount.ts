import { useState } from "react";
import {
	PROLIFERATOR_SPRAY_COUNT_KEY,
	setLocalString,
} from "~database/local";

export const useProliferatorSprayCount = (
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		setLocalString(
			PROLIFERATOR_SPRAY_COUNT_KEY,
			next,
		);
	};

	return [item, handleChange];
};
