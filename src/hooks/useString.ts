import { useState } from "react";

export const useString = (
	key: string,
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		localStorage.setItem(key, next);
	};

	return [item, handleChange];
};
