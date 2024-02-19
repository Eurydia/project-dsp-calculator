export const formatNumber = (
	value: number,
): string => {
	return Number.parseFloat(
		value.toPrecision(6),
	).toLocaleString();
};
