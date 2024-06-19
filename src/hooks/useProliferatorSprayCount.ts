import { useEffect, useState } from "react";
import {
	getLocalProliferatorSprayCount,
	setLocalProliferatorSprayCount,
} from "~database/local";

export const useProliferatorSprayCount = (
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	useEffect(() => {
		const next = getLocalProliferatorSprayCount();
		if (next === null) {
			return;
		}
		setItem(next);
	}, []);

	const handleChange = (next: string) => {
		setItem(next);
		setLocalProliferatorSprayCount(next);
	};

	return [item, handleChange];
};
