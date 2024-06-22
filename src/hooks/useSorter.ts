import { useState } from "react";
import { safeParseClamp } from "~core/parsing";
import {
	setLocalRecord,
	SORTER_KEY,
} from "~database/local";

export const useSorter = (
	init: Record<string, string>,
): [
	Record<string, string>,
	(l: string, v: string, c: number) => void,
] => {
	const [item, setItem] = useState(init);

	const handleChange = (
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
			// Count the number of used connection slot
			// except current
			let takenConnection = 0;
			for (const [
				prevLabel,
				prevValue,
			] of Object.entries(next)) {
				if (prevLabel === label) {
					continue;
				}
				takenConnection += safeParseClamp(
					prevValue,
					0,
					connection - takenConnection,
				);
			}
			// Clamp the current connection count
			const nextValue = safeParseClamp(
				value,
				0,
				connection - takenConnection,
			);
			next[label] = nextValue.toString();
			setLocalRecord(SORTER_KEY, next);
			return next;
		});
	};
	return [item, handleChange];
};
