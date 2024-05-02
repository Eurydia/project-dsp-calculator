import { ProliferatorMode } from "@eurydos/dsp-item-registry";
import { useEffect } from "react";
import { proliferatorFromLabel } from "~assets/proliferator";
import { recipeFromLabel } from "~assets/recipe";
import { useContent } from "./useContent";

export const useProlifEffect = (
	initValue: string,
	storageKey: string,
) => {
	const { content, setContent } = useContent(
		initValue,
		storageKey,
	);

	useEffect(() => {
		localStorage.setItem(
			storageKey,
			JSON.stringify(content),
		);
	}, [content, storageKey]);

	const setProlifEffectLabel = (
		prolifLlabel: string,
	) => {
		const nextProlif =
			proliferatorFromLabel(prolifLlabel);
		setContent(nextProlif.label);
	};

	const updateProlifEffectLabel = (
		recipeLabel: string,
	) => {
		const nextRecipe =
			recipeFromLabel(recipeLabel);

		setContent((prevProlifLabel) => {
			const prevProlif = proliferatorFromLabel(
				prevProlifLabel,
			);
			if (
				nextRecipe.speedupOnly &&
				prevProlif.mode ===
					ProliferatorMode.EXTRA_PRODUCTS
			) {
				return "None";
			}
			return prevProlifLabel;
		});
	};

	return {
		prolifEffectLabel: content,
		setProlifEffectLabel,
		updateProlifEffectLabel,
	};
};
