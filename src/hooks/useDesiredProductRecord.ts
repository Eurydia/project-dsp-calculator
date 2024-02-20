import { safeParseClamp } from "core/safeParseClamp";
import { useRecord } from "hooks/useRecord";

export const useDesiredProductRecord = (
	initValue: Record<string, string>,
	storageKey: string,
) => {
	const { content, setContent, resetContent } =
		useRecord(initValue, storageKey);

	const updateDesiredProductRecord = (
		label: string,
		value: string,
	) => {
		setContent((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[label] = "";
				return next;
			}
			const nextValue = safeParseClamp(
				value,
				0,
				1e7,
			);
			next[label] = nextValue.toString();
			return next;
		});
	};

	return {
		desiredProductRecord: content,
		updateDesiredProductRecord,
		setDesiredProductRecord: resetContent,
	};
};
