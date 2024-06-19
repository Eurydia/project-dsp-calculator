export const safeParseClamp = (
	value: string,
	minValue: number,
	maxValue: number,
): number => {
	const p = Number.parseInt(value);
	if (Number.isNaN(p)) {
		return minValue;
	}
	if (p > maxValue) {
		return maxValue;
	}
	if (p < minValue) {
		return minValue;
	}
	return p;
};
