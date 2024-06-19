import { useEffect, useState } from "react";
import { safeParseClamp } from "~core/parsing";

export const useFlowrate = (
	key: string,
	init: Record<string, string>,
): [
	Record<string, string>,
	(n: Record<string, string>) => void,
	(l: string, v: string, c: number) => void,
] => {
	const [item, setItem] = useState(init);
	useEffect(() => {
		const loaded = localStorage.getItem(key);
		if (loaded !== null) {
			handleChange(JSON.parse(loaded));
		}
	}, []);

	const handleChange = (
		next: Record<string, string>,
	) => {
		setItem(next);
		localStorage.setItem(
			key,
			JSON.stringify(next),
		);
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
			return next;
		});
		localStorage.setItem(
			key,
			JSON.stringify(item),
		);
	};
	return [item, handleChange, handleUpdate];
};
