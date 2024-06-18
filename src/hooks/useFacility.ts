import { useEffect } from "react";
import { facilityFromLabel } from "~assets/facility";
import { useContent } from "./useContent";

export const useFacility = (
	init: string,
	key: string,
) => {
	const { content, setContent } = useContent(
		init,
		key,
	);

	useEffect(() => {
		localStorage.setItem(key, content);
	}, [content, key]);

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
