import { useEffect, useState } from "react";

export const useProliferatorSprayCount = (
	key: string,
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		(async () => {
			const label = localStorage.getItem(key);
			let next = label ?? init;
			setItem(next);
		})();
	}, []);

	const handleChange = (next: string) => {
		setItem(next);
		localStorage.setItem(key, next);
	};

	return [item, handleChange];
};
