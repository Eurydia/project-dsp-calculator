import { safeParseClamp } from "~core/parsing";
import { FLOWRATE_KEY } from "~database/local";
import { useRecord } from "./useRecord";

const countTakenFlow = (
	key: string,
	rec: Record<string, string>,
	totalFlow: number,
) => {
	let takenFlow = 0;
	for (const k in rec) {
		if (k === key) {
			continue;
		}
		takenFlow += safeParseClamp(
			rec[k],
			0,
			totalFlow - takenFlow,
		);
	}
	return takenFlow;
};

export const useFlowrate = (
	init: Record<string, string>,
): [
	Record<string, string>,
	(l: string, v: string, c: number) => void,
	(n: Record<string, string>) => void,
] => {
	const [item, , handleReplace, handleReplaceFn] =
		useRecord(FLOWRATE_KEY, init);

	const handleUpdate = (
		key: string,
		nextValue: string,
		totalFlow: number,
	) => {
		handleReplaceFn((prev) => {
			const next = { ...prev };
			if (nextValue === "") {
				next[key] = "";
				return next;
			}
			const takenFlow = countTakenFlow(
				key,
				prev,
				totalFlow,
			);
			const leftoverFlow = safeParseClamp(
				nextValue,
				0,
				totalFlow - takenFlow,
			);
			next[key] = leftoverFlow.toString();
			return next;
		});
	};
	return [item, handleUpdate, handleReplace];
};
