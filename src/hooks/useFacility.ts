import { facilityFromLabel } from "assets/facility";
import { useContent } from "hooks/useContent";
import { useEffect } from "react";

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
