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

export const sumArray = (
	values: number[],
): number => {
	return values.reduce(
		(prev, curr) => prev + curr,
		0,
	);
};

export const formatNumber = (
	value: number,
): string => {
	return Number.parseFloat(
		value.toPrecision(9),
	).toPrecision();
};

export const loadStorage = <T>(
	storageKey: string,
	factory: (value: string) => T,
	fallback: T,
): T => {
	const saved = localStorage.getItem(storageKey);
	if (saved === null) {
		return fallback;
	}
	try {
		return factory(JSON.parse(saved));
	} catch {
		return fallback;
	}
};
