import { useState } from "react";
import {
	proliferatorSprayCountKey,
	setLocalString,
} from "~database/local";

export const useProliferatorSprayCount = (
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		setLocalString(
			proliferatorSprayCountKey,
			next,
		);
	};

	return [item, handleChange];
};
