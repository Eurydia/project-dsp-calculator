import { useState } from "react";

/**
 * @version 2.5.0
 *
 * A global hook for `Record<string, string>`-type record.
 *
 * This hook is wrapper around a `useState` hook with two simplified callbacks. The first replaces the record with a new one, and the second updates the value of a given key.
 */
export const useRecord = (
	key: string,
	init: Record<string, string>,
): [
	Record<string, string>,
	(k: string, v: string) => void,
	(n: Record<string, string>) => void,
	(
		fn: (
			p: Record<string, string>,
		) => Record<string, string>,
	) => void,
] => {
	const [item, setItem] = useState(init);

	const handleReplace = (
		next: Record<string, string>,
	) => {
		setItem(next);
		localStorage.setItem(
			key,
			JSON.stringify(next),
		);
	};
	const handleReplaceFn = (
		fn: (
			prev: Record<string, string>,
		) => Record<string, string>,
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

	return [
		item,
		handleUpdate,
		handleReplace,
		handleReplaceFn,
	];
};
