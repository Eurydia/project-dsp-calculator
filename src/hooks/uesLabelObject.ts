import { useState } from "react";

export const useLabelObject = <
	T extends { label: string },
>(
	key: string,
	init: T,
): [T, (next: T) => void] => {
	const [item, setItem] = useState(init);

	const handleSet = (next: T) => {
		setItem(next);
		localStorage.setItem(key, next.label);
	};

	return [item, handleSet];
};
