import { tryParseIntClamp } from "~core/parsing";
import { SORTER_KEY } from "~database/local";
import { StringRecord } from "~types/generic";
import { useRecord } from "./useRecord";

/**
 * @version 2.6.0
 * @description
 * Counts the number of taken ports, skipping the one given.
 *
 * Each value in the record is also clamped to prevent invalid states.
 */
const countTakenPorts = (
	key: string,
	rec: StringRecord,
	total: number,
): number => {
	let result = 0;
	for (const k in rec) {
		if (k === key) {
			continue;
		}
		result += tryParseIntClamp(
			rec[k],
			0,
			total - result,
		);
	}
	return result;
};

/**
 * @version 2.6.0
 * @description
 * A wrapper around useRecord.
 *
 * This hook sanitize incoming sorter states.
 */
export const useSorter = (
	init: StringRecord,
): [
	StringRecord,
	(k: string, v: string, c: number) => void,
] => {
	const [item, , , setItem] = useRecord(
		SORTER_KEY,
		init,
	); // the empty commas are not typos

	/**
	 * @version 2.6.0
	 * @description
	 * The incoming value is clamped and stopped from exceeding totalPorts.
	 */
	const handleChange = (
		key: string,
		nextValue: string,
		totalPorts: number,
	) => {
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
			const leftoverPorts =
				totalPorts - takenPorts; // can be between zero and totalPorts inclusive
			const clampedNextValue = tryParseIntClamp(
				nextValue,
				0,
				leftoverPorts,
			);
			next[key] = clampedNextValue.toString();
			return next;
		});
	};
	return [item, handleChange];
};
