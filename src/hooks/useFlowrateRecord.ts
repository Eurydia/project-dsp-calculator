import { safeParseClamp } from "~core/parsing";
import { useRecord } from "./useRecord";

export const useFlowrateRecord = (
	initValue: Record<string, string>,
	storageKey: string,
) => {
	const { content, setContent, resetContent } =
		useRecord(initValue, storageKey);

	const updateFlowrateRecord = (
		itemLabel: string,
		value: string,
		connectionCount: number,
	) => {
		setContent((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[itemLabel] = "";
				return next;
			}

			let leftover = connectionCount * 7200;
			for (const entry of Object.entries(next)) {
				const [prevLabel, prevValue] = entry;
				if (prevLabel === itemLabel) {
					continue;
				}
				leftover -= safeParseClamp(
					prevValue,
					7200,
					leftover,
				);
			}
			const nextValue = safeParseClamp(
				value,
				0,
				leftover,
			);
			next[itemLabel] = nextValue.toString();
			return next;
		});
	};
	return {
		flowrateRecord: content,
		updateFlowrateRecord,
		setFlowrateRecord: resetContent,
	};
};
