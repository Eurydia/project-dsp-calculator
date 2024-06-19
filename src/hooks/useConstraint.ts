import { useEffect, useState } from "react";

export const useConstraint = (
	key: string,
	init: Record<string, string>,
): [
	Record<string, string>,
	(n: Record<string, string>) => void,
	// (l: string, v: string, c: number) => void,
] => {
	const [item, setItem] = useState(init);
	useEffect(() => {
		const loaded = localStorage.getItem(key);
		if (loaded !== null) {
			setItem(JSON.parse(loaded));
		}
	}, []);

	const handleChange = (
		next: Record<string, string>,
	) => {
		setItem(next);
		localStorage.setItem(
			key,
			JSON.stringify(next),
		);
	};

	return [item, handleChange];
};
