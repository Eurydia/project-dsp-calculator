import { useEffect } from "react";
import { facilityFromLabel } from "~assets/facility";
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

	const setFacilityLabel = async (
		label: string,
	) => {
		const next = await facilityFromLabel(label);
		setContent(next.label);
	};

	return {
		facilityLabel: content,
		setFacilityLabel,
	};
};
