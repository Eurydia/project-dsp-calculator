import { useState } from "react";
import {
	CONSTRAINT_KEY,
	setLocalRecord,
} from "~database/local";

export const useConstraint = (
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
		setLocalRecord(CONSTRAINT_KEY, next);
	};
	const handleUpdate = (k: string, v: string) => {
		setItem((prev) => {
			const next = { ...prev };
			next[k] = v;
			setLocalRecord(CONSTRAINT_KEY, next);
			return next;
		});
	};

	return [item, handleChange, handleUpdate];
};
