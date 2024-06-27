import { useState } from "react";
import { safeParseClamp } from "~core/parsing";
import {
	FLOWRATE_KEY,
	setLocalRecord,
} from "~database/local";

export const useFlowrate = (
	init: Record<string, string>,
): [
	Record<string, string>,
	(n: Record<string, string>) => void,
	(l: string, v: string, c: number) => void,
] => {
	const [item, setItem] = useState(init);

	const handleChange = (
		next: Record<string, string>,
	) => {
		setItem(next);
		setLocalRecord(FLOWRATE_KEY, next);
	};

	const handleUpdate = (
		label: string,
		value: string,
		connection: number,
	) => {
		setItem((prev) => {
			const next = { ...prev };
			if (value === "") {
				next[label] = "";
				return next;
			}

			let leftover = connection * 7200;
			for (const entry of Object.entries(next)) {
				const [prevLabel, prevValue] = entry;
				if (prevLabel === label) {
					continue;
				}
				leftover -= safeParseClamp(
					prevValue,
					7200,
					leftover,
				);
			}
			const nextValue = safeParseClamp(
				value,
				0,
				leftover,
			);
			next[label] = nextValue.toString();
			setLocalRecord(FLOWRATE_KEY, next);
			return next;
		});
	};
	return [item, handleChange, handleUpdate];
};
