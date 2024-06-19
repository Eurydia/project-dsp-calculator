import { Recipe } from "@eurydos/dsp-item-registry";
import { useEffect, useState } from "react";
import { getRecipe } from "~assets/get";
import {
	getLocalRecipe,
	setLocalRecipe,
} from "~database/local";

export const useRecipe = (
	init: Recipe,
): [Recipe, (next: Recipe) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		const label = getLocalRecipe();
		if (label === null) {
			return;
		}
		const next = getRecipe(label);
		if (next === undefined) {
			return;
		}
		setItem(next);
	}, []);

	const onItemChange = (next: Recipe) => {
		setItem(next);
		setLocalRecipe(next);
	};

	return [item, onItemChange];
};
