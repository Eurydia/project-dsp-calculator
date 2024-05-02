import { facilityFromLabel } from "assets/facility";
import { useEffect } from "react";
import { useContent } from "./useContent";

export const useFacility = (
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

	const setFacilityLabel = (label: string) => {
		const next = facilityFromLabel(label);
		setContent(next.label);
	};

	return {
		facilityLabel: content,
		setFacilityLabel,
	};
};
