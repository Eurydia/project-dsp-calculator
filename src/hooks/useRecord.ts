import { useState } from "react";
import { StringRecord } from "~types/generic";

/**
 * @version 2.5.0
 * @description
 * A hook for handling string-string records.
 * It provides simplified APIs for interating with the record.
 *
 * It also saves the record to local storage whenever it is modified.
 *
 */
export const useRecord = (
	key: string,
	init: StringRecord,
): [
	StringRecord,

	(k: string, v: string) => void,

	(n: StringRecord) => void,

	(fn: (p: StringRecord) => StringRecord) => void,
] => {
	const [item, setItem] = useState(init);

	/**
	 * @version 2.6.0
	 * @description
	 * Overrides the record with a new record object and saves it to local storage.
	 */
	const handleReplace = (
		next: Record<string, string>,
	) => {
		setItem(next);
		localStorage.setItem(
			key,
			JSON.stringify(next),
		);
	};

	/**
	 * @version 2.6.0
	 * @description
	 * Modifies the value of the given key and saves the updated record to local storage.
	 */
	const handleUpdate = (k: string, v: string) => {
		setItem((prev) => {
			const next = { ...prev };
			next[k] = v;
			localStorage.setItem(
				key,
				JSON.stringify(next),
			);
			return next;
		});
	};

	/**
	 * @version 2.6.0
	 * @description
	 * Provides a decorated updater function that  saves the new state to local storage before setting the state.
	 */
	const handleReplaceFn = (
		fn: (p: StringRecord) => StringRecord,
	) => {
		setItem((prev) => {
			const next = fn(prev);
			localStorage.setItem(
				key,
				JSON.stringify(next),
			);
			return next;
		});
	};

	return [
		item,
		handleUpdate,
		handleReplace,
		handleReplaceFn,
	];
};
