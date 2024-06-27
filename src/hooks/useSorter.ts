import { useState } from "react";
import { safeParseClamp } from "~core/parsing";
import {
	setLocalRecord,
	SORTER_KEY,
} from "~database/local";

/**
 * Counts the number of taken sorter ports, excluding the one given as the label.
 */
const countTakenPorts = (
	key: string,
	rec: Record<string, string>,
): number => {
	let count = 0;
	for (const [k, v] of Object.entries(rec)) {
		if (k === key) {
			continue;
		}
		count += safeParseClamp(v, 0, count);
	}
	return count;
};

/**
 * @version 2.5.0
 *
 * Global hook for sorter data.
 *
 * This hook is essentially just a wrapper around a `useState` hook. It exposes its own `setState` function for callback.
 */
export const useSorter = (
	init: Record<string, string>,
): [
	Record<string, string>,
	(l: string, v: string, c: number) => void,
] => {
	const [item, setItem] = useState(init);

	/**
	 * Since the data stored in the `useState` hook is a `Record<string, string>` type, this function provides an interface to modify the value of a given key.
	 */
	const onChange = (
		key: string,
		nextValue: string,
		totalConnection: number,
	) => {
		/**
		 * The main purpose for this function is to ensure that when the sorter configuration changes, the modification is valid.
		 *
		 * Say I have a facility with 12 sorter connections and (9,2,0,0) sorter configuration, which is valid.
		 *
		 * Then, the user would like to from (9,2,0,0) to (9,2,4,0) which is invalid since the number of sorters exceeds 12.
		 *
		 * This function prevents this invalid state from being registered by following these steps:
		 * 1. counts the number of taken sorter connections except the one which is about to be modified, in this case 9+2+0=11
		 * 2. compute the leftover ports from the total connection count and taken connection count, in this case 12-11=1.
		 * 3. the requested amount is clamped between [0, 1] which means, even though, the user requested to change the configuration to (9,2,4,0), in reality (9,2,1,0) is registered.
		 *
		 * This has a nice side-effect when there is no sorter port left, the requsted value is clamped between [0,0] effectively preventing modification until other values are decreased.
		 */
		setItem((prev) => {
			const next = { ...prev };
			if (nextValue === "") {
				next[key] = "";
				return next;
			}
			const usedConnection = countTakenPorts(
				key,
				next,
			);
			const leftover = safeParseClamp(
				nextValue,
				0,
				totalConnection - usedConnection,
			);
			next[key] = leftover.toString();
			setLocalRecord(SORTER_KEY, next);
			return next;
		});
	};
	return [item, onChange];
};
