import { useState } from "react";
import {
	CAPACITY_KEY,
	setLocalRecord,
} from "~database/local";

export const useCapacity = (
	init: Record<string, string>,
): [
	Record<string, string>,
	(n: Record<string, string>) => void,
	(l: string, v: string) => void,
] => {
	const [item, setItem] = useState(init);

	const handleChange = (
		next: Record<string, string>,
	) => {
		setItem(next);
		setLocalRecord(CAPACITY_KEY, next);
	};

	const handleUpdate = (k: string, v: string) => {
		setItem((prev) => {
			const next = { ...prev };
			next[k] = v;
			setLocalRecord(CAPACITY_KEY, next);
			return next;
		});
	};

	return [item, handleChange, handleUpdate];
};
