export const safeParseClamp = (
	value: string,
	minValue: number,
	maxValue: number,
): number => {
	const parsedValue = Number.parseInt(value);
	if (Number.isNaN(parsedValue)) {
		return minValue;
	}
	if (parsedValue > maxValue) {
		return maxValue;
	}
	if (parsedValue < minValue) {
		return minValue;
	}
	return parsedValue;
};
