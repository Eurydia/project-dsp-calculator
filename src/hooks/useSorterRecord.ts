import { useRecord } from "hooks/useRecord";
import { safeParseClamp } from "~core/parsing";

export const useSorterRecord = (
	initValue: Record<string, string>,
	storageKey: string,
) => {
	const { content, setContent } = useRecord(
		initValue,
		storageKey,
	);

	const updateSorterRecord = (
		sorterLabel: string,
		value: string,
		connectionCount: number,
	) => {
		setContent((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[sorterLabel] = "";
				return next;
			}

			let leftover = connectionCount;
			for (const entry of Object.entries(next)) {
				const [prevLabel, prevValue] = entry;
				if (prevLabel === sorterLabel) {
					continue;
				}
				leftover -= safeParseClamp(
					prevValue,
					0,
					leftover,
				);
			}

			const nextValue = safeParseClamp(
				value,
				0,
				leftover,
			);
			next[sorterLabel] = nextValue.toString();
			return next;
		});
	};
	return {
		sorterRecord: content,
		updateSorterRecord,
	};
};
