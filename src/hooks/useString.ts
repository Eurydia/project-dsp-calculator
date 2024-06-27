import { useState } from "react";
import { setLocalString } from "~database/local";

export const useString = (
	key: string,
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		setLocalString(key, next);
	};

	return [item, handleChange];
};
