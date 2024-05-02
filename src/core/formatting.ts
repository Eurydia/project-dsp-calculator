const formatter = new Intl.NumberFormat("en-US", {
	maximumSignificantDigits: 6,
	signDisplay: "exceptZero",
});

export const formatNumber = (
	value: number,
): string => {
	return formatter.format(value);
};
