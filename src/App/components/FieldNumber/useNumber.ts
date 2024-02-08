import { useMemo, useState } from "react";

export const useNumber = (
	initValue: number,
	minValue: number,
	maxValue: number,
) => {
	const [value, setValue] = useState(
		initValue.toString(),
	);
	const valueParsed = useMemo(
		() => Number.parseInt(value),
		[value],
	);

	const onValueChange = (nextValue: string) => {
		const safeValue = nextValue.slice(0, 16);
		if (safeValue.length === 0) {
			setValue("");
			return;
		}
		const parsed = Number.parseInt(safeValue);
		if (Number.isNaN(parsed)) {
			setValue(minValue.toString());
			return;
		}
		if (parsed > maxValue) {
			setValue(maxValue.toString());
			return;
		}
		if (parsed < minValue) {
			setValue(minValue.toString());
			return;
		}
		setValue(parsed.toString());
	};

	return { value, valueParsed, onValueChange };
};
