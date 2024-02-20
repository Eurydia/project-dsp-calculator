export const sumArray = (
	values: number[],
): number => {
	return values.reduce(
		(prev, curr) => prev + curr,
		0,
	);
};
