import { useState } from "react";
import {
	constraintKey,
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
		setLocalRecord(constraintKey, next);
	};
	const handleUpdate = (k: string, v: string) => {
		setItem((prev) => {
			const next = { ...prev };
			next[k] = v;
			setLocalRecord(constraintKey, next);
			return next;
		});
	};

	return [item, handleChange, handleUpdate];
};
