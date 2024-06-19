import { Recipe } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import { getRecipe } from "~database/get";

export const useRecipe = (
	key: string,
	init: Recipe,
): [Recipe, (next: Recipe) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		(async () => {
			const label = localStorage.getItem(key);
			let next = init;
			if (label !== null) {
				next = (await getRecipe(label)) ?? init;
			}
			setItem(next);
		})();
	}, []);

	const onItemChange = (next: Recipe) => {
		setItem(next);
		localStorage.setItem(key, next.label);
	};

	return [item, onItemChange];
};
