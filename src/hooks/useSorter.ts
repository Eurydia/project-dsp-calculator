import { safeParseClamp } from "~core/parsing";
import { SORTER_KEY } from "~database/local";
import { useRecord } from "./useRecord";

/**
 * Counts the number of taken sorter ports, excluding the one given as the label.
 */
const countTakenPorts = (
	key: string,
	rec: Record<string, string>,
	total: number,
): number => {
	let count = 0;
	for (const k in rec) {
		if (k === key) {
			continue;
		}
		count += safeParseClamp(
			rec[k],
			0,
			total - count,
		);
	}
	return count;
};

/**
 * @version 2.5.0
 *
 * Global hook for sorter data.
 *
 * This hook is essentially just a wrapper around a `useState` hook. It exposes its own `setState` function for callback.
 *
 * Although this hook uses a hard-coded localStorage key to save the record, it does not load the initial data from localStorage.
 */
export const useSorter = (
	init: Record<string, string>,
): [
	Record<string, string>,
	(k: string, v: string, c: number) => void,
] => {
	const [item, , , setItem] = useRecord(
		SORTER_KEY,
		init,
	);

	/**
	 * Since the data stored in the `useState` hook is a `Record<string, string>` type, this function provides an interface to modify the value of a given key.
	 */
	const handleChange = (
		key: string,
		nextValue: string,
		totalPorts: number,
	) => {
		/**
		 * Say I have a facility with 12 ports and (9,2,0,0) state.
		 *  Then, the user requested to register (9,2,4,0) as the new state.
		 *
		 * 1. counts the number of taken ports except the one being modified
		 * 2. compute the leftover ports
		 * 3. clamp the requested amount between [0, leftover]
		 *
		 * Even though, the user requested (9,2,4,0), (9,2,1,0) is registered.
		 */
		setItem((prev) => {
			const next = { ...prev };
			if (nextValue === "") {
				next[key] = "";
				return next;
			}
			const takenPorts = countTakenPorts(
				key,
				prev,
				totalPorts,
			);
			const leftoverPorts = safeParseClamp(
				nextValue,
				0,
				totalPorts - takenPorts,
			);
			next[key] = leftoverPorts.toString();
			return next;
		});
	};
	return [item, handleChange];
};
